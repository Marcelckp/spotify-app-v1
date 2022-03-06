import Head from "next/head";
import LikePanel from "../components/LikePanel";
import { AppContext } from "next/app";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Like() {
  return (
    <div className="bg-gradient-to-b from-black via-black to-[#111] h-screen overflow-hidden w-full">
      <Head>
        <title>Search</title>
      </Head>
      <LikePanel />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
