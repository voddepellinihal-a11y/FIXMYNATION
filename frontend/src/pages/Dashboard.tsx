import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/complaints")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      {data.map((c: any) => (
        <div key={c.id} className="bg-white p-4 mb-4 shadow rounded">
          <h3 className="font-bold">{c.title}</h3>
          <p>{c.description}</p>
          <p>📍 {c.latitude}, {c.longitude}</p>

          {c.image && (
            <img
              src={`http://127.0.0.1:8000/${c.image}`}
              className="w-40 mt-2 rounded"
            />
          )}
        </div>
      ))}

    </div>
  );
}