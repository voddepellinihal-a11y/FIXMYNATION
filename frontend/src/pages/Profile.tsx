import { useState, useEffect } from "react";

interface User {
  email: string;
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  status?: string;
}

const getInitialUser = (): User | null => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  try {
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "complaints">("info");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    fetch("http://127.0.0.1:8000/complaints")
      .then((res) => res.json())
      .then((data: Complaint[]) => setComplaints(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "info"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "complaints"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Complaints
          </button>
        </div>

        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-700">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.email}</h2>
                  <p className="text-gray-500">Registered User</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Account Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Member Since</p>
                    <p className="font-medium">2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "complaints" && (
            <div>
              {complaints.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No complaints submitted yet</p>
              ) : (
                <div className="space-y-4">
                  {complaints.map((c: Complaint) => (
                    <div
                      key={c.id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{c.title}</h3>
                          <p className="text-sm text-gray-600">{c.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            📍 {c.latitude}, {c.longitude}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            c.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : c.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {c.status || "Submitted"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}