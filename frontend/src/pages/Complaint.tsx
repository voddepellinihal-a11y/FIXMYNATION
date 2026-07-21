import { useState } from "react";

export default function Complaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(loc);
      },
      () => alert("Location denied ❌")
    );
  };

  const submitComplaint = async () => {
    if (!location) {
      alert("Click Get Location first 📍");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);

    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/complaint", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      alert("Complaint Submitted ✅");
    } catch (err) {
      console.error(err);
      alert("Network error ❌");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "500px",
        margin: "auto",
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>📢 File Complaint</h2>

      <input
        placeholder="Title"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* LOCATION BUTTON */}
      <button
        onClick={getLocation}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          marginBottom: "10px",
        }}
      >
        📍 Get Location
      </button>

      {/* SHOW LOCATION */}
      {location && (
        <p style={{ marginBottom: "10px" }}>
          📍 {location.lat}, {location.lng}
        </p>
      )}

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        style={{ marginBottom: "10px" }}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* SUBMIT */}
      <button
        onClick={submitComplaint}
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
        }}
      >
        🚀 Submit Complaint
      </button>
    </div>
  );
}