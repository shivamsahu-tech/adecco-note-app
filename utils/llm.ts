import { HfInference } from "@huggingface/inference";


const HF_TOKEN = process.env.HF_TOKEN;

const  hf = new HfInference(HF_TOKEN);

 export async function getChatResponse(message : string){
    try {
        const response = await hf.chatCompletion({
            model: 'Qwen/Qwen2.5-72B-Instruct',
            messages: [ 
                { role: "user", content: message } 
            ],
            temperature: 0.5
        })

        return response.choices[0].message;
    } catch (error) {
        console.error("Error : ", error)
    }
}

// console.log(await getChatResponse("Write a function in next js typescript, where we pass a user query and it will provide the response by calling llama model from the hugging face and also tell me what i have to install"));