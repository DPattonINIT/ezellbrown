// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div className={`relative min-h-screen overflow-hidden ${isHomePage ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <main className="relative z-10 flex flex-col items-center justify-center">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

