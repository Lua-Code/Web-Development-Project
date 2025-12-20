import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registered:", data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full">
        <Link
          to="/login"
          className="text-white hover:bg-white/10 mb-4 cursor-pointer rounded-md px-5 py-1 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>

      <div className="bg-white text-gray-800 flex flex-col gap-6 rounded-xl border p-6 w-100">
        <div className="text-center mb-2">
          <Store className="h-12 w-12 text-white bg-[#e53948] rounded-full p-3 mx-auto" />
        </div>

        <h1 className="text-[#1d3557] text-center text-xl">
          Create your MarketHub account
        </h1>
        <p className="text-[#457b9d] text-center -mt-3">
          Join to start buying or selling
        </p>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-[#1d3557] mb-1 text-left text-sm">
              Username:
            </label>
            <input
              type="text"
              placeholder="john_doe"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#1d3557] mb-1 text-left text-sm">
              Email:
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#1d3557] mb-1 text-left text-sm">
              Password:
            </label>
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

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-[#e53948] hover:bg-[#ec606c] text-white py-2 rounded-md font-medium cursor-pointer"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#e53948] hover:text-[#ec606c] cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
