import { query } from "./mysql";

const QUERY_INSERT_PRE = "INSERT INTO AM_Prenotazioni(id_utente, id_aula, data, ora_inizio, ora_fine) VALUES (?, ?, ?, ?, ?)";
const QUERY_SELECT_PRE_UTENTE = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ?";
const QUERY_SELECT_PRE_RANGE = "SELECT * FROM AM_Prenotazioni WHERE data = ? AND ora_inizio BETWEEN ? and ? AND id_aula = ?";
const QUERY_SELECT_PRE_UTENTE_AFTER = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ? and data > ?";
const QUERY_DELETE_PRE = "DELETE FROM AM_Prenotazioni WHERE id = ?"
const QUERY_UPDATE_PRE = "UPDATE AM_Prenotazioni SET id_aula = ?, data = ? WHERE id = ?"
const QUERY_SELECT_UTENTE_EMAIL = "SELECT * FROM AM_Utenti WHERE email = ?";
const QUERY_SELECT_AULA = "SELECT * FROM AM_Aule";

export type TimeFrame = {
  data: Date,
  inizio: number,
  fine: number,
}

export type Aula = {
  id: number;
  type: string;
}

export type Utente = {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  type: string;
}

export const ADMIN_USER = "Amministratore";
export const REGULAR_USER = "Studente";

export type Prenotazione = {
  id?: number;
  id_utente: number;
  id_aula: number;
  data: Date;
  approvata: boolean;
}

export function timeToString(time: number) {
  return Math.floor(time / 60).toString().padStart(2, "0") + ":" + (time % 60).toString().padStart(2, "0") + ":" + "00";
}

export async function insertPrenotazione(prenotazione: Prenotazione) {
  const formattedDate = new Date(prenotazione.data).toISOString().slice(0, 19).replace('T', ' ');

  const res = await query(
    QUERY_INSERT_PRE,
    [prenotazione.id_utente, prenotazione.id_aula, formattedDate, prenotazione.approvata]
  );

  return res;
}

// Implement paramter-specific SELECT (e.g. SELECTing a user while only knowing the email)
export async function selectUtenteEmail(email: string) {
  const ret = await query<Utente>(
    QUERY_SELECT_UTENTE_EMAIL,
    [email]
  );

  if (ret) {
    return ret[0];
  }

  return undefined;
}

export async function IDfromEmail(email: string) {
  const user = await selectUtenteEmail(email);
  if (user) {
    return user.id;
  }

  return undefined;
}

export async function selectPrenotazioneRange(date: Date, time_start: number, time_end: number, aula: number) {
  const date_string = date.toISOString().slice(0, 10);
  const time_start_string = timeToString(time_start);
  const time_end_string = timeToString(time_end);

  //console.log(date_string, time_start_string, time_end_string, aula);

  const ret = await query<Prenotazione>(
    QUERY_SELECT_PRE_RANGE,
    [date_string, time_start_string, time_end_string, aula]
  )

  return ret;
}

export async function selectPrenotazioniUser(email_utente: string, data: Date | null) {
  const id_utente = await IDfromEmail(email_utente);

  if (data) {
    const date_start_string = data.toISOString().slice(0, 19).replace("T", " ");

    const ret = await query<Prenotazione>(
      QUERY_SELECT_PRE_UTENTE_AFTER,
      [id_utente, date_start_string]
    )

    return ret;
  }

  const ret = await query<Prenotazione>(
    QUERY_SELECT_PRE_UTENTE,
    [id_utente]
  );

  return ret;
}

export async function deletePrenotazione(id_prenotazione: number) {

}

export async function modifyPrenotazione(new_prenotazione: Prenotazione) {

}
