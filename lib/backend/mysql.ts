import mysql, { ResultSetHeader } from "mysql2";

type ErrorBody = {
  message: string;
};

export class DatabaseResponse<T = boolean, OkBody = any> {
  ok: T;
  body: T extends true ? OkBody : ErrorBody;

  constructor(ok: T, body: T extends true ? OkBody : ErrorBody) {
    this.ok = ok;
    this.body = body;
  }

  static ok<OkBody>(body: OkBody): DatabaseResponse<true, OkBody> {
    return new DatabaseResponse<true, OkBody>(true, body);
  }

  static error(message: string): DatabaseResponse<false> {
    return new DatabaseResponse<false>(false, { message: message });
  }
}

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }).promise();

async function query(sql: string, values: any) {
  try {
    const [result, fields] = await pool.query(sql, values);
    return DatabaseResponse.ok({ data: result });
  } catch (error: any) {
    return DatabaseResponse.error(`Error while executing the query: "${sql}"`);
  }
}

export async function INSERT(sql: string, values: any) {
  const res = await query(sql, values);
  if (res.ok) {
    const resulSet = res.body.data as ResultSetHeader;
    return DatabaseResponse.ok(resulSet.insertId);
  } else {
    return res;
  }
}

export async function SELECT<T>(sql: string, values: any) {
  const res = await query(sql, values);
  return res.ok
    ? DatabaseResponse.ok(res.body.data as T)
    : res;
}

export async function UPDATE(sql: string, values: any) {
  const res = await query(sql, values);
  if (res.ok) {
    const resulSet = res.body.data as ResultSetHeader;
    return DatabaseResponse.ok(resulSet.affectedRows != 0);
  } else {
    return res;
  }
}

export async function DELETE(sql: string, values: any) {
  const res = await query(sql, values);
  if (res.ok) {
    const resulSet = res.body.data as ResultSetHeader;
    return DatabaseResponse.ok(resulSet.affectedRows != 0);
  } else {
    return res;
  }
}