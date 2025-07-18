"use client";

import RasaChatbot from "@rasahq/chat-widget-react";

export default function ClientSideChatbot() {
  // Use kebab-case for all props, which is the standard for custom elements.
  // This ensures the underlying widget receives the configuration correctly.
  return (
    <RasaChatbot
      server-url="http://localhost:5005"
      init-payload="/greet"
      title="E-ComAssist"
      // subtitle="AI Support"
      profile-avatar="https://i.imgur.com/7k1hXzC.png"
      use-rest="true"
    />
  );
}