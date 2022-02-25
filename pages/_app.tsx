import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import Sidebar from '../components/Sidebar.js';
import Player from '../components/Player';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter();

  const [signup, setSignup] = useState(false);
  
  useEffect(() => {
    if (router.pathname === '/login') setSignup(true);
  }, [])
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        { !signup ? 
        <div className="bg-black h-screen overflow-hidden">

          <Head>
            <title>Spotify Clone</title>
          </Head>

          <main className='flex'>
            <Sidebar />
            <Component {...pageProps} />
          </main>

          <div className='absolute bottom-0 flex justify-center items-center w-full bg-gradient-to-b from-black to-[#181818] h-32 text-white border-t-[0.5px] border-gray-500 border-opacity-30'>
            <Player />
          </div>
        </div>
        : <Component {...pageProps} />}
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
