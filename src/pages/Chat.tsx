import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Info } from 'lucide-react';
import { getCivicResponse } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const loadChatHistory = async () => {
    const userId = dbService.getUserId();
    const sessionId = `chat_${userId}`;
    try {
      const history = await dbService.getChatHistory(sessionId);
      if (history && history.length > 0) {
        setMessages(history.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content
        })));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userId = dbService.getUserId();
    const sessionId = `chat_${userId}`;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getCivicResponse(input);
      const assistantMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: response || "I'm sorry, I couldn't process that." 
      };
      setMessages(prev => [...prev, assistantMsg]);
      
      // Save to Firestore with user-specific session
      await dbService.addChatMessage(sessionId, userMsg);
      await dbService.addChatMessage(sessionId, assistantMsg);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/40 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-white/40 backdrop-blur-md flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm block">Gemini AI Assistant</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold rounded-lg uppercase tracking-wider border border-indigo-200">English</button>
           <button className="px-3 py-1.5 bg-white/50 text-slate-600 text-[9px] font-bold rounded-lg uppercase tracking-wider border border-white/60">ಕನ್ನಡ</button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/80 p-8 rounded-[40px] border border-white shadow-xl flex items-center justify-center"
            >
              <Bot className="h-16 w-16 text-indigo-600" />
            </motion.div>
            <div className="max-w-sm space-y-2">
              <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Namaskara, Bengaluru</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect with our Smart Civic Navigator. Ask anything about your city services.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-md">
              {['Property Tax help', 'Report Garbage', 'BESCOM helpline', 'Traffic fines'].map(topic => (
                <button 
                  key={topic}
                  onClick={() => setInput(topic)}
                  className="px-5 py-3 bg-white/80 border border-white rounded-[20px] text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 hover:border-indigo-500 hover:text-indigo-700 hover:bg-white transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className={cn(
                "flex items-start gap-4",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-xl border border-white/40 backdrop-blur-md",
                m.role === 'user' ? "bg-white/60 text-slate-800" : "bg-indigo-600 text-white"
              )}>
                {m.role === 'user' ? <UserIcon size={18} /> : <Bot size={18} />}
              </div>
              <div className={cn(
                "max-w-[75%] p-5 rounded-[28px] text-sm leading-relaxed shadow-lg border backdrop-blur-xl",
                m.role === 'user' 
                  ? "bg-indigo-600 text-white border-indigo-500 rounded-tr-none" 
                  : "bg-white/70 border-white text-slate-800 rounded-tl-none whitespace-pre-wrap"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg border border-indigo-400">
              <Bot size={18} />
            </div>
            <div className="bg-white/70 border border-white p-5 rounded-[28px] rounded-tl-none shadow-lg backdrop-blur-xl">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 bg-white/40 backdrop-blur-xl border-t border-white/40 relative z-10">
        <div className="relative flex items-center gap-4 max-w-4xl mx-auto w-full">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about BBMP, BESCOM, taxes..."
              className="w-full bg-white border border-white/60 rounded-[28px] py-4 px-6 text-sm pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-xl transition-all placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 disabled:bg-slate-300 hover:scale-105 active:scale-95 transition-all"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <p className="text-[9px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest opacity-60">AI can make mistakes. Verify important civic details.</p>
      </div>
    </div>
  );
}
