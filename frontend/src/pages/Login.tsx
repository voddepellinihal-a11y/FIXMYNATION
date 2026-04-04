import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/login?email=${email}&password=${password}`,
      { method: "POST" }
    );

    const data = await res.json();
    localStorage.setItem("token", data.access_token);

    alert("✅ Login successful");
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-navyBlue">Login</h2>

      <input placeholder="Email" className="w-full p-3 border mb-3"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password"
        className="w-full p-3 border mb-3"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}
        className="bg-navyBlue text-white w-full py-3 rounded">
        Login
      </button>
    </div>
  );
}

export default Login;