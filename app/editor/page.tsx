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

            console.log("data : ", data)

            setDescription(data.response.content)

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

            console.log("data : ", data)
            setDescription(data.response.content)

            console.log("summarized")

        } catch (error) {
            alert('something went wrong')
            return;
        }
    }


    return (
        <div className="w-screen h-screen" >
            <Header/>

            <div className="mx-auto mt-12 w-full max-w-2xl rounded-xl border  p-8 shadow-sm">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 p-4 mb-8" placeholder="title" />
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-64 w-full rounded-lg border border-gray-300 p-4"
                    placeholder="Enter text here..."
                />

                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button 
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white " 
                    onClick={aiSummary}
                    >
                    AI Summarize
                    </button>
                    <button 
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white " 
                    onClick={aiFormat}
                    >
                    AI Format
                    </button>
                    <button 
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white " 
                    onClick={handleSubmit}
                    >
                    Save
                    </button>
                </div>
                </div>

        </div>
    )
}