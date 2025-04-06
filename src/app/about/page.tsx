'use client';

import React from 'react';
import Image from 'next/image';
import { Rocket, Atom, Globe, Code, Sparkles, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: "Zorblax the Visionary",
      role: "Lead Quantum Innovator",
      bio: "Exploring the frontiers of quantum science, ensuring timelines don't collide.",
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      specialties: ["Quantum Entanglement", "Temporal Mechanics"]
    },
    {
      name: "Captain Nova",
      role: "Space Systems Engineer",
      bio: "From coding in zero-gravity to managing galactic networks, no system is out of reach.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      specialties: ["Orbital Dynamics", "FTL Communications"]
    },
    {
      name: "Luna Vega",
      role: "UX Specialist",
      bio: "Designs experiences that flow as seamlessly as stardust through a nebula.",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      specialties: ["Interstellar UI", "Neural Interfaces"]
    },
    {
      name: "Dr. Quark",
      role: "AI Researcher",
      bio: "Develops intelligent systems that understand both humans and alien lifeforms.",
      image: "https://randomuser.me/api/portraits/men/66.jpg",
      specialties: ["Xenolinguistics", "Quantum Neural Nets"]
    }
  ];

  const stats = [
    { value: "42+", label: "Quantum Breakthroughs", icon: <Atom className="h-8 w-8" /> },
    { value: "7", label: "Galactic Branches", icon: <Globe className="h-8 w-8" /> },
    { value: "∞", label: "Possible Futures", icon: <Sparkles className="h-8 w-8" /> },
    { value: "10M+", label: "Lines of Q-Code", icon: <Code className="h-8 w-8" /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80 dark:from-blue-950/90 dark:to-indigo-950/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 sm:py-40 lg:px-8 text-center">
          <Rocket className="mx-auto h-16 w-16 text-blue-400 dark:text-blue-300 mb-6" />
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to <span className="text-blue-400">QGenius</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-blue-100 max-w-3xl mx-auto">
            Connecting minds across galaxies to unlock the infinite potential of quantum computing.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
              Explore Our Quantum Network
            </button>
            <button className="text-sm font-semibold leading-6 text-blue-200 hover:text-white transition-colors">
              Meet the Team <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Quantum by the numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our impact across the multiverse
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, statIdx) => (
              <div key={statIdx} className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Cosmic Journey
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Our odyssey began at the intersection of quantum physics and cosmic curiosity. What started as a small research collective on Europa has expanded into a galactic network of quantum innovators.
              </p>
              <div className="mt-8 space-y-6">
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Today, QGenius stands at the forefront of multidimensional computing, with research stations spanning seven star systems and counting.
                </p>
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                  We're committed to making quantum knowledge accessible to all intelligent lifeforms, from Earth-based researchers to Andromedan hobbyists.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
                alt="Quantum research facility"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Galactic Team
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Innovators from across the stars, united for a quantum future
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {team.map((person) => (
              <article key={person.name} className="flex flex-col items-center text-center bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 w-full">
                  <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold leading-6">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {person.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {person.specialties.map((specialty, i) => (
                      <span key={i} className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-16 top-16 -ml-72 -mt-72 opacity-50 blur-3xl">
            <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] dark:from-[#4f46e5] dark:to-[#06b6d4]"></div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <Target className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Universal Mission
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              To make quantum computing a universal language, understood across galaxies and dimensions
            </p>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-2">01</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Democratize Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-300">Make quantum computing accessible to all civilizations</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-2">02</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bridge Dimensions</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect quantum researchers across parallel universes</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-2">03</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Solve Cosmic Mysteries</h3>
                <p className="text-gray-600 dark:text-gray-300">Apply quantum computing to the universe's greatest puzzles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 dark:bg-blue-900 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-800">
              <Rocket className="h-16 w-16 text-white" />
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore the quantum frontier?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join our growing community of interstellar quantum researchers today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                Begin Your Journey
              </button>
              <button className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}