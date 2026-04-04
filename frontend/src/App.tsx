import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      <div className="flex justify-between items-center px-8 py-4">

        <h1 className="text-xl font-bold text-blue-900">
          FixMyNation
        </h1>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/dashboard" className="hover:text-green-600">Dashboard</Link>
          <Link to="/login">Login</Link>

          <Link to="/register">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Register
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default function App(){
  return(
    <BrowserRouter>

      {/* REMOVE EXTRA SPACE HERE */}
      <div className="min-h-screen bg-gradient-to-r from-orange-400 via-white to-green-500">

        <Navbar/>

        {/* ADD SPACING BELOW NAVBAR */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/complaint" element={<Complaint/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </div>

      </div>

    </BrowserRouter>
  );
}