'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/chat';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello! I\'m QGenius, your quantum computing assistant. How can I help you today? You can ask me about quantum concepts, algorithms, or code generation.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // In a real app, you would call your API here
    // For now, we'll simulate a response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(message)
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple response simulation for demo purposes
  const getSimulatedResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('quantum') && lowerMessage.includes('computer')) {
      return "A quantum computer is a computing device that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform computations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously.";
    }
    
    if (lowerMessage.includes('qubit')) {
      return "A qubit (or quantum bit) is the basic unit of quantum information in quantum computing. Unlike classical bits which can be either 0 or 1, qubits can exist in a superposition of both states. This property allows quantum computers to process information in ways that classical computers cannot.";
    }
    
    if (lowerMessage.includes('algorithm')) {
      return "Quantum algorithms are algorithms that run on a quantum computer. Famous examples include Shor's algorithm for factoring large numbers and Grover's algorithm for searching databases. These algorithms offer significant speedups over their classical counterparts for specific problems.";
    }
    
    if (lowerMessage.includes('code') || lowerMessage.includes('example')) {
      return `Here's a simple Qiskit code example for creating a Bell state:

\`\`\`python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram

# Create a Quantum Circuit with 2 qubits
qc = QuantumCircuit(2, 2)

# Apply H-gate to qubit 0
qc.h(0)

# Apply CNOT (controlled-X) with control qubit 0 and target qubit 1
qc.cx(0, 1)

# Measure qubits
qc.measure([0,1], [0,1])

# Simulate the circuit
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1000).result()
counts = result.get_counts(qc)
print(counts)
\`\`\`

This code creates a Bell state, which is one of the simplest examples of quantum entanglement.`;
    }
    
    return "I'm here to help with your quantum computing questions. You can ask me about quantum concepts, algorithms, or request code examples in various quantum programming frameworks.";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">QGenius Chat</h2>
        <p className="text-blue-100 text-sm">Ask anything about quantum computing</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg w-fit">
            <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full"></div>
            <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full animation-delay-200"></div>
            <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full animation-delay-400"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
} 