import { getChatResponse } from "@/utils/llm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {title, description} = await req.json();

        const response = await getChatResponse(
            `Hey this is the user note, that have title and the text, and now you have to only return formatted description it like resolve any grammatical error, and write a polite message 
            
            NOTE: always return only descrption only in string form, nothing else, just updated description.
            
            Title: ${title}

            Text: ${description}
            
            `
        )

        return  NextResponse.json({response}, {status: 200})
    } catch (error) {
        throw NextResponse.json({status: 500});
    }
}