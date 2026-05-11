import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      <div className="flex justify-between items-center px-8 py-4">

        <h1 className="text-3xl font-bold text-blue-900">
          FixMyNation
        </h1>

        <div className="flex gap-8 items-center text-xl">

          <Link to="/">Home</Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          {role && (
            <Link to="/complaint">
              File Complaint
            </Link>
          )}

          {role === "admin" && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          {!role ? (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">
                <button className="bg-orange-500 text-white px-5 py-2 rounded-lg">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="bg-blue-100 px-4 py-2 rounded-full text-blue-800">
                👤 {role}
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gradient-to-r from-orange-400 via-white to-green-500">

        <Navbar />

        <div className="pt-28">

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/complaint" element={<Complaint />} />

            <Route path="/admin" element={<Admin />} />
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}