import type { NextFetchEvent, NextRequest } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const ticket_id = searchParams.get("ticket_id");

  if (!ticket_id) {
    return new Response("page not found", {
      status: 404,
    });
  }

  const searchBill = sqlstring.format(
    `SELECT * FROM bill WHERE ticket_id = ? ;`,
    [ticket_id]
  );

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { rows } = await pool.query(searchBill);

    return new Response(JSON.stringify({ bill: rows[0] }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Page not found", {
      status: 404,
    });
  } finally {
    event.waitUntil(pool.end());
  }
}
