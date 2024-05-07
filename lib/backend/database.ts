import { PrenotazioneInfo, Ruleset } from "@/app/(routes)/(pages)/home/components/test/admin";
import { formatHour } from "../utils";
import { query } from "./mysql";
import { RowDataPacket } from "mysql2";

const QUERY_INSERT_PRE = "INSERT INTO AM_Prenotazioni(data_ora_prenotazione, id_utente, id_aula, data, status, ora_inizio, ora_fine) VALUES (?, ?, ?, ?, ?, ?, ?)";
const QUERY_SELECT_PRE_UTENTE = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ?";
const QUERY_SELECT_PRE_RANGE = "SELECT * FROM AM_Prenotazioni WHERE data = ? AND ora_inizio BETWEEN ? and ? AND id_aula = ?";
const QUERY_SELECT_PRE_UTENTE_AFTER = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ? and data > ?";
const QUERY_SELECT_PRE_RULESET = "SELECT * FROM AM_Prenotazioni JOIN AM_Utenti ON AM_Prenotazioni.id_utente = AM_Utenti.id WHERE "
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
  email: string;
  type: string;
}

export const ADMIN_USER = "Amministratore";
export const REGULAR_USER = "Studente";

export type Prenotazione = {
  id?: number;
  data_ora_prenotazione: Date;
  id_utente: number;
  id_aula: number;
  data: Date;
  status: number;
  ora_inizio: number,
  ora_fine: number
}

export const PRENOTAZIONE_PENDING  = 0;
export const PRENOTAZIONE_APPROVED = 1;
export const PRENOTAZIONE_REJECTED = 2;

export function timeToString(time: number) {
  return Math.floor(time / 60).toString().padStart(2, "0") + ":" + (time % 60).toString().padStart(2, "0") + ":" + "00";
}

export async function insertPrenotazione(pren: Prenotazione) {
  const formattedDate = pren.data.toISOString().slice(0, 19).replace('T', ' ');
  const formattedDateInsertion = pren.data_ora_prenotazione.toISOString().slice(0, 19).replace('T', ' ');


  const ora_inizio_string = formatHour(pren.ora_inizio);
  const ora_fine_string = formatHour(pren.ora_fine);

  const res = await query(
    QUERY_INSERT_PRE,
    [formattedDateInsertion, pren.id_utente, pren.id_aula, formattedDate, pren.status, ora_inizio_string, ora_fine_string]
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

export async function selectPrenotazioneRuleset(num: number, ruleset: Ruleset, before: Date) {
  let query_string: string = QUERY_SELECT_PRE_RULESET + ruleset.dashRule.sqlRule;
  let query_values: any[] = [...ruleset.dashRule.values];

  ruleset.filterRules.forEach((r) => {
    query_string += " and ";
    query_string += r.sqlRule;

    query_values.concat(...r.values);
  });

  query_string += " and ";
  query_string += "data_ora_prenotazione <= ?";
  query_string += " LIMIT ?";

  const date_string = before.toISOString().slice(0, 19).replace('T', ' ');

  const ret = await query(
    query_string,
    [...query_values, date_string, num]
  );

  var result: PrenotazioneInfo[] = [];

  ret?.forEach((pren: RowDataPacket) => {
    result.push({
      id: pren.id,
      data_ora_prenotazione: (pren.data_ora_prenotazione),
      id_utente: pren.id_utente,
      id_aula: pren.id_aula,
      data: (pren.data),
      status: pren.status,
      ora_inizio: pren.ora_inizio.substring(0, 5),
      ora_fine: pren.ora_fine.substring(0, 5),
      name: pren.nome,
      desc: "eddu gaming for now",
      subject: "gaming",
      read: false,
      label: "Aula " + pren.id_aula
    })
  })

  return result;
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
    const date_start_string = data.toISOString().slice(0, 19).replace('T', ' ');

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
