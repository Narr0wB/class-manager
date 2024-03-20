
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import checkUser from "@/backend/auth"

const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOptions: NextAuthOptions = {
    session : {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
        error: "login/error"
    },
    providers : [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        })
    ],
    callbacks : {
        async signIn({ account, profile }) {
            if (account?.provider == "google" && await checkUser(profile?.email!)) {
                return true
            }

            return "/login/error"
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}