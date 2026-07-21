import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Enter credentials ❗");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Invalid credentials ❌");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      alert("Login success ✅");

      if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input placeholder="Email"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}
        style={{ width: "100%", padding: "10px", background: "blue", color: "white" }}>
        Login
      </button>
    </div>
  );
}