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
  LogIn,
} from 'lucide-react'; 
import { useSelector } from 'react-redux';

export default function Home() {
  
  const {isAuthenticated}=useSelector((state:RootState)=>state.user);

  const info = [
    {
      icon: FileText, 
      title: "Smart Summaries",
      description: "Condense lengthy documents or notes into concise summaries with AI-powered analysis."
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Find exactly what you need instantly with semantic search that understands context."
    },
    {
      icon: FolderOpen, 
      title: "Automatic Organization",
      description: "Notes are intelligently categorized and tagged, saving you time and effort."
    }
  ]

  const testinomial = [
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
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-gray-900 dark:text-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block">Smart Notes</span>
                <span className="block text-green-600 dark:text-green-400 mt-3">AI-Powered Assistance</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                Effortlessly organize information, generate insightful summaries, and create effective notes tailored precisely to your needs.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link 
                    href="/chat" 
                    className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Start Taking Notes
                    <NotebookText className="ml-2 h-5 w-5" strokeWidth={2.5} /> 
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Login to Get Started
                    <LogIn className="ml-2 h-5 w-5" strokeWidth={2.5} />
                  </Link>
                )}
                <Link 
                  href="/features" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Explore Features
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="hidden md:block relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-transparent to-transparent dark:from-green-900/30 rounded-full blur-3xl opacity-50 -z-10"></div>
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
                alt="AI assisting with notes illustration"
                width={600}
                height={500}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-green-600 dark:text-green-400 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Everything You Need
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Leverage AI to streamline your note-taking process and unlock new levels of productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {info.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 p-8 text-center transform hover:-translate-y-2"
              >
                <feature.icon 
                    className="w-12 h-12 mx-auto mb-6 text-green-600 dark:text-green-400 p-2 bg-green-50 dark:bg-green-900/20 rounded-full" 
                    aria-hidden="true" 
                    strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-green-600 dark:text-green-400 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by Users
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Don't just take our word for it – see what our users have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testinomial.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700 flex flex-col h-full transition duration-300 hover:border-green-300 dark:hover:border-green-500"
              >
                <Sparkles 
                    className="w-8 h-8 text-green-500 dark:text-green-400 mb-4 opacity-60" 
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
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden p-8 md:p-10 lg:p-12 text-center border border-gray-200 dark:border-gray-700">
              <Sparkles 
                className="w-12 h-12 mx-auto mb-6 text-green-500 dark:text-green-400 p-2 bg-green-50 dark:bg-green-900/20 rounded-full"
                strokeWidth={1.5}
                aria-hidden="true" 
              />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight dark:text-white">
                Ready to revolutionize your notes?
              </h2>
              <p className="mt-4 text-lg dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Experience the future of note-taking. Get started with AI-powered assistance today and unlock your full potential.
              </p>
              <div className="mt-10">
                {isAuthenticated ? (
                  <Link
                    href="/chat"
                    className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Start Taking Notes
                    <NotebookText className="ml-2 h-5 w-5" strokeWidth={2.5} />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Login to Get Started
                    <LogIn className="ml-2 h-5 w-5" strokeWidth={2.5} />
                  </Link>
                )}
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}