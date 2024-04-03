import mysql from "mysql2"
import { RowDataPacket } from "mysql2";

export const SQL_QUERY_INSERT_PRE_FOR        =    "INSERT INTO AM_Prenotazioni(id_utente, id_aula, data_ora_pre) VALUES (?, ?, ?)";
export const SQL_QUERY_FETCH_ALL_PRE_FOR     =    "SELECT * FROM AM_Prenotazioni WHERE email_utente = ?";
export const SQL_QUERY_FETCH_ALL_PRE_BETWEEN =    "SELECT * FROM AM_Prenotazioni WHERE data_ora_pre BETWEEN ? and ?"
export const SQL_QUERY_DELETE_PRE            =    "DELETE FROM AM_Prenotazioni WHERE id_prenotazione = ?"
export const SQL_QUERY_MODIFY_PRE            =    "UPDATE AM_Prenotazioni SET id_aula = ?, data_ora_pre = ? WHERE id_prenotazione = ?"
export const SQL_QUERY_FETCH_UTENTE_EMAIL    =    "SELECT * FROM AM_Utenti WHERE email_utente = ?";
export const SQL_QUERY_FETCH_AULA            =    "SELECT * FROM AM_Aule WHERE";

export type DatabaseResponse = RowDataPacket;
export type DefaultResponse = {
  ok: boolean
  body: {
    message: string
  }
}

// TODO: add these env vars in my system (eddu)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).promise()

export async function runQuery(query: string, values?: any[]) {
  try {
    let result;

    if (values) {
      result = await pool.query(query, values)
    }
    else {
      result = await pool.query(query)
    }

    return result[0]
  }
  catch (error: any) {
    console.log(`Error while executing the query: "${query}" with values "${values}"`, error.sql, error.errno, error.code, error.stack)

    return {
      ok: false,
      body: {
        message: "Error while executing the query"
      }
    } satisfies DefaultResponse
  }
}