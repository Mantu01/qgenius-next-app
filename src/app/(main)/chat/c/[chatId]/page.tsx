'use client'

import ChatInput from '@/components/chat/Input';
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const params=useParams();

  const {chatId}=params;
  return (
    <div>
      <div>{chatId}</div>
      <ChatInput/>
    </div>
  )
}

export default page