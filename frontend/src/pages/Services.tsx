import img2 from "../assets/11.png";

export default function Services() {
  return (
    <div className="p-10">

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* IMAGE LEFT */}
        <div className="md:w-1/2">
          <img
            src={img2}
            alt="Services"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="md:w-1/2">

          <h1 className="text-4xl font-bold mb-4">
            Digital Citizen Services
          </h1>

          <p className="mb-4 text-lg">
            Access essential government services digitally without visiting offices physically.
          </p>

          <p className="mb-4">
            This platform integrates multiple services into one place,
            making it easier for citizens to manage documents and services.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>📂 DigiLocker integration</li>
            <li>🛂 Passport services</li>
            <li>🚆 Railway booking</li>
            <li>🏛️ Municipal services</li>
          </ul>

        </div>

      </div>

    </div>
  );
}