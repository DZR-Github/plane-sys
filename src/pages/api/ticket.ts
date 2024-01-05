import type { NextFetchEvent, NextRequest } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";

export const config = {
  runtime: "edge",
};

async function createTicket(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const flight_id = searchParams.get("flight_id");
  const ticket_id = searchParams.get("ticket_id");
  const traveler_id = searchParams.get("traveler_id");
  const seating_list = searchParams.get("seating_list");
  const cabin_rating = searchParams.get("cabin_rating");
  const time = searchParams.get("time");
  const status = searchParams.get("status");

  if (
    !flight_id ||
    !ticket_id ||
    !traveler_id ||
    !seating_list ||
    !cabin_rating ||
    !time ||
    !status
  ) {
    console.log(1);
    return new Response("page not found", {
      status: 404,
    });
  }

  const createTicketQuery = sqlstring.format(
    `INSERT INTO ticket (ticket_id, flight_id, traveler_id, seating_list, cabin_rating, time, status) VALUES
    ( ?, ?, ?, ?, ?, ?, ?);`,
    [
      ticket_id,
      flight_id,
      traveler_id,
      seating_list,
      cabin_rating,
      time,
      status,
    ]
  );

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(createTicketQuery);

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

async function deleteTicket(req: NextRequest, event: NextFetchEvent) {
  const { searchParams } = new URL(req.url);

  const ticket_id = searchParams.get("ticket_id");

  if (!ticket_id) {
    return new Response("page not found", {
      status: 404,
    });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const deleteTicketQuery = sqlstring.format(
    `DELETE FROM ticket WHERE ticket_id = ?;`,
    [ticket_id]
  );

  try {
    await pool.query(deleteTicketQuery);

    return new Response(JSON.stringify({ msg: "ok" }), { status: 200 });
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
    return createTicket(req, event);
  }

  if (req.method === "DELETE") {
    return deleteTicket(req, event);
  }
  return new Response("Invalid method", {
    status: 405,
  });
}
