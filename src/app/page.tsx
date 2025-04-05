"use client"

import React from 'react';
import Link from 'next/link';
import Image from "next/image";

// Import Lucid React icons
import { 
  NotebookText,
  ArrowRight,
  FileText,
  Search, 
  FolderOpen,
  Sparkles,
} from 'lucide-react'; 

export default function Home() {
  return (
    // Assuming PageLayout sets the base font and handles overall structure
    <>
      {/* Hero Section */}
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-10 transition-colors duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="animate-fade-in-up"> {/* Optional: Add subtle animation */}
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                <span className="block">Smart Notes</span>
                <span className="block text-blue-600 dark:text-blue-400 mt-2">AI-Powered Assistance</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                Effortlessly organize information, generate insightful summaries, and create effective notes tailored precisely to your needs.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/chat" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-black transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Start Taking Notes
                  {/* Use Lucid Icon */}
                  <NotebookText className="ml-2 h-5 w-5" strokeWidth={2.5} /> 
                </Link>
                <Link 
                  href="/features" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-black transition duration-300 ease-in-out"
                >
                  Explore Features
                  {/* Use Lucid Icon */}
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="hidden md:block relative animate-fade-in"> {/* Optional: Add subtle animation */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-transparent dark:from-blue-900/30 rounded-full blur-3xl opacity-50 -z-10"></div> {/* Subtle background glow */}
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
                alt="AI assisting with notes illustration" // More descriptive alt text
                width={600} // Adjusted size
                height={500} // Adjusted size
                className="w-full h-auto object-contain rounded-lg" // Ensure object-contain if aspect ratio is important
                priority // Load hero image faster
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Everything You Need
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Leverage AI to streamline your note-taking process and unlock new levels of productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                // Use Lucid Icon Component
                icon: FileText, 
                title: "Smart Summaries",
                description: "Condense lengthy documents or notes into concise summaries with AI-powered analysis."
              },
              {
                // Use Lucid Icon Component
                icon: Search,
                title: "Intelligent Search",
                description: "Find exactly what you need instantly with semantic search that understands context."
              },
              {
                // Use Lucid Icon Component
                icon: FolderOpen, 
                title: "Automatic Organization",
                description: "Notes are intelligently categorized and tagged, saving you time and effort."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 dark:border-gray-800 p-8 text-center transform hover:-translate-y-2"
              >
                {/* Render Lucid Icon Component */}
                <feature.icon 
                    className="w-12 h-12 mx-auto mb-6 text-blue-600 dark:text-blue-400" 
                    aria-hidden="true" 
                    strokeWidth={1.5} // Adjust stroke width for larger icons if desired
                />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Loved by Users
            </p>
             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Don't just take our word for it – see what our users have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                {
                  quote: "This app transformed how I study. The AI summaries are incredibly accurate and save me hours!",  
                  author: "Alex R.",
                  role: "Student"
                },
                {
                  quote: "Finally, a notes app that thinks like I do. The automatic organization is a game-changer for my workflow.",  
                  author: "Maria S.",
                  role: "Researcher"
                },
                {
                  quote: "The intelligent search is mind-blowingly fast and accurate. I can find any piece of information in seconds.",  
                  author: "David L.",
                  role: "Project Manager"
                }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 flex flex-col h-full transition duration-300 ease-in-out hover:border-blue-200 dark:hover:border-blue-900"
              >
                {/* Use Lucid Icon - Sparkles for a touch of 'magic'/AI */}
                <Sparkles 
                    className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-4 opacity-60" 
                    strokeWidth={1.5}
                    aria-hidden="true" 
                /> 
                <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Using gradient for a subtle depth effect */}
          <div className="bg-gradient-to-br from-gray-100 to-white dark:from-black dark:to-gray-800 rounded-2xl shadow-2xl overflow-hidden p-12 md:p-16 lg:p-20 text-center">
              {/* Use Lucid Icon - Sparkles */}
              <Sparkles 
                className="w-12 h-12 mx-auto mb-6 text-blue-400" // Slightly brighter blue on dark bg
                strokeWidth={1.5}
                aria-hidden="true" 
              />
              <h2 className="text-3xl font-extrabold tracking-tight dark:text-white sm:text-4xl">
                Ready to revolutionize your notes?
              </h2>
              <p className="mt-4 text-lg md:text-xl dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Experience the future of note-taking. Get started with AI-powered assistance today and unlock your full potential.
              </p>
              <div className="mt-10">
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-black transition duration-300 ease-in-out transform hover:-translate-y-1 text-lg"
                >
                  Get Started Now
                   {/* Use Lucid Icon */}
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Link>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}