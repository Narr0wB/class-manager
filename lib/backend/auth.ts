import { ADMIN_USER, selectUtenteEmail } from "@/lib/backend/database"

export default async function checkValidUser(userEmail: string) {
  // Check if user is in database
  const utente = await selectUtenteEmail(userEmail);

  if (!utente) {
    return false
  }

  return true
}


export async function checkIfAdmin(userEmail: string) {
  const utente = await selectUtenteEmail(userEmail);

  if (!utente) {
    return false;
  }

  if (utente.type == ADMIN_USER) {
    return true;
  }

  return false;
}