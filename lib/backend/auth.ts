import { ADMIN_USER, selectUtenteEmail } from "@/lib/backend/database"

export default async function checkValidUser(userEmail: string) {
  const res = await selectUtenteEmail(userEmail);
  return res.ok;
}

export async function checkIfAdmin(userEmail: string) {
  const res = await selectUtenteEmail(userEmail);
  return res.ok && res.body.type == ADMIN_USER;
}