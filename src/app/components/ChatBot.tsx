import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Terminal } from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "SYSTEM_ACCESS_GRANTED: I am Balaram's AI interface. I can provide technical specifications on his projects, leadership impact, and engineering expertise. How shall we proceed?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Who is Balaram B?',
    'Show project systems',
    'Tech stack archive',
    'Leadership telemetry',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
      return "Balaram B is an AI Systems Engineer and Computer Science student. He is the Secretary of Stack Forge Coding Club and specializing in building intelligent systems that scale.";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('system')) {
      return "Core Systems Built:\n1. Digital Forensic Tool (ML/CV)\n2. Krishi Saathi (Agricultural AI)\n3. Maasakhi (Safety Platform)\n4. Live Auction System (2500+ participants)\n5. Verto & LinkedIn Collab Projects.";
    } else if (lowerMessage.includes('tech') || lowerMessage.includes('skill')) {
      return "Intelligence Archive:\n- Languages: Python, Java, C, MySQL\n- Domains: Machine Learning, Computer Vision, AI Systems\n- Frameworks: Flask, TensorFlow, React.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "Direct Connectivity:\n📧 ballubalaram2003@gmail.com\n💼 linkedin.com/in/balaram-b-022ba031b\n🔗 github.com/Maverick-B9";
    } else if (lowerMessage.includes('leadership') || lowerMessage.includes('event')) {
      return "Leadership Telemetry:\n- Secretary of Stack Forge Coding Club\n- 12+ Technical Events Managed\n- 300+ Developer Community Mentored\n- 2500+ Students Engaged in Live Events.";
    } else {
      return "QUERY_UNRECOGNIZED. I can discuss project architectures, leadership metrics, or direct contact protocols. Please specify your request.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 1,
        text: getBotResponse(input),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 right-8 w-[400px] h-[600px] z-[110] flex flex-col rounded-[2.5rem] bg-[#0B0B0F]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 bg-gradient-to-r from-[#4F9DFF]/5 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4F9DFF] flex items-center justify-center shadow-[0_0_15px_rgba(79,157,255,0.4)]">
                  <Terminal className="w-6 h-6 text-[#0B0B0F]" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-widest text-sm uppercase">BALARAM_AI</h3>
                  <p className="text-[#4F9DFF] text-[10px] font-mono tracking-widest">v1.2 // SECURE_LINE</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-5 rounded-[1.5rem] font-medium text-sm leading-relaxed ${message.sender === 'user'
                      ? 'bg-[#4F9DFF] text-[#0B0B0F]'
                      : 'bg-white/5 text-white/80 border border-white/5'
                    }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-full flex gap-1.5 px-6 border border-white/5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1 h-1 bg-[#4F9DFF] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-8 border-t border-white/5">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="TYPE SYSTEM QUERY..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 text-xs font-mono uppercase tracking-widest outline-none focus:border-[#4F9DFF]/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-14 h-14 rounded-2xl bg-[#4F9DFF] hover:opacity-90 disabled:opacity-20 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(79,157,255,0.3)]"
              >
                <Send className="w-5 h-5 text-[#0B0B0F]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

