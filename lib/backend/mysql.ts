import mysql from "mysql2"
import { RowDataPacket } from "mysql2";

export type DatabaseResponse = RowDataPacket;
export type DefaultResponse = {
  ok: boolean
  body: {
    message: string
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).promise()

export async function query(query: string, values: any[] = []) {
  try {
    const res = await pool.query(query, values);
    return res[0];
  }
  catch (error: any) {
    console.error(error);
  }
}