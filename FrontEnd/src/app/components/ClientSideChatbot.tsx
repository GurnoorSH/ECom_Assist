"use client";

import RasaChatbotWidget from './rasa-chat';

declare global {
  interface Window {
    rasaChat: any;
  }
}

export default function ClientSideChatbot() {
  return <RasaChatbotWidget serverUrl="http://localhost:5005" />;
}