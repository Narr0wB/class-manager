import { ADMIN_USER, selectUtenteEmail } from "@/lib/backend/database"
import { google } from "googleapis";
// import Credentials from "@/manager_service.json"

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

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// export async function getCalendarioAPIToken() {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: Credentials.client_email,
//       private_key: Credentials.private_key
//     },
//     scopes: SCOPES,
//     clientOptions: {
//       subject: "calendario@liceocuneo.it"
//     }
//   });
//
//   const access_token = await auth.getAccessToken();
//   return access_token;
// }

export function getSecondsUntil(targetHour: string): number {
  const [targetHours, targetMinutes] = targetHour.split(':').map(Number);

  const now = new Date();
  const nextTargetHour = new Date();
  nextTargetHour.setHours(targetHours, targetMinutes, 0, 0);

  if (now.getHours() > targetHours || (now.getHours() === targetHours && now.getMinutes() > targetMinutes)) {
    nextTargetHour.setDate(now.getDate() + 1);
  }

  const diffMs = nextTargetHour.getTime() - now.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  return diffSecs;
}
