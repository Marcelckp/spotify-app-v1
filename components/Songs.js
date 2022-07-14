import { useRecoilValue } from "recoil";
import { playlistStateAtom } from "../Atoms/playlistAtom";
import moment from "moment";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistStateAtom);
//   console.log(playlist);

  return (
    <div className="scrollbar-hide">
      {playlist?.tracks?.items.map((song, idx) => {
        const mnt = moment(song?.track?.duration_ms);
        {
          return (
            <Song
              key={song?.track?.name}
              name={song?.track?.name}
              image={song?.track?.album.images[0].url}
              album={song?.track?.album?.name}
              artists={song?.track?.artists}
              duration={mnt.format("m:ss")}
              idx={idx}
              songId={song?.track?.id}
              songUri={song?.track?.uri}
            />
          );
        }
      })}
    </div>
  );
}

export default Songs;
