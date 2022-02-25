import { getSession } from 'next-auth/react';
import Head from 'next/head';
import HomePannel from '../components/HomePannel';

function Home() {
  return (
    <div className="bg-[#111] h-screen overflow-hidden w-full">
          <Head>
            <title>Spotify Clone</title>
          </Head>
          <HomePannel />
      </div>
  );
}

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
