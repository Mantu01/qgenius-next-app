"use client"

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import PageLayout from '@/components/layout/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Quantum Computing</span>
                <span className="block text-blue-600">Made Simple</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                QGenius helps you understand quantum computing concepts, generate code, and visualize quantum algorithms.
              </p>
              <div className="mt-10 flex gap-4">
                <Link 
                  href="/chat" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Chat
                </Link>
                <Link 
                  href="/features" 
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
                alt="Quantum Computing Illustration"
                width={500}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to master quantum computing</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "Quantum Concepts",
                description: "Learn quantum computing principles through interactive explanations"
              },
              {
                icon: "💻",
                title: "Code Generation",
                description: "Generate code for popular quantum frameworks like Qiskit and Cirq"
              },
              {
                icon: "📊",
                title: "Visualizations",
                description: "See quantum algorithms and circuits in action with dynamic visualizations"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Users Say</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "QGenius helped me understand quantum entanglement in minutes, not hours.",
                author: "Sarah J., PhD Student"
              },
              {
                quote: "The code generation feature saved me days of work on my quantum project.",
                author: "Michael T., Researcher"
              },
              {
                quote: "Visualizing quantum algorithms made complex concepts click for me.",
                author: "Amit P., Developer"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-800 font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Ready to dive into quantum computing?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Start chatting with QGenius today and unlock the power of quantum.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <Link
                  href="/chat"
                  className="block w-full sm:w-auto px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
