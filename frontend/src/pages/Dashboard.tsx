import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetch("http://127.0.0.1:8000/complaints");
    const d = await res.json();
    setData(d);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 via-white to-green-400 p-10">

      <h1 className="text-4xl font-bold mb-8">
        📊 Dashboard
      </h1>

      <div className="space-y-8">

        {data.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-md p-6"
          >

            <h2 className="text-2xl font-bold mb-2">
              {c.title}
            </h2>

            <p className="text-lg mb-3">
              {c.description}
            </p>

            <p className="mb-4 text-lg">
              📍 {c.latitude}, {c.longitude}
            </p>

            <p className="mb-6 text-xl">
              Status:
              <span className="font-bold ml-2">
                {c.status}
              </span>
            </p>

            <div className="flex gap-10">

              {/* BEFORE */}
              <div>
                <p className="font-bold mb-2 text-lg">
                  Before
                </p>

                {c.image && (
                  <img
                    src={`http://127.0.0.1:8000/uploads/${c.image}`}
                    className="w-64 h-44 object-cover rounded-lg cursor-pointer border"
                    onClick={() =>
                      setSelectedImg(
                        `http://127.0.0.1:8000/uploads/${c.image}`
                      )
                    }
                  />
                )}
              </div>

              {/* AFTER */}
              <div>
                <p className="font-bold mb-2 text-lg">
                  After
                </p>

                {c.done_image ? (
                  <img
                    src={`http://127.0.0.1:8000/uploads/${c.done_image}`}
                    className="w-64 h-44 object-cover rounded-lg cursor-pointer border-4 border-green-500"
                    onClick={() =>
                      setSelectedImg(
                        `http://127.0.0.1:8000/uploads/${c.done_image}`
                      )
                    }
                  />
                ) : (
                  <div className="w-64 h-44 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                    No image uploaded
                  </div>
                )}
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* ZOOM IMAGE */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}

    </div>
  );
}