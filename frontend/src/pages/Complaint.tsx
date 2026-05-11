import { useState, useEffect } from "react";

export default function Complaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login first ❌");
      window.location.href = "/login";
    }
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude.toString());
      setLng(position.coords.longitude.toString());
    });
  };

  const submitComplaint = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("http://127.0.0.1:8000/complaint", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    alert(data.message || "Complaint Submitted ✅");

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 via-white to-green-400 flex justify-center items-start pt-10">

      <div className="bg-white shadow-xl rounded-xl p-10 w-[650px]">

        {/* ROLE */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900">
            📢 File Complaint
          </h1>

          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
            Logged in as: {role}
          </div>
        </div>

        <input
          type="text"
          placeholder="Complaint Title"
          className="w-full border p-4 rounded-lg mb-5 text-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Complaint Description"
          className="w-full border p-4 rounded-lg mb-5 text-lg h-36"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* LOCATION */}
        <button
          onClick={getLocation}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg mb-4"
        >
          📍 Get Location
        </button>

        {lat && (
          <div className="mb-5 text-lg">
            📍 {lat}, {lng}
          </div>
        )}

        {/* FILE */}
        <div className="mb-6">
          <label className="font-semibold text-lg">
            Upload Issue Image:
          </label>

          <input
            type="file"
            className="w-full mt-2 border p-3 rounded-lg"
            onChange={(e) =>
              e.target.files && setFile(e.target.files[0])
            }
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={submitComplaint}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg text-xl font-semibold"
        >
          🚀 Submit Complaint
        </button>

      </div>

    </div>
  );
}