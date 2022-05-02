import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.page.name == "/") {
    return NextResponse.redirect(new URL("/swap", request.url));
  }

  return NextResponse.next();
}
