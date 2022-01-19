import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Loading from "../features/client/core/components/Loading";
import Popup from "../features/client/core/components/Popup";
import SideNav from "../features/client/core/components/SideNav";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import { useLoadingStore } from "../features/client/core/stores/loadingStore";
import { meClient } from "../features/client/user/client";
import "../styles/globals.css";
function MyApp({ Component, pageProps }: AppProps) {
  const meQuery = useApi<typeof meClient>();
  const setUser = useAuthStore((s) => s.setUser);

  const router = useRouter();
  const { errors, isOpen, setIsOpen } = useErrorStore();
  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    const handleRouteChangeOn = () => setLoading(true);
    const handleRouteChangeOff = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeOn);
    router.events.on("routeChangeComplete", handleRouteChangeOff);
    router.events.on("routeChangeError", handleRouteChangeOff);

    (async () => {
      const user = await meQuery.request(meClient());
      if (!user) return;
      setUser(user);
    })();

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeOn);
      router.events.off("routeChangeComplete", handleRouteChangeOff);
      router.events.off("routeChangeError", handleRouteChangeOff);
    };
  }, []);

  return (
    <div className='flex h-full'>
      <SideNav />
      <Component {...pageProps} />
      <Popup isOpen={isOpen} texts={errors} onClose={() => setIsOpen(false)} />
      <Loading isLoading={loading} />
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='beforeInteractive'
      />
    </div>
  );
}

export default MyApp;
