import type { NextFetchEvent, NextRequest } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";

export const config = {
  runtime: "edge",
};

async function createFlight(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const flight_id = searchParams.get("flight_id");
  const plane_id = searchParams.get("plane_id");
  const start_location = searchParams.get("start_location");
  const end_location = searchParams.get("end_location");
  const start_time = searchParams.get("start_time");
  const duration = searchParams.get("duration");
  const seat_left = searchParams.get("seat_left");

  if (
    !flight_id ||
    !plane_id ||
    !start_location ||
    !end_location ||
    !start_time ||
    !seat_left ||
    !duration
  ) {
    return new Response("page not found", {
      status: 404,
    });
  }

  const createFlightQuery = sqlstring.format(
    `INSERT INTO flight (flight_id, plane_id, start_location, end_location, start_time,seat_left, duration) VALUES
      (?, ?, ?, ?, ?, ?, ?);`,
    [
      flight_id,
      plane_id,
      start_location,
      end_location,
      start_time,
      seat_left,
      duration,
    ]
  );

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(createFlightQuery);

    return new Response(JSON.stringify({ msg: "ok" }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Page not found", {
      status: 404,
    });
  } finally {
    event.waitUntil(pool.end());
  }
}

async function searchFlight(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const start_location = searchParams.get("start_location");
  const end_location = searchParams.get("end_location");

  if (!start_location || !end_location) {
    return new Response("page not found", {
      status: 404,
    });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const getFlightQuery = sqlstring.format(
    `SELECT * FROM flight_plane WHERE start_location=? and end_location=?;`,
    [start_location, end_location]
  );

  try {
    const { rows } = await pool.query(getFlightQuery);

    return new Response(JSON.stringify({ flight: rows }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("page not found", {
      status: 404,
    });
  } finally {
    event.waitUntil(pool.end());
  }
}

export default async function handler(req: NextRequest, event: NextFetchEvent) {
  if (req.method === "POST") {
    return createFlight(req, event);
  }

  if (req.method === "GET") {
    return searchFlight(req, event);
  }
  return new Response("Invalid method", {
    status: 405,
  });
}
