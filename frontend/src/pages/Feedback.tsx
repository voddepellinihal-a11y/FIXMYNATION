import img4 from "../assets/1111.png";

export default function Feedback() {
  return (
    <div className="p-10">

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* IMAGE LEFT */}
        <div className="md:w-1/2">
          <img
            src={img4}
            alt="Feedback"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="md:w-1/2">

          <h1 className="text-4xl font-bold mb-4">
            Citizen Feedback System
          </h1>

          <p className="mb-4 text-lg">
            Citizens can rate and review services to improve transparency and accountability.
          </p>

          <p className="mb-4">
            Feedback helps authorities understand public needs and improve
            service quality over time.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>⭐ Rate complaint resolution</li>
            <li>💬 Submit suggestions</li>
            <li>📊 Performance tracking</li>
            <li>🔍 Increased transparency</li>
          </ul>

        </div>

      </div>

    </div>
  );
}