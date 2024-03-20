import checkUser from "@/lib/backend/auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: {
    maxAge: 3 * 24 * 60 * 60, // 3 days,
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      // if (account?.provider == "google" && await checkUser(profile?.email!)) {

      // TODO REMOVE THIS!! TEST ONLY
      if (account?.provider == "google" && await checkUser(profile?.email!)) {
        return true
      }

      return "/login/error"
    },
  }
}