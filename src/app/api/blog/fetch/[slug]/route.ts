import { NextRequest } from "next/server";
import dbConnect from "@/db/dbconnect";
import { BlogModel } from "@/schemas/blog.schema";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

//  /api/blog/fetch/:slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  try {
    const { slug } = await params;

    if (!slug) {
      throw new ApiError(400, "slug is required.");
    }

    const blog = await BlogModel.findOne({
      slug,
      deletedBy: { $exists: false },
    }).lean();

    if (!blog) {
      throw new ApiError(404, `Blog with slug "${slug}" not found.`);
    }

    return ApiResponse(200, blog, "Blog fetched successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(error.statusCode, null, error.message);
    }

    console.error("[GET /api/blog/fetch/[slug]] Unexpected error:", error);
    return ApiResponse(500, null, "An unexpected error occurred while fetching the blog.");
  }
}
