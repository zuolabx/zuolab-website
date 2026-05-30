import { NextRequest } from "next/server";
import dbConnect from "@/db/dbconnect";
import { BlogModel } from "@/schemas/blog.schema";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

// DELETE /api/blog/delete
// Body: { slug, deletedBy? (userId) }
export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { slug, deletedBy } = body;

    if (!slug) {
      throw new ApiError(400, "slug is required to identify the blog to delete.");
    }

    // to check the blog exists and isn't already deleted
    const blog = await BlogModel.findOne({ slug });

    if (!blog) {
      throw new ApiError(404, `Blog with slug "${slug}" not found.`);
    }

    if (blog.deletedBy) {
      throw new ApiError(409, "This blog has already been deleted.");
    }

    // Soft delete — stamp deletedBy so it's excluded from fetch queries basicaly
    blog.deletedBy = deletedBy ?? blog.createdBy;
    await blog.save();

    return ApiResponse(
      200,
      { slug: blog.slug, deletedAt: new Date().toISOString() },
      "Blog deleted successfully."
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse(error.statusCode, null, error.message);
    }

    console.error("[DELETE /api/blog/delete] Unexpected error:", error);
    return ApiResponse(500, null, "An unexpected error occurred while deleting the blog.");
  }
}
