import AuthChecker from "@/client/core/components/AuthChecker";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import shallow from "zustand/shallow";
import Loading from "../features/client/core/components/Loading";
import MetaInfo from "../features/client/core/components/MetaInfo";
import Popup from "../features/client/core/components/Popup";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import { useLoadingStore } from "../features/client/core/stores/loadingStore";
import PomodoroFloatBox from "../features/client/pomodoro/components/PomodoroFloatBox";
import { usePomodoroStore } from "../features/client/pomodoro/stores/usePomodoroStore";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { errors, isOpen, setIsOpen } = useErrorStore();
  const { loading, setLoading } = useLoadingStore();

  const showPomodoro = usePomodoroStore((s) => s.showPomodoro, shallow);

  useEffect(() => {
    const handleRouteChangeOn = () => setLoading(true);
    const handleRouteChangeOff = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeOn);
    router.events.on("routeChangeComplete", handleRouteChangeOff);
    router.events.on("routeChangeError", handleRouteChangeOff);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeOn);
      router.events.off("routeChangeComplete", handleRouteChangeOff);
      router.events.off("routeChangeError", handleRouteChangeOff);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex h-full overflow-auto'>
        <MetaInfo />

        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>

        {showPomodoro && <PomodoroFloatBox />}
        <Popup
          isOpen={isOpen}
          texts={errors}
          onClose={() => setIsOpen(false)}
        />
        <Loading isLoading={loading} />
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='beforeInteractive'
        />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
