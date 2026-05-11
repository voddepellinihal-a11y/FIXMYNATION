import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState<any[]>([]);

  // 🔥 YOUR PUBLIC BACKEND URL
  const API =
    "https://YOUR-BACKEND.ngrok-free.app";

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      alert("Access denied ❌");
      window.location.href = "/";
    }

    load();
  }, []);

  // LOAD COMPLAINTS
  const load = async () => {
    const res = await fetch(`${API}/complaints`);

    const d = await res.json();

    setData(d);
  };

  // UPDATE STATUS
  const updateStatus = async (
    id: number,
    status: string
  ) => {
    const formData = new FormData();

    formData.append("status", status);

    await fetch(
      `${API}/update-status/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    load();
  };

  // UPLOAD DONE IMAGE
  const uploadDone = async (
    id: number,
    file: File
  ) => {
    const formData = new FormData();

    formData.append("file", file);

    await fetch(
      `${API}/upload-done/${id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    alert("Image uploaded ✅");

    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 via-white to-green-400 p-10">

      <h1 className="text-4xl font-bold mb-10">
        🧑‍💼 Admin Panel
      </h1>

      <div className="space-y-10">

        {data.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-lg p-8"
          >

            {/* TITLE */}
            <h2 className="text-3xl font-bold mb-4">
              {c.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-lg text-gray-700 mb-5">
              {c.description}
            </p>

            {/* STATUS */}
            <div className="mb-6">
              <span className="text-2xl font-semibold">
                Status:
              </span>

              <span
                className={`ml-4 px-5 py-2 rounded-lg text-white font-bold text-lg
                ${
                  c.status === "Resolved"
                    ? "bg-green-600"
                    : c.status === "In Progress"
                    ? "bg-yellow-500"
                    : "bg-gray-600"
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap mb-8">

              <button
                onClick={() =>
                  updateStatus(c.id, "Pending")
                }
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                Pending
              </button>

              <button
                onClick={() =>
                  updateStatus(c.id, "In Progress")
                }
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold"
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(c.id, "Resolved")
                }
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                Resolved
              </button>

            </div>

            {/* IMAGES */}
            <div className="flex flex-wrap gap-10 mb-8">

              {/* BEFORE */}
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  Before
                </h3>

                {c.image ? (
                  <img
                    src={`${API}/uploads/${c.image}`}
                    className="w-72 h-52 object-cover rounded-xl border"
                  />
                ) : (
                  <div className="w-72 h-52 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* AFTER */}
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  After
                </h3>

                {c.done_image ? (
                  <img
                    src={`${API}/uploads/${c.done_image}`}
                    className="w-72 h-52 object-cover rounded-xl border-4 border-green-500"
                  />
                ) : (
                  <div className="w-72 h-52 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image Uploaded
                  </div>
                )}
              </div>

            </div>

            {/* FILE UPLOAD */}
            <div className="bg-gray-100 p-5 rounded-xl">

              <label className="block text-xl font-semibold mb-3">
                Upload Completed Work Image
              </label>

              <input
                type="file"
                className="w-full border bg-white p-4 rounded-lg"
                onChange={(e) =>
                  e.target.files &&
                  uploadDone(c.id, e.target.files[0])
                }
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}