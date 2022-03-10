import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { GetStaticProps } from "next";
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";
import { categories } from "../typings";
import Nav from "./Nav";

// interface Props {
//   items: [object];
// }

const colours = [
  "#27856a",
  "#1e3264",
  "#8d67ab",
  "#e8115b",
  "#dc148c",
  "#ba5d07",
  "#477d95",
  "#b49bc8",
  "#509bf5",
  "#608108",
  "#e61e32",
  "#777777",
  "#f037a5",
  "#9cf0e1",
  "#148a08",
  "#f59b23",
  "#a56752",
  "#e13300",
  "#503750",
  "#0d73ec",
  "#8c1932",
  "#e1118b",
];

export default function SearchPanel(props: any) {
  console.log(props);
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { data: session } = useSession();

  const [categories, setCategories] = useState(null)!;

  useEffect(() => {
    spotifyApi
      .getCategories({ limit: 50 })
      .then((categories: any) => {
        setCategories(categories?.body?.categories?.items);
      })
      .catch((err: object) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-white flex-grow relative w-full h-screen justify-center items-center overflow-y-scroll scrollbar-hide">
      <Nav />
      <div className=" mt-20 flex flex-col justify-center items-center mb-52">
        <div className="w-full px-10">
          <div className=" mb-12">
            <h1 className="text-4xl font-semibold">Browse All</h1>
          </div>
          <div className=" w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-x-8 gap-y-8">
            {categories ? (
              categories.map((category: any) => {
                const colour =
                  colours[Math.floor(Math.random() * colours.length)];
                return (
                  <div
                    className={`h-72 rounded-lg p-5 relative overflow-hidden cursor-pointer`}
                    key={category.id}
                    style={{ backgroundColor: `${colour}` }}
                  >
                    <h1 className="text-2xl font-semibold">{category.name}</h1>
                    <img
                      className="w-32 h-32 absolute bottom-[-15px] right-[-15px] rotate-[20deg]"
                      src={category.icons[0].url}
                      alt=""
                    />
                  </div>
                );
              })
            ) : (
              <div>
                <h1 className="text-2xl">Lazy Loading</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
