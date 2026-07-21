import { useNavigate } from "react-router-dom";

import img1 from "../assets/1.png";
import img2 from "../assets/11.png";
import img3 from "../assets/111.png";
import img4 from "../assets/1111.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <div className="text-center py-16 px-4">

        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          Fix Your City
        </h1>

        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Report civic issues like potholes, garbage and water leaks easily.
          Help improve India with smart AI-powered complaint system 🚀
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate("/complaint")}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            🚀 File Complaint
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            📊 Dashboard
          </button>

        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 pb-10">

        {/* CARD 1 */}
        <div
          onClick={() => navigate("/grievance")}
          className="cursor-pointer bg-white p-4 rounded-xl shadow hover:scale-105 transition"
        >
          <img src={img1} className="rounded mb-3" />
          <h3 className="font-bold text-lg">Public Grievance System</h3>
          <p className="text-sm mt-2">
            Track and manage complaints efficiently across departments.
          </p>
        </div>

        {/* CARD 2 */}
        <div
          onClick={() => navigate("/services")}
          className="cursor-pointer bg-white p-4 rounded-xl shadow hover:scale-105 transition"
        >
          <img src={img2} className="rounded mb-3" />
          <h3 className="font-bold text-lg">Digital Citizen Services</h3>
          <p className="text-sm mt-2">
            Access government services like DigiLocker easily.
          </p>
        </div>

        {/* CARD 3 */}
        <div
          onClick={() => navigate("/ai-routing")}
          className="cursor-pointer bg-white p-4 rounded-xl shadow hover:scale-105 transition"
        >
          <img src={img3} className="rounded mb-3" />
          <h3 className="font-bold text-lg">AI Complaint Routing</h3>
          <p className="text-sm mt-2">
            AI automatically sends complaints to correct departments.
          </p>
        </div>

        {/* CARD 4 */}
        <div
          onClick={() => navigate("/feedback")}
          className="cursor-pointer bg-white p-4 rounded-xl shadow hover:scale-105 transition"
        >
          <img src={img4} className="rounded mb-3" />
          <h3 className="font-bold text-lg">Citizen Feedback</h3>
          <p className="text-sm mt-2">
            Improve services through feedback and ratings.
          </p>
        </div>

      </div>

    </div>
  );
}