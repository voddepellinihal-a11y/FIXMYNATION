import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow">

      <h1 className="text-xl font-bold text-navyBlue">
        🇮🇳 FixMyNation
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-saffron">Home</Link>
        <Link to="/dashboard" className="hover:text-indiaGreen">Dashboard</Link>
        <Link to="/login" className="hover:text-navyBlue">Login</Link>

        <Link to="/register">
          <button className="bg-saffron text-white px-4 py-2 rounded-lg hover:scale-105">
            Register
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Navbar;