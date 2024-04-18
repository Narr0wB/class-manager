import { SELECT_UtenteEmail } from "@/lib/backend/database"

export default async function checkValidUser(userEmail: string) {
  // Check if user is in database
  const utente = await SELECT_UtenteEmail(userEmail) as any;

  if (utente.length == 0) {
    return false
  }

  return true
}
