'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquare, Brain, Globe, Code, Users, Target, FileText } from 'lucide-react';

export default function AboutPage() {

 const team = [
  {
    name: "Tony Stark",
    role: "Lead AI Engineer",
    bio: "Inventing cutting-edge AI solutions and pushing technological boundaries.",
    image: "https://example.com/real-bruce-wayne.jpg",
    specialties: ["Artificial Intelligence", "Quantum Computing"]
  },
  {
    name: "Bruce Wayne",
    role: "Backend Specialist",
    bio: "Building ultra-secure, scalable backend systems with precision.",
    image: "https://example.com/real-bruce-wayne.jpg",
    specialties: ["Node.js", "Security Architecture"]
  },
  {
    name: "Shuri",
    role: "Frontend Developer",
    bio: "Crafting advanced, intuitive user interfaces with Wakandan innovation.",
    image: "https://example.com/real-shuri.jpg",
    specialties: ["React", "UI/UX Design"]
  },
  {
    name: "Dexter",
    role: "AI Researcher",
    bio: "Exploring the deepest layers of AI with endless curiosity from his secret lab.",
    image: "https://example.com/real-dexter.jpg",
    specialties: ["Deep Learning", "Neural Networks"]
  }
];



  const stats = [
    { value: "10M+", label: "Questions Answered", icon: <MessageSquare className="h-8 w-8" /> },
    { value: "24/7", label: "Availability", icon: <Globe className="h-8 w-8" /> },
    { value: "98%", label: "Accuracy Rate", icon: <Target className="h-8 w-8" /> },
    { value: "50+", label: "Languages Supported", icon: <Code className="h-8 w-8" /> },
    { value: "1-Click", label: "PDF Note Generation", icon: <FileText className="h-8 w-8" /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 sm:py-40 lg:px-8 text-center">
          <Brain className="mx-auto h-16 w-16 text-green-300 dark:text-green-200 mb-6" />
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to <span className="text-green-300">QGenius</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-green-100 max-w-3xl mx-auto">
            Your AI-powered platform for multi-question answering, PDF note generation, and in-depth learning.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all">
              Try It Now
            </button>
            <button className="text-sm font-semibold leading-6 text-green-200 hover:text-white transition-colors">
              Learn More <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              QGenius by the numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our impact in delivering intelligent answers worldwide
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, statIdx) => (
              <div key={statIdx} className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-red-600 dark:text-red-400 mb-4">
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
      <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Founded in 2024, QGenius was built to provide fast, accurate, and multi-layered answers with a seamless note generation experience.
              </p>
              <div className="mt-8 space-y-6">
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Today, QGenius serves users across the globe with instant, AI-powered answers and easy PDF export capabilities.
                </p>
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                  We&apos;re committed to making intelligent question-answering accessible and efficient for all.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="QGenius research team"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Expert Team
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Dedicated professionals making QGenius smarter every day
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
                  <p className="text-green-600 dark:text-green-400 text-sm font-semibold leading-6">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {person.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {person.specialties.map((specialty, i) => (
                      <span key={i} className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20">
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
      <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24 transition-colors duration-300">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-16 top-16 -ml-72 -mt-72 opacity-50 blur-3xl">
            <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-green-400 to-green-600 dark:from-green-800 dark:to-green-900"></div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <Target className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              To deliver fast, accurate, multi-question answers and exportable notes instantly
            </p>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="text-green-600 dark:text-green-400 text-2xl font-bold mb-2">01</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Understand</h3>
                <p className="text-gray-600 dark:text-gray-300">Interpret complex questions accurately</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="text-green-600 dark:text-green-400 text-2xl font-bold mb-2">02</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Process</h3>
                <p className="text-gray-600 dark:text-gray-300">Retrieve precise answers using AI-powered models</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="text-green-600 dark:text-green-400 text-2xl font-bold mb-2">03</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Deliver</h3>
                <p className="text-gray-600 dark:text-gray-300">Present answers in clean formats, ready for PDF export</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 dark:bg-green-900 py-16 sm:py-24 transition-colors duration-300">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-600 dark:bg-green-800">
              <MessageSquare className="h-16 w-16 text-white" />
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get instant answers?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              Try QGenius today and experience multi-question support with PDF note generation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all">
                Start Asking Questions
              </button>
              <button className="text-sm font-semibold leading-6 text-white hover:text-green-100 transition-colors">
                See Examples <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
