import auth from "next-auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { isValidToken, createAccessToken } from "@/backend/token"
import { fetchUtenteEmail } from "@/backend/database"

export default async function checkUser(userEmail: string) {
    // Check if user is in database
    const utente = await fetchUtenteEmail(userEmail)

    if (utente.length == 0) {
        return false
    }

    return true
}
