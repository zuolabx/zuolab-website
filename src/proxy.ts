import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-this-secret-in-production"
);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth?reason=unauthenticated", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth?reason=forbidden", req.url));
    }

    return NextResponse.next();
  } catch {
    // Token expired or tampered
    return NextResponse.redirect(new URL("/auth?reason=session_expired", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
