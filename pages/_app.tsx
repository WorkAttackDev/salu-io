import type { AppProps } from "next/app";
import Script from "next/script";
import React, { useEffect } from "react";
import Header from "../features/client/core/components/Header";
import Popup from "../features/client/core/components/Popup";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import { meClient } from "../features/client/user/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const meQuery = useApi<typeof meClient>();
  const setUser = useAuthStore((s) => s.setUser);

  const { errors, isOpen, setIsOpen } = useErrorStore();

  const [test, setTest] = React.useState("");

  useEffect(() => {
    (async () => {
      const user = await meQuery.request(meClient());
      if (!user) return;
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Popup isOpen={isOpen} texts={errors} onClose={() => setIsOpen(false)} />
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='beforeInteractive'
      />
    </>
  );
}

export default MyApp;
