import img1 from "../assets/1.png";
import img2 from "../assets/11.png";
import img3 from "../assets/111.png";
import img4 from "../assets/1111.png";

export default function ImageSlider() {
  return (
    <div className="overflow-hidden w-full py-6 bg-white">

      <div className="flex gap-10 animate-scroll">

        {/* First set */}
        <img src={img1} className="h-48 rounded-lg shadow-lg" />
        <img src={img2} className="h-48 rounded-lg shadow-lg" />
        <img src={img3} className="h-48 rounded-lg shadow-lg" />
        <img src={img4} className="h-48 rounded-lg shadow-lg" />

        {/* Duplicate for smooth loop */}
        <img src={img1} className="h-48 rounded-lg shadow-lg" />
        <img src={img2} className="h-48 rounded-lg shadow-lg" />
        <img src={img3} className="h-48 rounded-lg shadow-lg" />
        <img src={img4} className="h-48 rounded-lg shadow-lg" />

      </div>

    </div>
  );
}