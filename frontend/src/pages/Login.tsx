import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 bg-gradient-to-r from-orange-300 via-white to-green-400">

      <div className="bg-white shadow-xl rounded-xl p-12 w-[550px]">

        <h1 className="text-5xl font-bold text-center mb-10 text-blue-900">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-lg mb-6 text-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-lg mb-8 text-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg text-xl"
        >
          Login
        </button>

      </div>

    </div>
  );
}