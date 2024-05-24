import mysql, { ResultSetHeader } from "mysql2";

type OkBody = {
  data: any;
};

type ErrorBody = {
  message: string;
};

export class DatabaseResponse<T extends boolean> {
  ok: T;
  body: T extends true ? OkBody : ErrorBody;

  constructor(ok: T, body: T extends true ? OkBody : ErrorBody) {
    this.ok = ok;
    this.body = body;
  }

  static ok(body: OkBody): DatabaseResponse<true> {
    return new DatabaseResponse(true, body);
  }

  static error(message: string): DatabaseResponse<false> {
    return new DatabaseResponse(false, { message: message });
  }
}

type QueryType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';


const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }).promise();

export async function query<T>(sql: string, values: any, type: QueryType) {
  try {
    const [result, fields] = await pool.query(sql, values);
    if (type === 'SELECT') {
      return DatabaseResponse.ok({ data: result as T[] });
    } else {
      return DatabaseResponse.ok({ data: (result as ResultSetHeader).insertId });
    }
  } catch (error: any) {
    return DatabaseResponse.error(`Error while executing the query: "${sql}"`);
  }
}

// Usage examples
export async function INSERT(sql: string, values: any) {
  return query(sql, values, 'INSERT');
}

export async function SELECT<T>(sql: string, values: any) {
  return query<T>(sql, values, 'SELECT');
}

export async function UPDATE(sql: string, values: any) {
  return query(sql, values, 'UPDATE');
}

export async function DELETE(sql: string, values: any) {
  return query(sql, values, 'DELETE');
}