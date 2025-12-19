import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/seller-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // 🔑 session cookie
                body: JSON.stringify({
                    email, // backend expects email
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // login successful
            console.log("Logged in:", data);
            navigate("/");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-full">
                <button className="text-white hover:bg-white/10 mb-4 cursor-pointer rounded-md px-5 py-1 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </button>
            </div>

            <div className="bg-white text-gray-800 flex flex-col gap-6 rounded-xl border p-6 w-100 ">
                <div className="text-center mb-2">
                    <Store className="h-12 w-12 text-white bg-[#e53948] rounded-full p-3 mx-auto" />
                </div>

                <h1 className="text-[#1d3557] text-center text-xl">Welcome to MarketHub</h1>
                <p className="text-[#457b9d] text-center -mt-3">
                    Sign in to start buying or selling
                </p>

                <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col">
                        <label className="text-[#1d3557] mb-1 text-left text-sm">Email:</label>
                        <input
                            type="email"
                            placeholder="seller@example.com"
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#1d3557] mb-1 text-left text-sm">Password:</label>
                        <input
                            type="password"
                            placeholder="************"
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-left">{error}</p>
                    )}

                    <button className="text-[#e53948] hover:text-[#ec606c] text-sm text-left cursor-pointer">
                        Forgot password?
                    </button>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-[#e53948] hover:bg-[#ec606c] text-white py-2 rounded-md font-medium cursor-pointer"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="text-center text-sm">
                        Don’t have a buyer account?{" "}
                        <a 
                        href = "" //link to buyer registration page
                        className="text-[#e53948] hover:text-[#ec606c] cursor-pointer">
                            Sign up as buyer
                        </a>
                    </p>

                    <p className="text-center text-sm">
                        Don’t have a seller account?{" "}
                        <Link
                        to="/register"
                        className="text-[#e53948] hover:text-[#ec606c] cursor-pointer">
                            Sign up as seller
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
