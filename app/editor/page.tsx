import Header from "@/components/Header";

export default function Editor(){
    return (
        <div className="w-screen h-screen" >
            <Header/>

            <div className="mx-auto " >
                <input type="textarea" />

                <div className="" >
                    <button>AI Summarize</button>
                    <button>AI Fromating </button>

                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}