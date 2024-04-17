import { query } from "./mysql";
import { Types } from "mysql2";

const QUERY_INSERT_PRE = "INSERT INTO AM_Prenotazioni(id_utente, id_aula, data_ora_pre) VALUES (?, ?, ?)";
const QUERY_SELECT_PRE_ID_UTENTE = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ?";
const QUERY_SELECT_PRE_DATARANGE = "SELECT * FROM AM_Prenotazioni WHERE data_ora_pre BETWEEN ? and ?";
const QUERY_SELECT_PRE_ID_UTENTE_DATASTART = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ? and data_ora_pre > ?";
const QUERY_DELETE_PRE_ID = "DELETE FROM AM_Prenotazioni WHERE id_prenotazione = ?"
const QUERY_UPDATE_PRE = "UPDATE AM_Prenotazioni SET id_aula = ?, data_ora_pre = ? WHERE id_prenotazione = ?"
const QUERY_SELECT_UTENTE_EMAIL = "SELECT * FROM AM_Utenti WHERE email_utente = ?";
const QUERY_SELECT_AULA = "SELECT * FROM AM_Aule";

export type TimeFrame = {
  data: Date,
  inizio: number,
  fine: number,
}

var TimeFrame: {
  new(): TimeFrame;
  prototype: TimeFrame;
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

export type Prenotazione = {
  id?: number;
  id_utente: number;
  id_aula: number;
  data: Date;
  approvata: boolean;
}

export async function IDfromEmail(email: string) {
  const ret = await query<Utente>(
    QUERY_SELECT_UTENTE_EMAIL,
    [email]
  );

  if (ret) {
    return ret[0].id;
  }

  return undefined;
}

export async function INSERT_Prenotazione(prenotazione: Prenotazione) {
  const formattedDate = new Date(prenotazione.data).toISOString().slice(0, 19).replace('T', ' ');

  const res = await query(
    QUERY_INSERT_PRE,
    [prenotazione.id_utente, prenotazione.id_aula, formattedDate, prenotazione.approvata]
  );

  return res;
}

// Implement paramter-specific SELECT (e.g. SELECTing a user while only knowing the email)
export async function SELECT_UtenteEmail(email: string) {
  const ret = await query<Utente>(
    QUERY_SELECT_UTENTE_EMAIL,
    [email]
  );

  if (ret) {
    return ret[0];
  }

  return undefined;
}

export async function SELECT_PrenotazioniData(date_start: Date, date_end: Date, aula?: Aula) {
  const date_start_string = date_start.toISOString().slice(0, 19).replace("T", " ");
  const date_end_string = date_end.toISOString().slice(0, 19).replace("T", " ");

  const ret = await query<Prenotazione>(
    QUERY_SELECT_PRE_DATARANGE,
    [date_start_string, date_end_string]
  )

  return ret;
}

export async function SELECT_PrenotazioniUtente(email_utente: string, data: Date | null) {
  const id_utente = await IDfromEmail(email_utente);

  if (data) {
    const date_start_string = data.toISOString().slice(0, 19).replace("T", " ");

    const ret = await query<Prenotazione>(
      QUERY_SELECT_PRE_ID_UTENTE_DATASTART,
      [id_utente, date_start_string]
    )

    return ret;
  }

  const ret = await query<Prenotazione>(
    QUERY_SELECT_PRE_ID_UTENTE,
    [id_utente]
  );

  return ret;
}

export async function deletePrenotazione(id_prenotazione: number) {

}

export async function modifyPrenotazione(new_prenotazione: Prenotazione) {

}
