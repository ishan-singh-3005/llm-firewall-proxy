import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { ChatBubble } from "@/components/ChatBubble";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MainContent />
      </main>
      
      {/* Chat Bubbles */}
      <ChatBubble isProtected={false} position="left" />
      <ChatBubble isProtected={true} position="right" />
    </div>
  );
};

export default Index;
