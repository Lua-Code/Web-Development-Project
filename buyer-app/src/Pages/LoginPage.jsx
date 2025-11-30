import { useState } from "react";
import { Store, ArrowLeft } from "lucide-react";


const LoginPage = () => {
    return (
        <div>
            <div className="w-full max-w-md">
                <button>
                    <ArrowLeft className="h-4 w-4 mr-2 color-white" /> Back to Home
                </button>
            </div>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">

            </div>
        </div>

    )
}

export default LoginPage