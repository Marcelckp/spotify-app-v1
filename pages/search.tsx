import { getSession } from "next-auth/react";
import Head from "next/head";
import SearchPanel from "../components/SearchPanel";

function Search() {
  return (
    <div className="bg-[#111] h-screen overflow-hidden w-full">
      <Head>
        <title>Search</title>
      </Head>
      <SearchPanel />
    </div>
  );
}

export default Search;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
