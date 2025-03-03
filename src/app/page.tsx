"use client"

import axios from "axios";

export default function Home() {
  async function a(){
    await axios.post('/api/auth/login',{fullName:"Mantu Kumar",email:"mantu11@gmail.com",password:"11111111",userName:"mantu11"})
  }
  async function b(){
    await axios.get(`/api/auth/resetpassword?userId=4f3dd4a0-470c-4462-af01-2c8138c2f410`)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white px-6">
      {/* Navbar Placeholder */}
      <nav className="absolute top-6 left-0 w-full flex justify-between px-8">
        <h2 className="text-xl font-bold">NexusAI</h2>
        <div>
          <button className="px-4 py-2 bg-white text-black rounded-full">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold">
          Ultimate AI Generator <br />
          <span className="text-blue-200">ChatBot Assistant</span>
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          AI-driven platform to generate AI content and make money.
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex gap-10">
          <button onClick={a} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition">
            Start Making Money
          </button>
          <button onClick={b} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition">
            Start Losing Money
          </button>
        </div>
      </div>
    </div>
  );
}
