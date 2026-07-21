import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      alert("Login required ❌");
      window.location.href = "/login";
    }
    load();
  }, []);

  const load = async () => {
    const res = await fetch("http://127.0.0.1:8000/complaints");
    setData(await res.json());
  };

  return (
    <div style={{ padding: "20px", background: "#f3f4f6" }}>
      <h2>📊 Dashboard</h2>

      {data.map((c) => {
        const before = c.image && `http://127.0.0.1:8000/uploads/${c.image}`;
        const after = c.done_image && `http://127.0.0.1:8000/uploads/${c.done_image}`;

        return (
          <div key={c.id}
            style={{
              background: "#fff",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "10px"
            }}>

            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>Status: <b>{c.status}</b></p>

            {/* SIDE BY SIDE */}
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>

              <div>
                <p>Before</p>
                {before && (
                  <img
                    src={before}
                    onClick={() => setSelectedImg(before)}
                    style={{ width: "150px", cursor: "pointer" }}
                  />
                )}
              </div>

              <div>
                <p>After</p>
                {after ? (
                  <img
                    src={after}
                    onClick={() => setSelectedImg(after)}
                    style={{ width: "150px", cursor: "pointer", border: "2px solid green" }}
                  />
                ) : (
                  <p style={{ color: "red" }}>Not resolved</p>
                )}
              </div>

            </div>

          </div>
        );
      })}

      {/* ZOOM */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={selectedImg} style={{ maxWidth: "90%", maxHeight: "90%" }} />
        </div>
      )}
    </div>
  );
}