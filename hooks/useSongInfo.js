import React, { useEffect, useState } from 'react';
import useSpotify from './useSpotify';
import { currentSongId } from '../Atoms/songAtom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrack] = useRecoilState(currentSongId);
    const [songInfo, setSongInfo] = useState(null);
    // console.log(currentTrackId);

    useEffect(() => {
        // this is how to use a async function inside a useEffect;
        const fetchData = async () => {
            if (currentTrackId) {
                const trackInfo = await axios.get(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    { headers: { 'Authorization': `Bearer ${spotifyApi.getAccessToken()}` } }
                )

                setSongInfo(trackInfo.data);
            }
        }
    
        fetchData();
    },[currentTrackId])

  return songInfo;
}

export default useSongInfo;
