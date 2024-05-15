import { PrenotazioneInfo, Ruleset, DashboardRule } from "@/lib/backend/admin";
import { formatHour } from "../utils";
import { query } from "./mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const QUERY_INSERT_PRE = "INSERT INTO AM_Prenotazioni(data_ora_prenotazione, id_utente, id_aula, data, status, ora_inizio, ora_fine) VALUES (?, ?, ?, ?, ?, ?, ?)";
const QUERY_SELECT_PRE_UTENTE = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ?";
const QUERY_SELECT_PRE_RANGE = "SELECT * FROM AM_Prenotazioni WHERE data = ? and ora_inizio >= ? and ora_inizio <= ? and id_aula = ?";
const QUERY_SELECT_PRE_UTENTE_AFTER = "SELECT * FROM AM_Prenotazioni WHERE id_utente = ? and data > ?";
const QUERY_SELECT_PRE_RULESET = "SELECT AM_Prenotazioni.id, AM_Prenotazioni.*, AM_Utenti.nome FROM AM_Prenotazioni JOIN AM_Utenti ON AM_Prenotazioni.id_utente = AM_Utenti.id WHERE "
const QUERY_SELECT_UTENTE_PRE = "SELECT AM_Utenti.* FROM AM_Prenotazioni JOIN AM_Utenti on AM_Prenotazioni.id_utente = AM_Utenti.id WHERE AM_Prenotazioni.id = ?"
const QUERY_DELETE_PRE = "DELETE FROM AM_Prenotazioni WHERE id = ?"
const QUERY_SELECT_PRE = "SELECT * FROM AM_Prenotazioni WHERE id = ?"
const QUERY_UPDATE_PRE_STATUS = "UPDATE AM_Prenotazioni SET status = ? WHERE id = ?"
const QUERY_UPDATE_PRE_HOUR = "UPDATE AM_Prenotazioni SET ora_inizio = ?, ora_fine = ? WHERE id = ?"
const QUERY_SELECT_UTENTE_EMAIL = "SELECT * FROM AM_Utenti WHERE email = ?";
const QUERY_NUMBER_PRE_AFTER = "SELECT COUNT(*) FROM AM_Prenotazioni WHERE id_utente = ? and data >= ?";
const QUERY_SELECT_UTENTE_EMAIL_LIKE = "SELECT * FROM AM_Utenti WHERE email LIKE CONCAT('%', ?, '%')";
const QUERY_INSERT_PARTECIPAZIONE = "INSERT INTO AM_Partecipazioni(id_prenotazione, id_utente) VALUES (?, ?)";

function createDescription(nome: string, ora_inizio: string, ora_fine: string, aula: number) {
  let description = nome + " ha prenotato l'aula " + aula + " dalle " + ora_inizio.substring(0, 5) + " alle " + ora_fine.substring(0, 5);

  return description;
}

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

export const PRENOTAZIONE_PENDING = 0;
export const PRENOTAZIONE_APPROVED = 1;
export const PRENOTAZIONE_REJECTED = 2;

export function timeToString(time: number) {
  return Math.floor(time / 60).toString().padStart(2, "0") + ":" + (time % 60).toString().padStart(2, "0") + ":" + "00";
}

export async function changeStatusPrenotazione(id: number, status: number) {

  const res = await query(
    QUERY_UPDATE_PRE_STATUS,
    [status, id]
  );

  return res;
}

export async function insertPrenotazione(pren: Prenotazione) {
  const formattedDate = pren.data.toISOString().slice(0, 19).replace('T', ' ');
  const formattedDateInsertion = pren.data_ora_prenotazione.toISOString().slice(0, 19).replace('T', ' ');


  const ora_inizio_string = formatHour(pren.ora_inizio);
  const ora_fine_string = formatHour(pren.ora_fine);

  const res = await query<ResultSetHeader>(
    QUERY_INSERT_PRE,
    [formattedDateInsertion, pren.id_utente, pren.id_aula, formattedDate, pren.status, ora_inizio_string, ora_fine_string]
  );

  return res!.insertId;
}

export async function insertPartecipazioni(id: number, partecipazioni: number[]) {
  partecipazioni.forEach((p) => {
    const ret = query(
      QUERY_INSERT_PARTECIPAZIONE,
      [id, p]
    );
  })
  
  return 0;
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

export async function selectUtentiEmailLike(email_like: string) {
  const ret = await query<Utente>(
    QUERY_SELECT_UTENTE_EMAIL_LIKE,
    [email_like]
  );

  return ret;
}

export async function IDfromEmail(email: string) {
  const user = await selectUtenteEmail(email);
  if (user) {
    return user.id;
  }

  return undefined;
}

export async function IDfromPrenotazione(pren_id: number) {
  const user = await query<Utente>(
    QUERY_SELECT_UTENTE_PRE,
    [pren_id]
  );

  return user![0].id;
}

export async function numberPrenotazioniUtente(id_utente: number, after: Date) {
  const date_string = after.toISOString().slice(0, 10);

  const number = await query(
    QUERY_NUMBER_PRE_AFTER,
    [id_utente, date_string]
  );

  return number![0]["COUNT(*)"];
}

export async function statusPrenotazione(id_pren: number) {
  const ret = await query<Prenotazione>(
    QUERY_SELECT_PRE,
    [id_pren]
  );

  return ret![0].status;
}

export async function selectPrenotazioneRuleset(num: number, ruleset: Ruleset, before: Date) {
  let query_string: string = QUERY_SELECT_PRE_RULESET + ruleset.dashRule.sqlRule;
  let query_values: any[] = [...ruleset.dashRule.values];

  for (const [key, value] of Object.entries(ruleset)) {
    if (key == "dashRule") {
      continue;
    }

    query_string += " and ";
    query_string += value.sqlRule;

    query_values = query_values.concat(...value.values);
  }

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
      data_ora_prenotazione: pren.data_ora_prenotazione,
      id_utente: pren.id_utente,
      id_aula: pren.id_aula,
      data: pren.data,
      status: pren.status,
      ora_inizio: pren.ora_inizio.substring(0, 5),
      ora_fine: pren.ora_fine.substring(0, 5),
      name: pren.nome,
      desc: createDescription(pren.nome, pren.ora_inizio, pren.ora_fine, pren.id_aula),
      subject: "Prenotazione",
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

export async function updatePrenotazione(ora_inizio: number, ora_fine: number, id: number) {
  const ret = await query<Prenotazione>(
    QUERY_UPDATE_PRE_HOUR,
    [formatHour(ora_inizio), formatHour(ora_fine), id]
  );

  return ret;
}

export async function deletePrenotazione(id_prenotazione: number) {
  const ret = query<Prenotazione>(
    QUERY_DELETE_PRE,
    [id_prenotazione]
  );

  return ret;
}

