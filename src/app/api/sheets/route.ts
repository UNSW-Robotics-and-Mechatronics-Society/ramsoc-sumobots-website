import { google } from "googleapis";
import { NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

const authenticate = () =>
  new google.auth.JWT(
    CLIENT_EMAIL,
    undefined,
    PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "";

    const auth = authenticate();

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: range,
    });

    return NextResponse.json({ data: response.data.values });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { range, values } = await req.json()

    if (!range || !values || !Array.isArray(values)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const auth = authenticate();
    const sheets = google.sheets({ version: "v4", auth });

    // Append new data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    return NextResponse.json({ message: "Data added", response: response.data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function PATCH(req: Request) {
  try {
    const { range, value, mode } = await req.json(); // Extract range, value, and mode (overwrite or append)

    if (!range || !value || !["overwrite", "append"].includes(mode)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const auth = authenticate();
    const sheets = google.sheets({ version: "v4", auth });

    if (mode === "overwrite") {
      // Overwrite existing cell
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [[value]] },
      });

      return NextResponse.json({ message: "Cell updated successfully (overwritten)" });
    } else {
      // Append value to the cell by reading the current value and updating it
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range,
      });

      const currentValue = existingData.data.values?.[0]?.[0] || "";
      const updatedValue = currentValue ? `${currentValue}, ${value}` : value;

      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [[updatedValue]] },
      });

      return NextResponse.json({ message: "Cell updated successfully (appended value)" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}