import { getChatResponse } from "@/utils/llm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {title, text} = await req.json();

        const response = await getChatResponse(
            `Hey this is the user note, that have title and the text, and now you have to summarize the user text and reduce it by 30%  
            
            Title: ${title}

            Text: ${text}
            
            `
        )

        return  NextResponse.json({response}, {status: 200})
    } catch (error) {
        throw NextResponse.json({status: 500});
    }
}