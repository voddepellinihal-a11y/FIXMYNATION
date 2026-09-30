import { useEffect, useState, useCallback } from "react";

interface Complaint {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  image?: string;
  done_image?: string;
  status?: string;
}

interface Stats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
}

export default function Admin() {
  const [data, setData] = useState<Complaint[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  const calculateStats = (complaints: Complaint[]) => {
    setStats({
      total: complaints.length,
      pending: complaints.filter(c => c.status === "Submitted" || c.status === "Pending").length,
      inProgress: complaints.filter(c => c.status === "In Progress").length,
      resolved: complaints.filter(c => c.status === "Resolved").length,
    });
  };

  const load = useCallback(async () => {
    const res = await fetch("http://127.0.0.1:8000/complaints");
    const complaints: Complaint[] = await res.json();
    setData(complaints);
    calculateStats(complaints);
  }, []);

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        const userData = JSON.parse(user);
        if (userData.email === "admin@fixmynation.com") {
          setIsAdmin(true);
          load();
        } else {
          alert("Access denied ❌ Admin only");
          window.location.href = "/";
        }
      } else {
        alert("Please login as admin");
        window.location.href = "/login";
      }
    };
    checkAdmin();
  }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`http://127.0.0.1:8000/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ status }),
    });
    load();
  };

  const uploadDone = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(`http://127.0.0.1:8000/upload-done/${id}`, {
      method: "POST",
      body: formData,
    });

    alert("Resolution image uploaded ✅");
    load();
  };

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900">🧑‍💼 Admin Panel</h2>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-blue-700">Total Complaints</h3>
          <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-yellow-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-orange-700">In Progress</h3>
          <p className="text-3xl font-bold text-orange-900 mt-2">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-green-700">Resolved</h3>
          <p className="text-3xl font-bold text-green-900 mt-2">{stats.resolved}</p>
        </div>
      </div>

      {/* COMPLAINTS LIST */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">All Complaints</h3>
        </div>
        <div className="divide-y">
          {data.map((c: Complaint) => {
            const before = c.image && `http://127.0.0.1:8000/uploads/${c.image}`;
            const after = c.done_image && `http://127.0.0.1:8000/uploads/${c.done_image}`;

            const getStatusColor = (status: string) => {
              if (status === "Resolved") return "bg-green-100 text-green-700";
              if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
              return "bg-gray-100 text-gray-700";
            };

            return (
              <div key={c.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{c.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status || "Submitted")}`}>
                        {c.status || "Submitted"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{c.description}</p>
                    <p className="text-sm text-gray-400">📍 {c.latitude}, {c.longitude}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {/* STATUS BUTTONS */}
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => updateStatus(c.id, "Pending")}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(c.id, "In Progress")}
                        className="px-3 py-1.5 text-sm rounded-lg border border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updateStatus(c.id, "Resolved")}
                        className="px-3 py-1.5 text-sm rounded-lg border border-green-400 text-green-700 hover:bg-green-50"
                      >
                        Resolved
                      </button>
                    </div>

                    {/* IMAGES */}
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Before</p>
                        {before && (
                          <img
                            src={before}
                            onClick={() => setSelectedImg(before)}
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer border"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">After</p>
                        {after ? (
                          <img
                            src={after}
                            onClick={() => setSelectedImg(after)}
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 border-green-500"
                          />
                        ) : (
                          <p className="text-sm text-red-500">Not uploaded</p>
                        )}
                      </div>
                    </div>

                    {/* UPLOAD RESOLUTION */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && e.target.files[0] && uploadDone(c.id, e.target.files[0])
                      }
                      className="hidden"
                      id={`upload-${c.id}`}
                    />
                    <label
                      htmlFor={`upload-${c.id}`}
                      className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                    >
                      Upload Resolution
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ZOOM MODAL */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <img src={selectedImg} className="max-w-[90%] max-h-[90%] rounded-lg" />
        </div>
      )}
    </div>
  );
}