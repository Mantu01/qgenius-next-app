import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Zap, Code, BarChart3, BookOpen, Settings, MapPin, Shield, Users } from 'lucide-react';
import FeatureCard from '@/components/features/FeatureCard';

export default function FeaturesPage() {
  const features = [
    {
      title: "Quantum Basics",
      description: "Simple explanations of quantum topics.",
      icon: <BookOpen className="w-10 h-10" />
    },
    {
      title: "Code Builder",
      description: "Generate code for quantum circuits.",
      icon: <Code className="w-10 h-10" />
    },
    {
      title: "Visual Tools",
      description: "See how quantum algorithms work.",
      icon: <BarChart3 className="w-10 h-10" />
    },
    {
      title: "Circuit Design",
      description: "Create and refine quantum circuits.",
      icon: <Settings className="w-10 h-10" />
    },
    {
      title: "Learning Paths",
      description: "Step-by-step quantum lessons.",
      icon: <MapPin className="w-10 h-10" />
    },
    {
      title: "Error Fixing",
      description: "Apply quantum error correction.",
      icon: <Shield className="w-10 h-10" />
    },
    {
      title: "Quantum Community",
      description: "Join other quantum learners.",
      icon: <Users className="w-10 h-10" />
    },
    {
      title: "Research Help",
      description: "Support for papers and findings.",
      icon: <BookOpen className="w-10 h-10" />
    }
  ];
  

  return (
    <>
      {/* Hero Section - Enhanced with more gradient and better spacing */}
      <div className="bg-gradient-to-r from-green-100 via-green-50 to-indigo-100 dark:from-green-950 dark:via-green-900 dark:to-indigo-950 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6">
              <Zap className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto" />
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl mb-6 tracking-tight">
              QGenius Features
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore the full range of tools and capabilities that make QGenius your perfect quantum computing companion
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid - Enhanced with better spacing and animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Powerful Tools for Quantum Exploration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="transform hover:scale-105 transition-all duration-300">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
        
        {/* CTA Section - Enhanced with better button styling and effects */}
        <div className="mt-24 text-center">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to explore quantum computing?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the power of QGenius and take your quantum computing journey to the next level.
            </p>
            <Link 
              href="/chat" 
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 text-lg font-medium shadow-xl hover:shadow-red-500/30 dark:bg-red-700 dark:hover:bg-red-800 transform hover:-translate-y-1"
            >
              <span>Try QGenius Now</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section - Completely redesigned for better visual appeal */}
      <div className="bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-green-950 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">How QGenius Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Simple, intuitive, and powerful - get started in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-800 rounded-full p-4 shadow-md">
                    <span className="text-green-600 dark:text-green-300 font-bold text-xl">1</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold dark:text-white">Ask a Question</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                      Type your quantum computing query or select from popular topics in our intuitive interface
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-800 rounded-full p-4 shadow-md">
                    <span className="text-green-600 dark:text-green-300 font-bold text-xl">2</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold dark:text-white">Get Instant Answers</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                      Receive clear explanations, interactive visualizations, and executable code examples
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-800 rounded-full p-4 shadow-md">
                    <span className="text-green-600 dark:text-green-300 font-bold text-xl">3</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold dark:text-white">Dive Deeper</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                      Follow up with additional questions to explore quantum topics further and enhance your understanding
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Link 
                  href="/chat" 
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-red-500/30 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  <span>Start Your Quantum Journey</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-green-500 dark:bg-green-600 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-green-100 dark:border-green-800">
                  <div className="p-6">
                    <Image 
                      src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
                      alt="How QGenius Works"
                      width={500}
                      height={400}
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}