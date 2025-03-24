import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import FeatureCard from '@/components/features/FeatureCard';

export default function FeaturesPage() {
  const features = [
    {
      title: "Quantum Computing Explanations",
      description: "Get clear, concise explanations of quantum computing concepts.",
      icon: "🔍"
    },
    {
      title: "Code Generation",
      description: "Generate Qiskit, Cirq, or Q# code for quantum algorithms.",
      icon: "💻"
    },
    {
      title: "Algorithm Visualization",
      description: "Visualize quantum algorithms and understand their operation.",
      icon: "📊"
    },
    {
      title: "Research Assistant",
      description: "Help with quantum research papers and publications.",
      icon: "📚"
    },
    {
      title: "Circuit Design",
      description: "Design and optimize quantum circuits for specific problems.",
      icon: "⚙️"
    },
    {
      title: "Learning Paths",
      description: "Guided learning journeys from beginner to advanced quantum concepts.",
      icon: "🛤️"
    },
    {
      title: "Error Correction",
      description: "Understand and implement quantum error correction techniques.",
      icon: "🔧"
    },
    {
      title: "Community Access",
      description: "Connect with other quantum enthusiasts and experts.",
      icon: "👥"
    }
  ];

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">QGenius Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the full range of tools and capabilities that make QGenius your perfect quantum computing companion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to experience these features?</h2>
          <Link 
            href="/chat" 
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Try QGenius Now
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">How QGenius Works</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Ask a Question</h3>
                    <p className="text-gray-600 mt-1">Type your quantum computing query or select from popular topics</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Get Instant Answers</h3>
                    <p className="text-gray-600 mt-1">Receive clear explanations, visualizations, and code examples</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Dive Deeper</h3>
                    <p className="text-gray-600 mt-1">Follow up with additional questions to explore topics further</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
                alt="How QGenius Works"
                width={500}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 