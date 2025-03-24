'use client';

import React, { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="container mx-auto px-4 py-8 h-full">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
} 