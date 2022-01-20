import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { name } = req.page;

  if (name == "/") {
    return NextResponse.redirect("/swap");
  }

  // TODO: remove when xAstro is ready
  if (name == "/staking") {
    return NextResponse.redirect("/swap");
  }

  return NextResponse.next();
}
