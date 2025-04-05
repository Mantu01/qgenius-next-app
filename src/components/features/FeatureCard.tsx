import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export default function FeatureCard({ title, description, icon, className = '' }: FeatureCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group ${className}`}>
      <div className="text-4xl mb-4 bg-blue-50 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}