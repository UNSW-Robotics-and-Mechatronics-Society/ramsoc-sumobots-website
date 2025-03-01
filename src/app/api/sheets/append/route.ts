import { NextResponse } from "next/server";
import { verifyCaptchaToken } from "@/app/_utils/recaptcha";
import { Resource } from "sst";

const googleSheetsApiUrl = Resource.GOOGLE_SHEETS_API_URL.value;
const googleSheetsApiToken = Resource.GOOGLE_SHEETS_API_TOKEN.value;
const googleSheetsSpreadsheetId = Resource.GOOGLE_SHEETS_SPREADSHEET_ID.value;

export async function POST(req: Request) {
  try {
    const { range, values, recaptchaToken } = await req.json();

    if (!range || !values || !Array.isArray(values) || !recaptchaToken) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Verify the ReCaptcha token
    const captchaData = await verifyCaptchaToken(recaptchaToken);
    if (!captchaData) {
      return NextResponse.json(
        { error: "Failed to verify ReCaptcha token" },
        { status: 400 },
      );
    }
    if (
      !captchaData.tokenProperties.valid ||
      captchaData.riskAnalysis.score < 0.5
    ) {
      return NextResponse.json(
        {
          error: `ReCaptcha verification failed: ${!captchaData.riskAnalysis.reasons}`,
        },
        { status: 400 },
      );
    }

    // Append new data to the sheet using fetch
    const response = await fetch(`https://${googleSheetsApiUrl}/api/append`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${googleSheetsApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spreadsheetId: googleSheetsSpreadsheetId,
        range: "eoi",
        values: values,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 401 },
        );
      }
      throw new Error(`Failed to append data: ${response.statusText}`);
    }

    const responseData = await response.json();

    return NextResponse.json({
      message: "Data added",
      response: responseData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
