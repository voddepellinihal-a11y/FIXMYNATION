import img3 from "../assets/111.png";

export default function AIRouting() {
  return (
    <div className="p-10">

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* IMAGE LEFT */}
        <div className="md:w-1/2">
          <img
            src={img3}
            alt="AI Routing"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="md:w-1/2">

          <h1 className="text-4xl font-bold mb-4">
            AI Complaint Routing
          </h1>

          <p className="mb-4 text-lg">
            Advanced AI automatically categorizes complaints and assigns them to the correct department.
          </p>

          <p className="mb-4">
            This reduces manual effort and ensures faster response times,
            improving efficiency in governance.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>🤖 Smart complaint classification</li>
            <li>⚡ Faster processing</li>
            <li>📉 Reduced human error</li>
            <li>📈 Improved efficiency</li>
          </ul>

        </div>

      </div>

    </div>
  );
}