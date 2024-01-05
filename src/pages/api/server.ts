import type { NextFetchEvent, NextRequest } from "next/server";
import { Pool } from "@neondatabase/serverless";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, event: NextFetchEvent) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sql = `SELECT * FROM bill WHERE ticket_id = 'TI5' ;`;

  const { rows } = await pool.query(sql);

  const msg = rows;

  event.waitUntil(pool.end());

  return new Response(JSON.stringify({ msg: msg }), {
    status: 200,
  });
}
