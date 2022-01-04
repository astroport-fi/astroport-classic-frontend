import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { name } = req.page;

  if (
    name == "/pools/[pair]/stake" ||
    name == "/staking" ||
    name == "/" ||
    name == "/staking/[action]"
  ) {
    return NextResponse.redirect("/swap");
  }

  return NextResponse.next();
}
