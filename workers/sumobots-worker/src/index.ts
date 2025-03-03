import { handleTeamRequest } from "./routes/team";
import { handleSheetsRequest } from "./routes/sheets";

export default {
  async fetch(req: Request, env: any): Promise<Response> {
    const url = new URL(req.url);
    const authHeader = req.headers.get("Authorization");
    console.log(authHeader)
    if (!authHeader || authHeader !== `Bearer ${env.SUMOBOTS_API_KEY}`) {
      return new Response("Unauthorized", { status : 401 });
    }

    if (url.pathname === "/api/team/get") {
      	return handleTeamRequest(req, env);
    }

    if (url.pathname === "/api/sheets/append") {
      	return handleSheetsRequest(req, env);
    }

    return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
  },
};