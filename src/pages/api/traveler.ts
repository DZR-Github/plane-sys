import type { NextFetchEvent, NextRequest } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const traveler_id = searchParams.get("traveler_id");
  const name = searchParams.get("name");
  const sex = searchParams.get("sex");
  const id_value = searchParams.get("id_value");
  const phone = searchParams.get("phone");

  if (!traveler_id || !name || !sex || !id_value || !phone) {
    console.log(1);
    return new Response("page not found", {
      status: 404,
    });
  }

  const createTravelerQuery = sqlstring.format(
    `INSERT INTO traveler (traveler_id, name, sex, id_value, phone) VALUES
          (?, ?, ?, ?, ?);`,
    [traveler_id, name, sex, id_value, phone]
  );

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(createTravelerQuery);

    return new Response(JSON.stringify({ msg: "ok" }), { status: 200 });
  } catch (e) {
    console.log(2);
    console.error(e);
    return new Response("Page not found", {
      status: 404,
    });
  } finally {
    event.waitUntil(pool.end());
  }
}
