import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentSongId } from "../Atoms/songAtom";
import { songPlaying } from "../Atoms/songAtom";
import { useState } from "react";

function LikedSong({
  name,
  duration,
  added,
  album,
  image,
  artists,
  idx,
  songUri,
  songId,
}) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentSongId);
  const [isPlaying, setSongPlaying] = useRecoilState(songPlaying);

  const [options, setOptions] = useState(false)

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
      className="tableLikes rounded-lg w-full text-white items-center flex cursor-pointer hover:bg-white hover:bg-opacity-10 hover:text-white"
      key={name}
      onClick={() => playSong()}
    >
      <div className='flex justify-center py-4 ml-3'>
        { options ? <p>playbutton</p> :<p className="pl-4 mr-4">{idx + 1}</p> }
      </div>
      <div className='flex py-4 ml-4 items-center'>
        <img className="h-12 w-12 mr-4" src={image} alt="" />

        <div className="flex justify-center flex-col">
          <h1 className="">{name}</h1>
          <p className="text-xs text-gray-500 hover:text-white">
            {artists.length === 1
              ? artists[0].name
              : artists
                  .map((artist) => {
                    return `${artist.name}`;
                  })
                  .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center py-4">
        <p>{album}</p>
      </div>
      <div className="flex items-center ml-8 py-4">
        <p>{added}</p>
      </div>
      <div className="flex items-center ml-12 py-4">
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default LikedSong;
