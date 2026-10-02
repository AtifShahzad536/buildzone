import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ExternalLink,
  CheckCheck
} from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

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
  const messagesContainerRef = useRef(null);

  const scrollToBottom = (smooth = true) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Isolate scroll within the container without scrolling the window
      setTimeout(() => scrollToBottom(false), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length > 1) {
      scrollToBottom(true);
    }
  }, [messages, isTyping]);

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
    window.open(`https://wa.me/92105464116?text=${defaultText}`, '_blank');
  };


  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      
      {/* 1. Compact Ergonomic Chatbot Drawer (Cyber Dark Theme) */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-[92vw] sm:w-[360px] md:w-[370px] h-[440px] sm:h-[470px] max-h-[70vh] bg-[#0A1128] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-slate-800 flex flex-col overflow-hidden animate-scaleUp origin-bottom-right overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          
          {/* Vibrant Cyber Navy & Blue Header */}
          <div className="bg-gradient-to-r from-[#0B1528] via-[#0052CC] to-[#0066FF] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#060B18] border border-blue-400/40 text-[#00F0FF] flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#060B18] rounded-full"></span>
              </div>
              <div>
                <div className="font-display font-black text-sm text-white flex items-center gap-1.5 leading-tight">
                  <span>BuildZone AI Assistant</span>
                  <Sparkles className="w-3 h-3 text-[#00F0FF]" />
                </div>
                <div className="font-mono text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Online • Instant Reply</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* WhatsApp Direct Action Bar */}
          <div className="bg-[#070E1C] border-b border-slate-800/80 px-3.5 py-2 flex items-center justify-between">
            <span className="font-mono text-[10.5px] text-emerald-400 font-bold flex items-center gap-1.5">
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-current" />
              <span>Direct WhatsApp Channel</span>
            </span>
            <button
              onClick={handleWhatsAppRedirect}
              className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-[10px] font-bold uppercase rounded transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Open WhatsApp</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Messages Container (Scroll-Isolated) */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-3.5 overflow-y-auto overscroll-contain bg-[#060B18] space-y-3 text-xs leading-relaxed"
          >
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl p-2.5 sm:p-3 whitespace-pre-line shadow-2xs font-sans ${
                      isBot
                        ? 'bg-[#0F1D38] border border-slate-800 text-slate-200 rounded-tl-xs leading-relaxed'
                        : 'bg-[#0066FF] text-white rounded-tr-xs font-medium shadow-md shadow-blue-500/20 leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 mt-1 px-1 flex items-center gap-1">
                    <span>{msg.time}</span>
                    {!isBot && <CheckCheck className="w-3 h-3 text-[#00F0FF]" />}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl rounded-tl-xs max-w-[70px] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 bg-[#070E1C] border-t border-slate-800/80 overflow-x-auto overscroll-contain whitespace-nowrap flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 bg-[#0B1528] hover:bg-[#0066FF]/20 border border-slate-800 hover:border-[#00F0FF]/50 text-slate-300 hover:text-[#00F0FF] rounded-full font-mono text-[9.5px] font-semibold transition-all shrink-0 cursor-pointer"
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
            className="p-2.5 bg-[#070E1C] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about software & AI..."
              className="flex-1 bg-[#0B1528] border border-slate-800 focus:border-[#0066FF] px-3 py-1.5 text-xs text-white placeholder-slate-500 rounded-lg focus:outline-none focus:bg-[#0E1B33] transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                inputText.trim()
                  ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Floating WhatsApp Trigger Button (Prominent & Clear on Mobile/Desktop) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="Open WhatsApp AI Assistant"
      >
        {/* Pulsing Ripple Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366] opacity-60 pointer-events-none"></span>

        {/* WhatsApp Icon */}
        <div className="relative z-10 flex items-center justify-center transition-transform duration-300">
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white drop-shadow-md" />
          )}
        </div>

        {/* Unread Online Notification Pill when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-[#0066FF] border-2 border-white text-[10px] font-black text-white items-center justify-center shadow-xs">
              1
            </span>
          </span>
        )}

        {/* Hover Tooltip on Desktop (Positioned cleanly to the left of the button) */}
        {!isOpen && (
          <div className="hidden md:group-hover:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 bg-[#0B1938] text-white px-3.5 py-2 rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap items-center gap-2 pointer-events-none animate-fadeIn z-30">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_6px_#25D366]"></span>
            <span className="font-sans text-xs font-bold text-slate-100 tracking-normal">
              Ask AI or Chat on <span className="text-[#25D366]">WhatsApp</span>
            </span>
            {/* Triangular Arrow Pointer on Right Side */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-[#0B1938] border-r border-t border-slate-700/80 rotate-45 pointer-events-none"></div>
          </div>
        )}
      </button>

    </div>
  );
};

export default WhatsAppChatbot;
