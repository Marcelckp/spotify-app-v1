import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { currentSongId, songPlaying } from "../Atoms/songAtom";

// icons
import {
  SwitchHorizontalIcon,
  RewindIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  FastForwardIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import {
  HeartIcon,
  VolumeUpIcon as VolumeIcon,
} from "@heroicons/react/outline";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();

  // console.log(songInfo);

  const { data: session, status } = useSession();

  const [currentTrackId, setCurrentTrack] = useRecoilState(currentSongId);
  const [isPlaying, setIsPlaying] = useRecoilState(songPlaying);

  const [volume, setVolume] = useState(50);

  const fetchCurrentTrack = async () => {
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data: any) => {
          setCurrentTrack(data.body?.item?.id);

          spotifyApi
            .getMyCurrentPlaybackState()
            .then((data: any) => {
              // console.log(data.body);
              setIsPlaying(data.body?.is_playing);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const PausePlay = async () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data: any) => {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
      setVolume(50);
    }
  }, [currentTrackId, session]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (volume > 0 && volume < 100) {
        debounceAdjustVolume(volume);
      }
    }
  }, [volume]);

  //useCallback() will essentially a memoized function that we create that we can use to say on mount of a component if i have nothing in the dependency array create this function once and don't keep trying to create it again. so we will debounce / limit the function meaning that we will wait until the user changes the volume and then after 50 milliseconds it will send the request so that we are not constantly sending requests which will get us rate limited

  const debounceAdjustVolume = useCallback(
    debounce((volume: any) => {
      spotifyApi.setVolume(volume).catch((err:any) => console.log(err));
    }, 500),
    []
  );

  return (
    <div className="flex w-full justify-between px-4">
      <div className="flex items-center">
        <img
          className="w-20 h-20 p-1 mr-4"
          src={songInfo ? songInfo?.album?.images[0]?.url : ""}
          alt=""
        />
        <div className="">
          <h2 className="text-lg">{songInfo?.name}</h2>
          <p className="text-gray-500">
            {songInfo?.artists
              .map((artist: any) => {
                return `${artist.name}`;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex justify-evenly items-center w-72">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />
        {isPlaying ? (
          <PauseIcon onClick={PausePlay} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={PausePlay} className="button w-10 h-10" />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="button"
        />
        <ReplyIcon className="button" /* onClick={() => } */ />
      </div>
      <div className="flex items-center md:space-x-4 justify-end pr-5">
        <VolumeIcon
          onClick={() => volume > 0 && setVolume((prev) => prev - 10)}
          className="button"
        />
        <input
          type="range"
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          value={volume}
          className="w-14  md:w-28"
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume((prev) => prev + 10)}
          className="button"
        />
      </div>
    </div>
  );
}

export default Player;
