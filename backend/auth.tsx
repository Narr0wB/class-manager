import auth from "next-auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { isValidToken, createAccessToken } from "@/backend/token"

// Helper function to check if a user accessing the /home page is authenticated
export default function isAuthenticated() {
    const cookie_storage = cookies()
    const auth_token = cookie_storage.get("auth_token")

    // Redirect to the login page
    if (auth_token == undefined) {
       redirect('/login');
    }
    
    // Check the validity of the auth token
    if (isValidToken(auth_token.value)) {
        return;
    }
    
    // Use the refresh token to get a new access token
    const refresh_token = cookie_storage.get("refresh_token")
    if (refresh_token == undefined) {
        redirect('/login');
    }

    if (isValidToken(refresh_token.value)) {
        createAccessToken()
        return
    }
    else {
        redirect('/login');
    }
}
