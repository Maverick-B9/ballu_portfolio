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
      text: "ACCESS_GRANTED: I am Balaram's AI interface. I can provide technical specifications on his projects, engineering expertise, and leadership impact. How can I assist you today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
      return "Balaram B is an AI Systems Engineer focused on building intelligent platforms, developer tools, and scalable machine learning infrastructure.";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('system') || lowerMessage.includes('build')) {
      return "Key Systems:\n- Krishi Sarathi: AI Agri-Platform (90.7% accuracy)\n- Digital Forensic Tool: Automated evidence analysis\n- Verto: AI Quiz Generator\n- Real-Time Auction: 2500+ concurrent users";
    } else if (lowerMessage.includes('tech') || lowerMessage.includes('skill')) {
      return "Expertise:\n- ML: TensorFlow, PyTorch, YOLOv8\n- Languages: Python, TypeScript, C++\n- Backend: Node.js, Flask, PostgreSQL";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "Communication Protocols:\n📧 ballubalaram2003@gmail.com\n💼 linkedin.com/in/balaram-b-022ba031b";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "You can download the latest technical resume here:\n📄 [Balaram_B_Resume.pdf](/Balaram_B_Resume.pdf)";
    } else {
      return "I can provide details on Balaram's technical projects, leadership roles, stack expertise, or contact information.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getBotResponse(input), sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-8 right-8 w-[380px] h-[600px] z-[120] flex flex-col rounded-3xl bg-[#111111]/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6366F1] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Ballu AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">Systems Online</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#9CA3AF] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${message.sender === 'user'
                  ? 'bg-[#6366F1] text-white font-medium'
                  : 'bg-white/5 text-[#D1D5DB] border border-white/5'
                  }`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1 h-1 bg-[#6366F1] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <div className="flex gap-2 p-1.5 bg-black/20 rounded-2xl border border-white/5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about systems..."
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-[#9CA3AF]/40"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] disabled:opacity-20 disabled:hover:bg-[#6366F1] transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

