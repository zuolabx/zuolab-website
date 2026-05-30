import { NextRequest } from "next/server";
import dbConnect from "@/db/dbconnect";
import { BlogModel } from "@/schemas/blog.schema";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

//  /api/blog/fetch/all?page=1&limit=10
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10))
    );
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      BlogModel.find({ deletedBy: { $exists: false } })
        .select("title slug author coverImg createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogModel.countDocuments({ deletedBy: { $exists: false } }),
    ]);

    return ApiResponse(
      200,
      {
        blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Blogs fetched successfully."
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(error.statusCode, null, error.message);
    }

    console.error("[GET /api/blog/fetch/all] Unexpected error:", error);
    return ApiResponse(500, null, "An unexpected error occurred while fetching blogs.");
  }
}
