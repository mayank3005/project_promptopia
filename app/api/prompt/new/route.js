import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to create new prompt" },
      { status: 500 }
    );
  }
};
