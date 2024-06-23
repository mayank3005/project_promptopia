import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const GET = async (request, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return NextResponse.json(prompts, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch all prompts" },
      { status: 201 }
    );
  }
};
