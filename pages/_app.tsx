import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Button from "../features/client/core/components/Button";
import Loading from "../features/client/core/components/Loading";
import MainLayout from "../features/client/core/components/MainLayout";
import MetaInfo from "../features/client/core/components/MetaInfo";
import Popup from "../features/client/core/components/Popup";
import SectionHeader from "../features/client/core/components/SectionHeader";
import SideNav from "../features/client/core/components/SideNav";
import { linksObj } from "../features/client/core/data/links";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import { useLoadingStore } from "../features/client/core/stores/loadingStore";
import PomodoroFloatBox from "../features/client/pomodoro/components/PomodoroFloatBox";
import { usePomodoroStore } from "../features/client/pomodoro/stores/usePomodoroStore";
import { meClient } from "../features/client/user/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const meQuery = useApi<typeof meClient>();
  const { user, setUser } = useAuthStore();

  const router = useRouter();
  const { errors, isOpen, setIsOpen } = useErrorStore();
  const { loading, setLoading } = useLoadingStore();
  const showPomodoro = usePomodoroStore((s) => s.showPomodoro, shallow);
  const [initLoading, setInitLoading] = useState(false);
  const isAuthRoute = router.pathname.includes("/auth");

  useEffect(() => {
    const handleRouteChangeOn = () => setLoading(true);
    const handleRouteChangeOff = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeOn);
    router.events.on("routeChangeComplete", handleRouteChangeOff);
    router.events.on("routeChangeError", handleRouteChangeOff);

    let timeoutRef: NodeJS.Timeout;

    if (!user) {
      setInitLoading(true);
      timeoutRef = setTimeout(() => {
        setInitLoading(false);
      }, 3000);
    }

    !user &&
      (async () => {
        setLoading(true);
        const meUser = await meQuery.request(meClient());
        setLoading(false);
        if (!meUser) return;
        setUser(meUser);
      })();

    return () => {
      clearTimeout(timeoutRef);
      router.events.off("routeChangeStart", handleRouteChangeOn);
      router.events.off("routeChangeComplete", handleRouteChangeOff);
      router.events.off("routeChangeError", handleRouteChangeOff);
    };
  }, []);

  return (
    <div className='flex h-full overflow-auto'>
      <MetaInfo />

      {!isAuthRoute && <SideNav />}
      {user || isAuthRoute ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <SectionHeader
            title='Inicie Sessão para continuar'
            className='mb-8'
          />
          <Link href={linksObj.login.url}>
            <a>
              <Button>Iniciar Sessão</Button>
            </a>
          </Link>
        </MainLayout>
      )}
      {showPomodoro && <PomodoroFloatBox />}
      <Popup isOpen={isOpen} texts={errors} onClose={() => setIsOpen(false)} />
      <Loading isLoading={loading || initLoading} />
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='beforeInteractive'
      />
    </div>
  );
}

export default MyApp;
