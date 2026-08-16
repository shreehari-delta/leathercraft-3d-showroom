"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User, RefreshCw, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
  timestamp: string;
}

const presetPrompts = [
  "How should I care for Tuscan calfskin patina?",
  "What is the sizing fit compared to standard UK/US lasts?",
  "Explain the Goodyear Welt resoling longevity.",
  "Which shoe finish pairs best with a charcoal bespoke suit?"
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Benvenuto. I am your Sartorial Concierge. How may I assist your collection acquisition, leather care, or sizing today?",
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scoped internal container scroll (prevents window jumping)
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    const currentHistory = [...messages, userMessage];
    setMessages(currentHistory);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: currentHistory.slice(1, -1)
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "No response received from the concierge.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: replyText,
          timestamp: "Just now"
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: `Connection failed: ${err.message}`,
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        sender: "assistant",
        text: "Conversation refreshed. How may I assist your bespoke footwear inquiries?",
        timestamp: "Just now"
      }
    ]);
  };

  return (
    <section className="relative w-full py-28 px-6 md:px-16 bg-background border-t border-white/5 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Virtual Concierge
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-accent-cream leading-tight">
                Inquire With Our <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-gold via-accent-copper to-accent-bronze">
                  AI Specialist.
                </span>
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
              Receive bespoke fit advice, archival leather care guidance, and stylistic curation tailored to your collection.
            </p>
          </div>
        </ScrollReveal>

        {/* Chat Console */}
        <ScrollReveal>
          <div className="bg-[#151311] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-155">
            
            {/* Sidebar Suggestions */}
            <div className="w-full md:w-1/3 bg-black/40 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
                    Suggested Consultations
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-accent-gold hover:bg-white/5 transition-colors cursor-pointer"
                    title="Reset Chat"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {presetPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left text-xs p-3.5 rounded-xl border border-white/5 bg-white/2 text-neutral-300 hover:text-accent-gold hover:border-accent-gold/40 hover:bg-accent-gold/4 transition-all cursor-pointer leading-relaxed"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-[11px] text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
                <span>Synchronized with Atelier Database</span>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="w-full md:w-2/3 flex flex-col justify-between bg-charcoal/30">
              
              {/* Message Feed Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => {
                    const isBot = msg.sender === "assistant";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex items-start gap-3.5 ${isBot ? "justify-start" : "justify-end"}`}
                      >
                        {isBot && (
                          <div className="w-8 h-8 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold shrink-0 mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div
                          className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                            isBot
                              ? "bg-white/4 border border-white/10 text-neutral-200"
                              : "bg-accent-gold text-black font-medium border border-accent-gold shadow-lg shadow-accent-gold/10"
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>

                        {!isBot && (
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-neutral-500 text-xs font-mono"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                      <Bot className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <span>Concierge is drafting consultation...</span>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-4 md:p-6 border-t border-white/10 bg-black/40 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask regarding sizing, construction, or showroom availability..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-accent-gold/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-full bg-accent-gold text-black flex items-center justify-center hover:bg-accent-cream disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-lg shadow-accent-gold/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}