"use client";

import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const logout = async () => {
        try {
            const res = await fetch("/api/logout", { method: "POST" });

            if (res.ok) {
                router.push("/login");
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="w-full h-20 border-b border-black bg-amber-50 flex justify-between px-20 items-center">
            <div className="font-bold">TITLE</div>

            <div className="flex gap-10 items-center">
                <input 
                    type="text" 
                    className="w-64 h-10 px-2 border bg-white" 
                    placeholder="Search here..." 
                />

                <button 
                    onClick={logout}
                    className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
