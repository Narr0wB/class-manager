import mysql from "mysql2"

export const SQL_QUERY_INSERT_PRE_FOR = 1;
export const SQL_QUERY_FETCH_ALL_PRE_FOR = 2;
export const SQL_QUERY_INSERT_UTENTE = 3;
export const SQL_QUERY_FETCH_UTENTE = 4;
export const SQL_QUERY_FETCH_AULA = 5;

export const queries_strings: { [id: number] : string } = {
    [SQL_QUERY_INSERT_PRE_FOR]: "INSERT INTO AM_Prenotazioni(id_utente, id_aula, data_ora_pre) VALUES (?, ?, ?)",
    [SQL_QUERY_FETCH_ALL_PRE_FOR]: "SELECT * FROM AM_Prenotazioni WHERE id_utente = ?",
    [SQL_QUERY_INSERT_UTENTE]: "INSERT INTO AM_Utenti(nome_utente, cognome_utente, email_utente, type_utente) VALUES (?, ?, ?, ?)",
    [SQL_QUERY_FETCH_UTENTE]: "SELECT * FROM AM_Utenti WHERE",
    [SQL_QUERY_FETCH_AULA]: "SELECT * FROM AM_Aule WHERE",
}


// TODO: add these env vars in my system (eddu)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise()

export class DatabaseError extends Error {
    errno?: number;
    code?: string;
    sql?: string;
  
    constructor(message: string, sql?: string, errno?: number, code?: string, stack?: string) {
      super(message);
      this.name = "DatabaseError";
      this.sql = sql;
      this.errno = errno;
      this.code = code;
      this.stack = stack;
    }
}

export async function execQuery(query: string, values?: any[]) {
    try {
        let dbRes;
        if (values) dbRes = await pool.query(query, values);
        else dbRes = await pool.query(query);

        return dbRes[0];
    } catch (err: any) {
        throw new DatabaseError("Error while executing the query.", err.sql, err.errno, err.code, err.stack)
    }
}