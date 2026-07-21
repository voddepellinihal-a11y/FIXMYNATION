import img1 from "../assets/1.png";

export default function Grievance() {
  return (
    <div className="p-10">

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* IMAGE LEFT */}
        <div className="md:w-1/2">
          <img
            src={img1}
            alt="Grievance"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="md:w-1/2">

          <h1 className="text-4xl font-bold mb-4">
            Public Grievance System
          </h1>

          <p className="mb-4 text-lg">
            A centralized platform where citizens can report civic issues
            like potholes, garbage overflow, water leakage, and streetlight failures.
          </p>

          <p className="mb-4">
            This system ensures that complaints are directed to the right
            authorities and resolved efficiently with proper tracking.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>📍 Submit complaints with live location</li>
            <li>📸 Upload images as proof</li>
            <li>📊 Track complaint status</li>
            <li>⚡ Faster resolution</li>
          </ul>

        </div>

      </div>

    </div>
  );
}