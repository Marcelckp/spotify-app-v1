import Head from "next/head";
import MainPannel from "../components/MainPannel.jsx";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-black to-[#111] h-screen overflow-hidden w-full">
      <Head>
        <title>Playlist</title>
      </Head>
      <MainPannel />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
