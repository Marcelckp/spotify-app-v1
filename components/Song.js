import React from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentSongId } from "../Atoms/songAtom";
import { songPlaying } from "../Atoms/songAtom";

function Song({ name, duration, album, image, artists, idx, songUri, songId }) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentSongId);
  const [isPlaying, setSongPlaying] = useRecoilState(songPlaying);

  const playSong = async () => {
    setSongPlaying(true);
    setCurrentTrackId(songId);
    spotifyApi
      .play({
        uris: [songUri],
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="tablePlaylist py-4 px-6 rounded-lg w-full text-white items-center cursor-pointer hover:bg-white hover:bg-opacity-10 hover:text-white"
      key={name}
      onClick={() => playSong()}
    >
      <div>
        <p className="p-2 mr-8">{idx + 1}</p>
      </div>
      <div className="flex py-4 ml-4 items-center">
        <img className="h-12 w-12 mr-4" src={image} alt="" />

        <div className="flex flex-col justify-center">
          <h1 className="">{name}</h1>
          <p className="text-xs text-gray-500 hover:text-white">
            {artists
              .map((artist) => {
                return `${artist.name}`;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p>{album}</p>
      </div>
      <div className="flex items-center ml-12">
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default Song;
