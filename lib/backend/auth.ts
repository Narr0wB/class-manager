import { ADMIN_USER, Utente, selectUtenteEmail } from "@/lib/backend/database"

export default async function checkValidUser(userEmail: string) {
  // Check if user is in database
  const res = await selectUtenteEmail(userEmail);
  return res.ok
}


export async function checkIfAdmin(userEmail: string) {
  const res = await selectUtenteEmail(userEmail);

  if (res.ok && (res.body.data as Utente).type == ADMIN_USER) {
    return true;
  }

  return false;
}