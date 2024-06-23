import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return NextResponse.json("Prompt not found", { status: 404 });

    return NextResponse.json(prompt, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get the prompt" },
      { status: 404 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    console.log(existingPrompt);
    if (!existingPrompt)
      return NextResponse.json("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return NextResponse.json(existingPrompt, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update prompt" },
      { status: 404 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return NextResponse.json("Prompt deleted successfullt", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 404 }
    );
  }
};
