// FILE: src/app/page.tsx

// 1. Remove the `dynamic` import.
// 2. Import our new ClientSideChatbot component instead.
import ClientSideChatbot from './components/ClientSideChatbot';

export default function Home() {
  return (
    // The main container styling remains the same
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      
      <div className="w-full max-w-4xl text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          AI-Powered Support Center
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Welcome to E-ComAssist. Get instant answers about your orders, returns, and shipping policies from our 24/7 virtual assistant.
        </p>
        
        <div className="mt-12">
          <p className="text-gray-400">
            👇 Click the chat bubble to get started
          </p>
        </div>
      </div>

      {/* 3. Simply render the new component. */}
      <ClientSideChatbot />
    </main>
  );
}