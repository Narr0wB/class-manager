import { getCalendarioAPIToken } from "@/lib/backend/auth";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"; 
import { readTmpVar, writeTmpVar } from "@/lib/backend/tmp";
import { deleteCalendarRelationship, deletePrenotazione, getPrenotazioniCalendar, insertPrenotazioniCalendar } from "@/lib/backend/database";
import { minutesToString } from "@/lib/utils";

let sync_token: string;
const aule_matching_pattern = /\(aul.(?:\s+\d+)+\)/;

export async function POST(req: NextRequest) {
  const api_token = await getCalendarioAPIToken();
  const auth = new google.auth.OAuth2();

  auth.setCredentials({
      access_token: api_token
  })

  sync_token = readTmpVar("tmp/sync_tkn.tmp.var");

  const calendar = google.calendar({version: "v3", auth: auth});

  if (req.headers.get("x-goog-resource-state") == "sync") {
    console.log("sync!!");
    let response = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 9999
    })

    writeTmpVar("tmp/sync_tkn.tmp.var", response.data.nextSyncToken!);

    return NextResponse.json({status: "success"});
  }
  
  let response = await calendar.events.list({
    calendarId: 'primary',
    maxResults: 9999,
    singleEvents: true,
    syncToken: sync_token
  });
  writeTmpVar("tmp/sync_tkn.tmp.var", response.data.nextSyncToken!);
  
  response.data.items?.forEach(async (event) => {
    console.log(event.id);

    const event_details = await calendar.events.get({
      eventId: event.id!,
      calendarId: "primary"
    });
    console.log(event_details.data);

    const event_title = event_details.data.summary;
    const event_start = event_details.data.start;
    const event_end   = event_details.data.end;
    const event_id    = event_details.data.id!;

    if (event_details.data.status == "confirmed" && event_title && event_start && event_end) {
      const match = event_details.data.summary!.match(aule_matching_pattern);
      if (!match) return;
      
      const aule = match ? match[0].match(/\d+/g) : [];
      
      const event_start_ms = new Date(event_start.dateTime!).getTime() + Math.abs(new Date().getTimezoneOffset() * 60000);
      const event_end_ms   = new Date(event_end.dateTime!).getTime() + Math.abs(new Date().getTimezoneOffset() * 60000);
      const event_date     = new Date(event_start_ms - event_start_ms % (1000 * 60 * 60 * 24));
      
      // Check if the event start and end are on the same day
      if (Math.floor(event_start_ms / (1000 * 60 * 60 * 24)) != Math.floor(event_end_ms / (1000 * 60 * 60 * 24))) return;

      const start_minutes = Math.floor((event_start_ms % (1000 * 60 * 60 * 24)) / (1000 * 60));
      const end_minutes   = Math.floor((event_end_ms % (1000 * 60 * 60 * 24)) / (1000 * 60));

      // console.log(aule, event_date, minutesToString(start_minutes), minutesToString(end_minutes));
      const prenotazioni = await getPrenotazioniCalendar(event_id);

      if (prenotazioni) {
        await deleteCalendarRelationship(event_id);

        for (let i = 0; i < prenotazioni.length; ++i) {
          await deletePrenotazione(prenotazioni[i].id!);
        }
      }

      insertPrenotazioniCalendar(event_id, aule as Number[], event_date, minutesToString(start_minutes), minutesToString(end_minutes));
    }
    else if (event_details.data.status == "cancelled") {
      const event_id = event_details.data.id!;

      const prenotazioni = await getPrenotazioniCalendar(event_id);
      if (!prenotazioni) return;

      await deleteCalendarRelationship(event_id);

      prenotazioni.forEach(async (prenotazione) => {
        await deletePrenotazione(prenotazione.id!);
      });
    }
    
  });

  

  return NextResponse.json({status: "success"});
}
