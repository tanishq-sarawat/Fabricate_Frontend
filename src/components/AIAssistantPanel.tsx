import React, { useState } from 'react';
import { Menu, X, Paperclip, ArrowUp, Sparkles, Bot } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AIAssistantPanelProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Create a report to compare P&L between the current and previous month',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Analysis complete: Monthly gross margin improved by +3.4% driven by lower packaging resin costs and optimized freight consolidation across Midwest facilities. Detailed variance table generated.`,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <aside className="w-80 shrink-0 border-r border-[#e8e8e5] bg-white flex flex-col h-[calc(100vh-3.5rem)] font-sans select-none z-20 transition-all duration-200">
      {/* 1. Header: Matches Screenshot (☰ Keychain/Fabricate AI  ✕) */}
      <div className="h-12 px-4 border-b border-[#e8e8e5] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-[#111111]">
          <Menu size={16} className="text-[#666660] cursor-pointer hover:text-[#111111]" />
          <span className="font-medium text-xs tracking-tight text-[#111111]">
            Fabricate AI
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-[#888880] hover:text-[#111111] hover:bg-[#f4f4f2] transition-colors cursor-pointer"
          title="Close AI Assistant"
        >
          <X size={15} />
        </button>
      </div>

      {/* 2. Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            {msg.sender === 'user' ? (
              // Exact soft yellow bubble from screenshot
              <div className="bg-[#fef9c3] border border-[#fef08a] rounded-2xl p-3.5 text-xs font-normal text-[#111111] leading-relaxed shadow-2xs">
                {msg.text}
              </div>
            ) : (
              // AI Response bubble
              <div className="bg-[#f8f8f7] border border-[#e8e8e5] rounded-2xl p-3.5 text-xs text-[#111111] leading-relaxed shadow-2xs mt-2">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#888880] mb-1.5 uppercase tracking-wider">
                  <Sparkles size={11} className="text-[#f5cb39]" />
                  <span>Fabricate Intelligence</span>
                </div>
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator: 3 dots matching screenshot */}
        {isTyping && (
          <div className="flex items-center gap-1.5 px-3 py-2 text-[#888880]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#888880] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#888880] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#888880] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* 3. Bottom Prompt Input Pill (Matching Screenshot: Write a message... 📎 ↑) */}
      <div className="p-3 border-t border-[#e8e8e5] bg-white shrink-0">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 bg-white border border-[#e8e8e5] rounded-full px-3 py-1.5 shadow-2xs focus-within:border-[#f5cb39] transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-transparent text-xs text-[#111111] placeholder:text-[#888880] focus:outline-none"
          />
          <button
            type="button"
            className="text-[#888880] hover:text-[#111111] transition-colors p-1 cursor-pointer"
            title="Attach file"
          >
            <Paperclip size={14} />
          </button>
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-6 h-6 rounded-full bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 shrink-0 shadow-2xs"
            title="Send"
          >
            <ArrowUp size={13} strokeWidth={2.4} />
          </button>
        </form>
      </div>
    </aside>
  );
};

export default AIAssistantPanel;
