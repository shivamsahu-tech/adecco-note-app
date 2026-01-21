import { cookies } from "next/headers";

export default async function POST(req : Request) {
    try {
        
        const {email, password} = await req.json();
        
        const cookieStore = await cookies();

        const accessToken = await cookieStore.get("accessToken")






    } catch (error) {
        
    }
    
}