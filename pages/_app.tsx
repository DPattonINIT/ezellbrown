import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
     

      <main className="relative z-10 flex flex-col items-center justify-center">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

