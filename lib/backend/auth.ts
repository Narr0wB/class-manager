import { fetchUtenteEmail } from "@/lib/backend/database"

export default async function checkUser(userEmail: string) {
  // Check if user is in database
  const utente = await fetchUtenteEmail(userEmail)

  if (utente.length == 0) {
    return false
  }

  return true
}
