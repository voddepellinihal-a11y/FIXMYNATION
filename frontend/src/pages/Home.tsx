import { Link } from "react-router-dom";
import img1 from "../assets/1.png";
import img2 from "../assets/11.png";
import img3 from "../assets/111.png";
import img4 from "../assets/1111.png";

export default function Home() {
  return (
    <div className="text-center px-6">

      {/* 🧠 TITLE + DESCRIPTION */}
      <div className="mt-10">

        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          Fix Your City 
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-6">
          Report civic issues like potholes, garbage and water leaks easily.
          Help improve India with smart AI-powered complaint system 🚀
        </p>

        {/* 🔥 BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          <Link to="/complaint">
            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:scale-105 transition">
              🚀 File Complaint
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="border px-6 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition">
              📊 Dashboard
            </button>
          </Link>
        </div>

      </div>

      {/* 📦 CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

        <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
          <img src={img1} className="h-48 w-full object-cover rounded-lg mb-3" />
          <h3 className="font-bold">Public Grievance System</h3>
          <p className="text-sm text-gray-600">
            Track and manage complaints efficiently across departments.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
          <img src={img2} className="h-48 w-full object-cover rounded-lg mb-3" />
          <h3 className="font-bold">Digital Citizen Services</h3>
          <p className="text-sm text-gray-600">
            Access government services like DigiLocker easily.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
          <img src={img3} className="h-48 w-full object-cover rounded-lg mb-3" />
          <h3 className="font-bold">AI Complaint Routing</h3>
          <p className="text-sm text-gray-600">
            AI automatically sends complaints to correct departments.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">
          <img src={img4} className="h-48 w-full object-cover rounded-lg mb-3" />
          <h3 className="font-bold">Citizen Feedback</h3>
          <p className="text-sm text-gray-600">
            Improve services through feedback and ratings.
          </p>
        </div>

      </div>

    </div>
  );
}