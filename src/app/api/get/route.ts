import { NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async () => {
  return NextResponse.json({ message: "Welcome to Projects.RAMSOC!" });
};
