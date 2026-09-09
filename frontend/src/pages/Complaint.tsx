import { useState } from "react";

export default function Complaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [file, setFile] = useState<any>(null);

  // 📍 GET LOCATION
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        alert("Location captured ✅");
      },
      () => alert("Location denied ❌")
    );
  };

  // 🚀 SUBMIT
  const submitComplaint = async () => {
    console.log("SUBMIT CLICKED");

    if (!title || !description) {
      alert("Fill all fields ❗");
      return;
    }

    if (!location) {
      alert("Get location first 📍");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("lat", location.lat.toString());
      formData.append("lng", location.lng.toString());

      // ✅ SAFE FILE UPLOAD
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("http://127.0.0.1:8000/complaint", {
        method: "POST",
        body: formData,
      });

      // 🔥 HANDLE ERROR PROPERLY
      if (!res.ok) {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Server error ❌");
        return;
      }

      const data = await res.json();
      console.log("SUCCESS:", data);

      alert("Complaint Submitted ✅");

      // RESET FORM
      setTitle("");
      setDescription("");
      setLocation(null);
      setFile(null);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Network error ❌");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-6">📢 Complaint</h2>

        {/* TITLE */}
        <input
          value={title}
          className="w-full p-3 border mb-4 rounded"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          className="w-full p-3 border mb-4 rounded"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* LOCATION */}
        <button
          onClick={getLocation}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          📍 Get Location
        </button>

        {location && (
          <p className="text-sm mb-4">
            📍 {location.lat}, {location.lng}
          </p>
        )}

        {/* IMAGE */}
        <input
          type="file"
          className="mb-4"
          onChange={(e: any) => setFile(e.target.files[0])}
        />

        {/* SUBMIT */}
        <button
          onClick={submitComplaint}
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:scale-105 transition"
        >
          🚀 Submit Complaint
        </button>

      </div>
    </div>
  );
}