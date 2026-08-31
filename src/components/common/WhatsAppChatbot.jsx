import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ExternalLink,
  CheckCheck
} from 'lucide-react';

const quickPrompts = [
  "What services do you offer?",
  "How much does a project cost?",
  "How fast can you build our MVP?",
  "Can you build autonomous AI agents?",
  "How do I start a project?"
];

const knowledgeBase = [
  {
    keywords: ['service', 'services', 'offer', 'do you do', 'what do you build'],
    response: "BuildZone provides 8 specialized engineering capabilities:\n• Web & Enterprise Cloud Platforms (React, Next.js)\n• Mobile Applications (Flutter & React Native)\n• Custom Software & Enterprise ERPs\n• Applied AI & Multi-Agent LLM Systems (RAG, Python)\n• SaaS Multi-Tenant Engineering\n• Headless E-Commerce Systems\n• Cloud & DevOps (AWS, Kubernetes, CI/CD)\n• UI/UX Product Design (Figma systems)"
  },
  {
    keywords: ['cost', 'price', 'pricing', 'rate', 'how much', 'budget', 'quote'],
    response: "Our pricing is transparent and outcome-driven:\n• Dedicated Engineering Pods: Fixed monthly sprint rates starting at $4,500/month.\n• Fixed-Scope Projects: Milestone-based billing with clear deliverables and zero scope creep.\n• Custom AI & SaaS MVPs: Fast-track launches typically between $8,000 – $25,000 depending on complexity.\n\nWould you like to book a 15-min discovery call to get an exact quote?"
  },
  {
    keywords: ['fast', 'time', 'timeline', 'how long', 'duration', 'weeks', 'mvp'],
    response: "We pride ourselves on engineering velocity:\n• Rapid Prototypes & MVPs: 2 – 4 weeks\n• Production-Grade Web/Mobile Apps: 6 – 10 weeks\n• Complex Enterprise Systems: Built in agile 2-week continuous delivery sprints with bi-weekly deployments."
  },
  {
    keywords: ['ai', 'agent', 'rag', 'llm', 'machine learning', 'gpt', 'claude', 'bot'],
    response: "Yes! We build production-ready enterprise AI systems:\n• Autonomous Multi-Agent Reasoning Workflows\n• High-precision RAG over your private internal documents\n• Private, zero-data-leakage enterprise LLM deployments\n• Workflow automation connecting CRM, ERPs, and APIs."
  },
  {
    keywords: ['start', 'contact', 'hire', 'call', 'book', 'begin', 'process'],
    response: "Getting started is seamless:\n1. Click 'Start a Project' or send us your requirements.\n2. We schedule a 30-min Technical Discovery Call within 24 hours.\n3. We provide a detailed Architecture Blueprint & fixed estimate in 48 hours.\n4. Sprint kick-off with dedicated senior engineers!"
  },
  {
    keywords: ['tech', 'stack', 'technologies', 'tools', 'languages'],
    response: "Our modern enterprise stack includes:\n• Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS\n• Backend & APIs: Node.js, Python, FastAPI, Go, GraphQL\n• Databases: PostgreSQL, TimescaleDB, Redis, Pinecone\n• Cloud: AWS, GCP, Docker, Kubernetes, Terraform\n• AI: LangChain, LlamaIndex, PyTorch, OpenAI, Anthropic"
  }
];

export const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! Welcome to BuildZone. I'm your AI Engineering Assistant. How can I help accelerate your project today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Generate intelligent AI response based on keywords
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedResponse = null;

      for (const item of knowledgeBase) {
        if (item.keywords.some(k => lower.includes(k))) {
          matchedResponse = item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `Thanks for asking about "${text}"! We engineer custom software, scalable cloud systems, and enterprise AI tailored to your exact business needs.\n\nWould you like to connect directly with our engineering team on WhatsApp or schedule a free technical consultation?`;
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: matchedResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    const defaultText = encodeURIComponent("Hello BuildZone Team! I visited your website and would like to discuss a software/AI development project.");
    window.open(`https://wa.me/15550192834?text=${defaultText}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      
      {/* 1. Compact Ergonomic Chatbot Drawer (Fits comfortably below header) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[92vw] sm:w-[360px] md:w-[370px] h-[430px] sm:h-[460px] max-h-[68vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scaleUp origin-bottom-right">
          
          {/* Vibrant Royal Blue Header */}
          <div className="bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#0284C7] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-blue-400/30 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white text-[#0066FF] flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full"></span>
              </div>
              <div>
                <div className="font-display font-black text-sm text-white flex items-center gap-1.5 leading-tight">
                  <span>BuildZone AI Assistant</span>
                  <Sparkles className="w-3 h-3 text-cyan-200" />
                </div>
                <div className="font-mono text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Online • Instant Reply</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* WhatsApp Direct Action Bar */}
          <div className="bg-emerald-50/90 border-b border-emerald-100 px-3.5 py-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-800 font-bold flex items-center gap-1">
              <span>Direct WhatsApp Channel</span>
            </span>
            <button
              onClick={handleWhatsAppRedirect}
              className="px-2 py-0.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-[9px] font-bold uppercase rounded transition-all flex items-center gap-1 shadow-2xs"
            >
              <span>Open WhatsApp</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto bg-[#F8FAFC] space-y-3 text-xs leading-relaxed">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl p-2.5 sm:p-3 whitespace-pre-line shadow-2xs ${
                      isBot
                        ? 'bg-white border border-slate-200 text-[#0B1938] rounded-tl-xs'
                        : 'bg-[#0066FF] text-white rounded-tr-xs font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                    <span>{msg.time}</span>
                    {!isBot && <CheckCheck className="w-3 h-3 text-[#0066FF]" />}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1 p-2.5 bg-white border border-slate-200 rounded-xl rounded-tl-xs max-w-[70px] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#0066FF] rounded-full font-mono text-[9.5px] font-semibold transition-all shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about software & AI..."
              className="flex-1 bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-[#0B1938] placeholder-slate-400 rounded-lg focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                inputText.trim()
                  ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Floating WhatsApp Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="Open WhatsApp AI Assistant"
      >
        {/* Pulsing Ripple Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping"></span>
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366] opacity-60"></span>

        {/* WhatsApp Icon */}
        <div className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.815 2.796.815 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm9.969 5.766c0 5.519-4.481 10-10 10-1.745 0-3.385-.45-4.819-1.238l-7.181 1.884 1.916-6.997c-.85-1.488-1.339-3.21-1.339-5.049 0-5.519 4.481-10 10-10s10 4.481 10 10z"/>
            </svg>
          )}
        </div>

        {/* Unread Online Notification Pill when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0066FF] border-2 border-white text-[9px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        )}

        {/* Hover Tooltip on Desktop */}
        {!isOpen && (
          <div className="hidden md:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 bg-[#0B1938] text-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap items-center gap-1.5 pointer-events-none animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="font-mono text-xs font-bold">Ask AI or Chat on WhatsApp</span>
          </div>
        )}
      </button>

    </div>
  );
};

export default WhatsAppChatbot;
