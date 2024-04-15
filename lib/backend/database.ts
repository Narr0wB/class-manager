import { query } from "./mysql";
import { Types } from "mysql2";

const INSERT_PRE = "INSERT INTO AM_Prenotazioni(id_utente, id_aula, data_ora_pre) VALUES (?, ?, ?)";
const SELECT_PRE_ALL_EMAIL = "SELECT * FROM AM_Prenotazioni WHERE email_utente = ?";
const SELECT_PRE_ALL_DATARANGE = "SELECT * FROM AM_Prenotazioni WHERE data_ora_pre BETWEEN ? and ?"
const DELETE_PRE_ID = "DELETE FROM AM_Prenotazioni WHERE id_prenotazione = ?"
const UPDATE_PRE = "UPDATE AM_Prenotazioni SET id_aula = ?, data_ora_pre = ? WHERE id_prenotazione = ?"
const SELECT_UTENTE_ALL_EMAIL = "SELECT * FROM AM_Utenti WHERE email_utente = ?";
const SELECT_AULA_ALL = "SELECT * FROM AM_Aule";

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
  id: number;
  id_utente: number;
  id_aula: number;
  data: Date;
  approvata: boolean;
}

export async function insertPrenotazione(prenotazione: Prenotazione) {
  const res = await query(
    INSERT_PRE,
    [prenotazione.id_utente, prenotazione.id_aula, prenotazione.data, prenotazione.approvata]
  );
  return res;
}

// Implement paramter-specific SELECT (e.g. SELECTing a user while only knowing the email)
export async function SELECTUtenteEmail(email: string) {
  const ret = await query(
    SELECT_UTENTE_ALL_EMAIL,
    [email]
  )

  return ret
}

export async function SELECTPrenotazioniDate(date_start: Date, date_end: Date, aula?: Aula) {
  const date_start_string = date_start.toISOString().slice(0, 19).replace("T", " ");
  const date_end_string = date_end.toISOString().slice(0, 19).replace("T", " ");

  const ret = await query(
    SELECT_PRE_ALL_DATARANGE,
    [date_start_string, date_end_string]
  )

  return ret
}

export async function deletePrenotazione(id_prenotazione: number) {

}

export async function modifyPrenotazione(new_prenotazione: Prenotazione) {

}
