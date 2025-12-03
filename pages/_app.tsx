// _app.tsx
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

useEffect(() => {
  const handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };

  router.events.on("routeChangeComplete", handleRouteChange);

  return () => {
    router.events.off("routeChangeComplete", handleRouteChange);
  };
}, [router.events]);


  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-VH807R2549"
      />

      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VH807R2549', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <div className={`relative min-h-screen overflow-hidden ${isHomePage ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <main className="relative z-10 flex flex-col items-center justify-center">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

