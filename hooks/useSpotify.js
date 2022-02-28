// CUSTOM HOOK 
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
// import spotifyApi from '../lib/spotify';

//New instance
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET
})

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            // if the refresh access toke attempt fails, direct the user to the login page
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            // else
            // singleTON pattern where we initialize the spotify object once in the lib folder OR have a new instance
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}

export default useSpotify;
