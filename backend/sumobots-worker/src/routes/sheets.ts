import { verifyCaptchaToken } from "../utils/recpatcha";

export async function handleSheetsRequest(req: Request, env: any): Promise<Response> {
	if (req.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
	}

	try {
		const { range, values, recaptchaToken } = await req.json() as { range: string, values: string[][], recaptchaToken: string };

		if (!values || !Array.isArray(values)) {
			return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
		}

		// verify recaptcha token
		const captchaData = await verifyCaptchaToken(recaptchaToken, env);
		if (!captchaData) {
			return new Response(JSON.stringify({ error: 'Failed to verify ReCaptcha token' }), { status: 400 });
		}
		if (!captchaData.tokenProperties.valid || captchaData.riskAnalysis.score < 0.5) {
			return new Response(JSON.stringify({ error: `ReCaptcha verification failed: ${!captchaData.riskAnalysis.reasons}` }), { status: 400 });
		}

		// Send data to Google Sheets API
		const response = await fetch(`https://${env.GOOGLE_SHEETS_API_URL}/api/append`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.GOOGLE_SHEETS_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
				range: range,
				values: values,
			}),
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to append data' }), {
				status: response.status,
			});
		}

		return new Response(JSON.stringify({ message: 'Data appended successfully' }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500 });
	}
}
