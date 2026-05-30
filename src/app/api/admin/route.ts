import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import dbConnect from "@/db/dbconnect";
import { User, RoleValues } from "@/schemas/user.schema";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-this-secret-in-production"
);


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required.");
    }

    // Find user  select("+password")
    const user = await (User as any)
      .findOne({ email: email.trim().toLowerCase() })
      .select("+password");

    if (!user) {
      
      throw new ApiError(401, "Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ApiError(401, "Invalid email or password.");
    }

    if (user.role !== RoleValues.ADMIN) {
      throw new ApiError(
        403,
        "Access denied. You need to be an admin to access the dashboard."
      );
    }

    // JWT valid for 8 hours
    const token = await new SignJWT({
      sub: String(user._id),
      email: user.email,
      role: user.role,
      name: user.Name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    const response = NextResponse.json(
      {
        statuscode: 200,
        data: { name: user.Name, email: user.email, role: user.role },
        message: "Login successful.",
      },
      { status: 200 }
    );

    // HttpOnly cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(error.statusCode, null, error.message);
    }
    console.error("[POST /api/admin] Unexpected error:", error);
    return ApiResponse(500, null, "An unexpected error occurred.");
  }
}

// DELETE /api/admin  →  logout
export async function DELETE() {
  const response = NextResponse.json(
    { statuscode: 200, data: null, message: "Logged out." },
    { status: 200 }
  );
  response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return response;
}
