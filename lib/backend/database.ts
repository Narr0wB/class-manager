import * as db from "@/lib/backend/sqlapi";
import { DatabaseResponse, DefaultResponse } from "@/lib/backend/sqlapi";

export type Aula = {
  id_aula: number;
  type_aula: string;
}

export type Utente = {
  nome_utente: string;
  cognome_utente: string;
  email_utente: string;
  type_utente: string;
  id_utente: number;
}

export type Prenotazione = {
  utente: Utente;
  aula: Aula;
  id_prenotazione: number;
  data_ora_prenotazione: Date;
  approvata: boolean;
}

export async function insertPrenotazione(prenotazione: Prenotazione) {
  await db.runQuery(
    db.SQL_QUERY_INSERT_PRE_FOR,
    [prenotazione.utente.id_utente, prenotazione.aula.id_aula, prenotazione.data_ora_prenotazione, prenotazione.approvata]
  );

  return {
    ok: true,
    body: {
      message: "gaming"
    }
  } satisfies DefaultResponse;
}

// Implement paramter-specific fetch (e.g. fetching a user while only knowing the email)

export async function fetchUtenteEmail(email: string) {
  const ret = await db.runQuery(
    db.SQL_QUERY_FETCH_UTENTE_EMAIL,
    [email]
  )

  return ret as DatabaseResponse
}

export async function fetchPrenotazioniDate(date_start: Date, date_end: Date, aula?: Aula) {

  const date_start_string = date_start.toISOString().slice(0, 19).replace("T", " ");
  const date_end_string = date_end.toISOString().slice(0, 19).replace("T", " ");

  const ret = await db.runQuery(
    db.SQL_QUERY_FETCH_ALL_PRE_BETWEEN,
    [date_start_string, date_end_string]
  )

  return ret as DatabaseResponse
}

export async function deletePrenotazione(id_prenotazione: number) {

}

export async function modifyPrenotazione(new_prenotazione: Prenotazione) {
  
}
