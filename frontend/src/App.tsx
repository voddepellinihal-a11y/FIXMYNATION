import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";
import Grievance from "./pages/Grievance";
import Services from "./pages/Services";
import AIRouting from "./pages/AIrouting";
import Feedback from "./pages/Feedback";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      <div className="flex justify-between items-center px-8 py-4">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-blue-900">
          FixMyNation 
        </h1>

        {/* NAV LINKS */}
        <div className="flex gap-6 items-center">

          <Link to="/" className="hover:text-orange-500">Home</Link>

          {role && (
            <Link to="/dashboard" className="hover:text-green-600">
              Dashboard
            </Link>
          )}

          {/* ADMIN LINK */}
          {role === "admin" && (
            <Link to="/admin" className="hover:text-red-500">
              Admin
            </Link>
          )}

          {/* SHOW LOGIN IF NOT LOGGED */}
          {!role && (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Register
                </button>
              </Link>
            </>
          )}

          {/* SHOW USER INFO + LOGOUT */}
          {role && (
            <>
              <span className="text-sm text-gray-600">
                👤 {role}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded"
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

        {/* SPACE BELOW NAVBAR */}
        <div className="pt-20">

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="/grievance" element={<Grievance />} />
            <Route path="/services" element={<Services />} />

            {/* FIXED ROUTE NAME */}
            <Route path="/ai-routing" element={<AIRouting />} />

            <Route path="/feedback" element={<Feedback />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}