'use client'
import { useState } from "react"

export default function Signup(){

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

const handleSubmit = async () => {

        const body = {
            name,
            email,
            password,
        }

        try {
            const response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                body: JSON.stringify(body)
            })

            const data = await response.json();

            if(!response.ok){
                alert('something went wrong')
                return;
            }

            alert("User Signup  successfully")

        } catch (error) {
            alert('something went wrong')
            return;
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center" >

            <div className="w-[40%] border p-20 min-w-3xl " >
                <div className="w-full p-10 text-center mb-10 text-4xl font-semibold " >Login Here</div>

                <div className="flex flex-col  gap-4" >
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 text-xl py-3 rounded-2xl"  />
                    <input type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}  className="w-full border px-2 text-xl py-3 rounded-2xl"  />
                    <input type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full border px-2 text-xl py-3 rounded-2xl"  />
                    <button className="w-full border px-2 text-xl py-3  bg-blue-800 rounded-2xl" onClick={handleSubmit} >Submit</button>
                </div>
            </div>

        </div>
    )
}