import { NextResponse } from "next/server";
import contactSchema from "@/schemas/contact.schema";
import dbConnect from "@/db/dbconnect";
//@ts-ignore
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    const { name, email, phone, organisation, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required" },
        { status: 400 },
      );
    }

    const newSubmission = await contactSchema.create({
      name,
      email,
      phone,
      organisation,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          phone: newSubmission.phone,
          organisation: newSubmission.organisation,
          message: newSubmission.message,
        },
        message: "Contact query created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Couldn't create contact query",
      },
      { status: 500 },
    );
  }
}
