import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState } from "recoil";
import { playlistAtom, playlistStateAtom } from "../Atoms/playlistAtom";
// import spotifyApi from "../lib/spotify";
import useSpotifyApi from "../hooks/useSpotify";
import Songs from "./Songs";
import moment from "moment";
import { useRouter } from "next/router";

const randomColours = [
  "from-red-400",
  "from-blue-400",
  "from-rose-400",
  "from-purple-400",
  "from-green-400",
  "from-pink-400",
  "from-indigo-400",
  "from-orange-400",
  "from-cyan-400",
];

function MainPannel() {
  // NOTE THERE ERRORS WITH THE mix PLAYLISTS

  // create the nav for the pannels as a reuseable component !!

  const router = useRouter();

  const [playlistId, setPlaylistId] = useRecoilState(playlistAtom);
  const [playlistState, setPlaylistState] = useRecoilState(playlistStateAtom);

  const spotifyApi = useSpotifyApi();

  const [colour, setColour] = useState(null);

  const { data: session } = useSession();
  //   console.log(session);

  useEffect(() => {
    setColour(shuffle(randomColours).pop());
  }, [playlistId]);

  useEffect(() => {
    //   if (spotifyApi.getAccessToken()) {
    // console.log(playlistId);

    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        // console.log(res);
        setPlaylistState(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
    //   } else console.log('what happened')
  }, [spotifyApi, playlistId]);

  // console.log(playlistState);

  const mnt = moment(
    playlistState?.tracks?.items.reduce(
      (sum, num) => sum + num.track.duration_ms,
      0
    )
  );

  return (
    <div className="flex-grow h-screen overflow-y-scroll w-full scrollbar-hide relative">
      <header
        className={`absolute top-0 w-full flex justify-center items-center z-10`}
      >
        <div className="w-full flex justify-center h-16 items-center">
          <div className="flex justify-between w-full px-9 items-center h-full">
            <div className="text-white flex space-x-4">
            <div className="rounded-full bg-black w-10 h-10 flex justify-center items-center hover:bg-opacity-75">
              <ChevronLeftIcon
                className="rounded-full w-7 h-7 cursor-pointer"
                onClick={() => router.back()}
              />
            </div>
            <div className="rounded-full bg-black w-10 h-10 flex justify-center items-center hover:bg-opacity-75">
              <ChevronRightIcon
                className="rounded-full w-7 h-7 cursor-pointer"
                onClick={() => history.forward()}
              />
            </div>
            </div>
            <div className="flex items-center bg-black space-x-3 opacity-90 text-white hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
              {session?.user.image ? (
                <img
                  className="rounded-full w-10 h-10"
                  src={session.user.image}
                  alt=""
                />
              ) : (
                <div className="p-2">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                    xmlns="http://www.w3.org/2000/svg"
                    data-testid="user-icon"
                  >
                    <path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path>
                  </svg>
                </div>
              )}
              <h2>{session?.user?.name}</h2>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-96 lg:h-1/3 text-white p-8`}
      >
        <img
          className="w-60 h-60 xl:w-72 xl:h-72 shadow-2xl"
          src={playlistState?.images?.[0]?.url}
          alt="cover art"
        />
        <div>
          <p>PLAYLIST</p>
          <h1
            className={`mt-5 mb-5 md:text-7xl ${
              playlistState?.name.length > 20 ? "xl:text-5xl" : "xl:text-9xl"
            } font-bold text-5xl`}
          >
            {playlistState?.name}
          </h1>
          <p className="text-gray-400">{playlistState?.description}</p>
          <div className="mt-1 flex">
            <p className="mr-1 hover:border-b-2 cursor-pointer">
              {playlistState?.owner?.display_name}
            </p>
            <p className="pr-1">•</p>
            <p className="pr-1">{playlistState?.followers?.total} Likes</p>
            <p className="pr-1">•</p>
            <p className="pr-1">{playlistState?.tracks?.items.length} songs</p>
            <p className="pr-1">•</p>
            <p className="pr-1">
              {mnt.format("h")} hours, {mnt.format("mm")} min
            </p>
          </div>
        </div>
      </section>

      <div className=" text-white mt-12 px-8 w-full mb-32 flex flex-col justify-center">
        <div className='py-2 pt-2 border-b-2 mb-5 border-gray-500 border-opacity-30 sticky top-0 bg-black'>
          <div className="tablePlaylist w-full flex items-center p-4">
            <div className="flex items-center ml-3">
              <h1>#</h1>
            </div>
            <div className="flex items-center ml-4">
              <h1>TITLE</h1>
            </div>
            <div className="flex items-center">
              <h1>ALBUM</h1>
            </div>
            <div className="flex items-center ml-12">
              <svg
                role="img"
                // height="16"
                // width="16"
                viewBox="0 0 16 16"
                className="text-white w-6 h-6"
              >
                <path
                  fill="white"
                  d="M7.999 3h-1v5h3V7h-2V3zM7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 14C3.916 14 1 11.084 1 7.5S3.916 1 7.5 1 14 3.916 14 7.5 11.084 14 7.5 14z"
                ></path>
                <path fill="none" d="M16 0v16H0V0z"></path>
              </svg>
            </div>
          </div>
        </div>
        <Songs />
      </div>
    </div>
  );
}

export default MainPannel;
