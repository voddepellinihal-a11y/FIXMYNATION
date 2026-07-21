import { useState } from "react";

export default function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");

  const [otp,setOtp]=useState("");
  const [generatedOtp,setGeneratedOtp]=useState("");
  const [verified,setVerified]=useState(false);

  const sendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random()*900000).toString();
    setGeneratedOtp(newOtp);
    alert("OTP: " + newOtp);
  };

  const verifyOtp = () => {
    if(otp === generatedOtp){
      setVerified(true);
      alert("OTP Verified");
    } else {
      alert("Wrong OTP");
    }
  };

  const register = async () => {
    if(!verified){
      alert("Verify OTP first");
      return;
    }

    await fetch(`http://127.0.0.1:8000/register?email=${email}&password=${password}&phone=${phone}`,{
      method:"POST"
    });

    alert("Registered Successfully");
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input className="w-full p-2 border mb-2" placeholder="Email"
        onChange={e=>setEmail(e.target.value)} />

      <input className="w-full p-2 border mb-2" placeholder="Phone"
        onChange={e=>setPhone(e.target.value)} />

      <input className="w-full p-2 border mb-2" type="password"
        placeholder="Password"
        onChange={e=>setPassword(e.target.value)} />

      <input className="w-full p-2 border mb-2"
        placeholder="Enter OTP"
        onChange={e=>setOtp(e.target.value)} />

      <button onClick={sendOtp}
        className="bg-blue-500 text-white w-full p-2 mb-2">
        Send OTP
      </button>

      <button onClick={verifyOtp}
        className="bg-green-500 text-white w-full p-2 mb-2">
        Verify OTP
      </button>

      <button onClick={register}
        className="bg-orange-500 text-white w-full p-2">
        Register
      </button>

    </div>
  );
}