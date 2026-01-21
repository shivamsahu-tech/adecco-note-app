'use client'
import Header from "@/components/Header";
import { useState } from "react";

export default function Editor(){

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");


    const handleSubmit = async () => {
        const body = {
           title,
           description
        }

        try {
            const response = await fetch("http://localhost:3000/api/save-note", {
                method: "POST",
                body: JSON.stringify(body)
            })

            const data = await response.json();

            if(!response.ok){
                alert('something went wrong')
                return;
            }

            alert("Note Saved")

        } catch (error) {
            alert('something went wrong')
            return;
        }
    }


    const aiSummary = async () => {

        const body = {
            title,
            description,
        }

        try {
            const response = await fetch("http://localhost:3000/api/ai-summary", {
                method: "POST",
                body: JSON.stringify(body)
            })

            const data = await response.json();

            if(!response.ok){
                alert('something went wrong')
                return;
            }

            setDescription(data.response)

            console.log("summarized")

        } catch (error) {
            alert('something went wrong')
            return;
        }
    }


    const aiFormat = async () => {
        const body = {
            title,
            description,
        }
        try {
            const response = await fetch("http://localhost:3000/api/ai-format", {
                method: "POST",
                body: JSON.stringify(body)
            })

            const data = await response.json();

            if(!response.ok){
                alert('something went wrong')
                return;
            }

            setDescription(data.response)

            console.log("summarized")

        } catch (error) {
            alert('something went wrong')
            return;
        }
    }


    return (
        <div className="w-screen h-screen" >
            <Header/>

            <div className="mx-auto border w-[40%] mt-50  p-10" >
                <input type="textarea" className="h-125 w-full  border-black" />

                <div className="flex justify-between items-center gap-8 p-5" >
                    <button className="px-2 py-1 rounded-md bg-blue-700 w-full text-white  hover:cursor-pointer" onClick={aiSummary} >AI Summarize</button>
                    <button className="px-2 py-1 rounded-md bg-blue-700 w-full text-white hover:cursor-pointer" onClick={aiFormat}  >AI Fromating </button>

                    <button className="px-2 py-1 rounded-md bg-blue-700 w-full text-white hover:cursor-pointer" onClick={handleSubmit}  >Save</button>
                </div>
            </div>
        </div>
    )
}