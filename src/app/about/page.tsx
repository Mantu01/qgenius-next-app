import React from 'react';
import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';

export default function AboutPage() {
  const team = [
    {
      name: "Zorblax the Visionary",
      role: "Lead Quantum Innovator",
      bio: "Exploring the frontiers of quantum science, ensuring timelines don't collide.",
      image: "https://randomuser.me/api/portraits/men/24.jpg"
    },
    {
      name: "Captain Nova",
      role: "Space Systems Engineer",
      bio: "From coding in zero-gravity to managing galactic networks, no system is out of reach.",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Luna Vega",
      role: "UX Specialist",
      bio: "Designs experiences that flow as seamlessly as stardust through a nebula.",
      image: "https://randomuser.me/api/portraits/women/56.jpg"
    },
    {
      name: "Dr. Quark",
      role: "AI Researcher",
      bio: "Develops intelligent systems that understand both humans and alien lifeforms.",
      image: "https://randomuser.me/api/portraits/men/66.jpg"
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 py-20 text-white rounded-lg shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold">Welcome to QGenius 🌌</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">
              Connecting minds across galaxies to unlock the infinite potential of quantum computing.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our journey began with a simple idea — to bridge the gaps between stars and circuits. Collaborating with innovators from every corner of the cosmos, we built a platform that simplifies the mysteries of quantum computing.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              At QGenius, we aim to make quantum knowledge accessible to all — from Earth-based researchers to interstellar hobbyists. Whether you're a student or a seasoned explorer of the multiverse, there's a place for you here.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
              alt="Quantum Spaceship"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Galactic Team</h2>
            <p className="text-lg text-gray-600 mt-2">
              Innovators from across the stars, united for a quantum future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="h-64 relative">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            To make quantum computing a universal language, understood across galaxies.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
