import mysql from "mysql2"
import { RowDataPacket } from "mysql2";
import * as db from "@/backend/sqlapi";

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

export type DefaultResponse = {
    ok: boolean
}

export type PrenotazioneInsertReponse = DefaultResponse & {
    body: {
        message: string
    }
}

export type UtenteInsertResponse = DefaultResponse & {
    body: {
        message: string
    } | {
        utente: Utente
    } | {
        utenti: Utente[]
    }
}

export type PrenotazioneFetchResponse = DefaultResponse & {
    body: {
        message: string
    } | {
        prenotazione: Prenotazione
    } | {
        prenotazione: Prenotazione[]
    }
}

export async function insertUtente(utente: Utente) {

}

export async function insertPrenotazione(prenotazione: Prenotazione) {
    await db.execQuery(
        db.queries_strings[db.SQL_QUERY_INSERT_PRE_FOR], 
        [prenotazione.utente.id_utente, prenotazione.aula.id_aula, prenotazione.data_ora_prenotazione, prenotazione.approvata]
    );

    return {
        ok: true,
        body: {
            message: "gaming"
        }
    } satisfies PrenotazioneInsertReponse;
}

// Implement paramter-specific fetch (e.g. fetching a user while only knowing the email)

export async function fetchUtenteEmail(email: string) {
    const ret = await db.execQuery(
        db.queries_strings[db.SQL_QUERY_FETCH_UTENTE_EMAIL], 
        [email]
    )

    return (ret as RowDataPacket)
}

export async function fetchPrenotazione(prenotazione: Prenotazione) {

}
