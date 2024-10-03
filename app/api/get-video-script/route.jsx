import { chatSession } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log(prompt);
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());

        return NextResponse.json({ 'result': JSON.parse(result.response.text()) });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ "Error : ": error });
    }
}