import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', role: 'model', text: "Hi. I'm Oreoluwa's digital twin. Ask me anything about his work." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    // Add placeholder for model response
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', isThinking: true }]);

    try {
      const stream = await sendMessageStream(userMessage.text);
      
      let fullText = '';
      
      for await (const chunk of stream) {
         // @ts-ignore - chunk type inference handling
         const text = chunk.text; 
         if (text) {
           fullText += text;
           setMessages(prev => 
             prev.map(msg => 
               msg.id === modelMessageId 
                 ? { ...msg, text: fullText, isThinking: false } 
                 : msg
             )
           );
         }
      }
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: "I'm having trouble connecting right now. Please try again later.", isThinking: false } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-neutral-900 dark:bg-white text-white dark:text-black p-4 rounded-full shadow-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              data-hover="true"
            >
              <Sparkles className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Oreoluwa AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-black rounded-br-none'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    {msg.isThinking && (
                       <span className="inline-flex gap-1 ml-1 items-center">
                         <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                         <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                         <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                       </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full py-3 px-4 pr-12 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-shadow placeholder:text-neutral-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-50 disabled:hover:text-neutral-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;