import { NextResponse } from "next/server";
import axios from "axios";
import { verifyCaptchaToken } from "@/app/sumobots/2025/(form)/utils/recaptcha";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { range, values, recaptchaToken } = await req.json();

    if (!range || !values || !Array.isArray(values) || !recaptchaToken) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Verify the ReCaptcha token
    const captchaData = await verifyCaptchaToken(recaptchaToken);
    if (!captchaData) {
      return NextResponse.json({ error: "Failed to verify ReCaptcha token" }, { status: 400 });
    }
    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: `ReCaptcha verification failed: ${!captchaData.success ? captchaData["error-codes"] : undefined}` }, { status: 400 });
    }

    // Append new data to the sheet
    const response = await axios.post(
      `https://${process.env.GOOGLE_SHEETS_API_URL}/api/append`,
      {
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: "eoi",
        values: values
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_SHEETS_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return NextResponse.json({ message: "Data added", response: response.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}