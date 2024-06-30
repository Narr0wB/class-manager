import { getCalendarioAPIToken, getSecondsUntil } from "@/lib/backend/auth";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Every day at 11 PM the cronjob daemon will send a post request to this api endpoint.
    // This will then generate a new access token and will reopen a notification channel  
    // between the calendar account and the server.

    const json = await req.json();
    const token = json.token as string;

    if (token != process.env.CRONJOB_TOKEN) return NextResponse.error(); 

    const api_token = await getCalendarioAPIToken();
    const auth = new google.auth.OAuth2();

    auth.setCredentials({
        access_token: api_token
    })

    const calendar = google.calendar({version: "v3", auth: auth});
    const r1 = await calendar.channels.stop({
        requestBody: {
            id: "calendar-info",
            resourceId: process.env.CALENDAR_RESOURCE_ID
        }
    });

    const r2 = await calendar.events.watch({
        calendarId: "primary",
        eventTypes: ["default"],
        requestBody: {
            id: "calendar-info",
            token: process.env.CRONJOB_TOKEN,
            type: "webhook",
            address: process.env.ADDRESS_BASE + "/api/calendar",
            params: {
                // One day in seconds
                ttl: "86400" 
            }
        }
    })
    process.env.CALENDAR_RESOURCE_ID = r2.data.resourceId!;

    //console.log(r2)
    return NextResponse.json({status: "success"});
}
