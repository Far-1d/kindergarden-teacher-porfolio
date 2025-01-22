import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/lib/database';
import User from '@/models/user';
import { JWT } from 'next-auth/jwt';


async function refreshAccessToken(token: JWT):Promise<JWT> {
    try {
        const url = "https://oauth2.googleapis.com/token";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken!,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) throw refreshedTokens;

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Use new refresh token if provided
        };
    } catch (error) {
        console.error("Failed to refresh access token", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}


const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    scope: 'openid profile email https://www.googleapis.com/auth/drive.file', // Include Google Drive scope
                },
            },
        }),
    ],
    
    callbacks: {
        async jwt({ token, account }) {
            // Store tokens on first sign in
            if (account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    expiresAt: Date.now() + (account.expires_in as number) * 1000,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.expiresAt!) {
                return token;
            }

            // Access token has expired, try to update it
            return await refreshAccessToken(token);
        },

        async session({session, token}) {
            const sessionUser = await User.findOne({
                email: session.user!.email
            })
            
            if ('id' in session.user!){
                session.user!.id = sessionUser._id.toString();
            }
            
            if (token) {
                session.accessToken = token.accessToken;
                session.error = token.error;
                session.refreshToken = token.refreshToken;
            }

            return session;
        },

        async signIn({profile}) {
            try {
                await connectToDB();

                console.log(profile);
                // check if a user already exit
                const userExists = await User.findOne({
                    email: profile!.email
                })

                // if not create user
                if (!userExists){
                    await User.create({
                        email: profile!.email,
                        username: profile!.name!.replace(" ","_").toLowerCase() || 
                                    // @ts-ignore
                                    (profile!.login.replace(" ", '_').toLowerCase()),
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
})


export { handler as GET, handler as POST}
// export default NextAuth(handler)
