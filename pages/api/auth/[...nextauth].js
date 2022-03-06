import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth";
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('token is ', refreshToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
        
    } catch (e) {
        console.log(e);
        return {
            ...token,
            error: 'refreshAccessTokenError'
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
            authorization: LOGIN_URL
        }),
    ],
    secret: process.env.NEXT_JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // if initial signIn 
            console.log('initial signIN')
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: user.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000
                }
            }

            // return the previous token if the access token has not expired
            if (Date.now() < token.accessTokenExpires) {
                console.log('existing token is valid');
                console.log( token, 'the user', user, 'the account', account );
                return token;
            }

            // if Access token has expired
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username

            return session;
        }
    }
})