import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import { subscribeToChatMessages, sendChatMessage, saveMessagesToLocal, type ChatMessage } from '../../services/chatService';

interface TalkToMimiWidgetProps {
  nightMode: boolean;
  onNavigateToTab?: (tab: string) => void;
}

export const TalkToMimiWidget: React.FC<TalkToMimiWidgetProps> = ({ nightMode, onNavigateToTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'mimi',
      text: 'Hello little dreamer! ♡ I am Mimi. Ask me about my tiny atelier, baby collections, or outfit ideas!',
      time: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Subscribe to Firebase chat messages
  useEffect(() => {
    const unsubscribe = subscribeToChatMessages((fetchedMessages) => {
      if (fetchedMessages.length > 0) {
        setMessages(fetchedMessages);
      }
    });
    return unsubscribe;
  }, []);

  const quickQuestions = [
    { label: 'Who are you, Mimi? 🐰', query: 'Tell me about yourself, Mimi!' },
    { label: 'Your 3 Collections 👗', query: 'What are your baby clothing collections?' },
    { label: 'How does Tiny Tailor work? ✂️', query: 'How do I customize an outfit?' },
    { label: 'Any secret discount? 🎁', query: 'Do you have a secret discount code?' },
    { label: 'Tell me a bedtime story 🌙', query: 'Can you tell me a bedtime story?' }
  ];

  const generateMimiResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('who') || q.includes('about') || q.includes('yourself') || q.includes('mimi')) {
      return 'I am Mimi! A bunny with big fashion dreams. I turn leftover scraps of organic cotton, linen, and lavender muslin into keepsake outfits for little adventurers!';
    }
    if (q.includes('collection') || q.includes('product') || q.includes('clothes') || q.includes('shop')) {
      return 'I have three sweet collections! 1) Cloud-Soft Everyday for cuddly slow mornings, 2) Little Explorer with sturdy play overalls, and 3) Dreamy Bedtime with modal sleepwear and starlight sleep sacks!';
    }
    if (q.includes('tailor') || q.includes('custom') || q.includes('outfit') || q.includes('builder')) {
      return 'In my Tiny Tailor Studio, you can pick a silhouette (onesie, romper, or pajamas), pick a pastel dye color, and add an embroidered bunny hat or cloud patch. Click "Surprise Me!" if you want me to style one for you!';
    }
    if (q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('coupon') || q.includes('secret') || q.includes('egg')) {
      return 'Pst! If you find my hidden secret sewing box, use code TINYMAGIC15 in your Tiny Bag for 15% off! Hint: Click the golden needle in the hero section! 🪡';
    }
    if (q.includes('bedtime') || q.includes('story') || q.includes('cloud') || q.includes('lullaby')) {
      return 'Have you read my interactive storybook "Mimi and the Little Cloud"? Turn to the Storybook tab or turn on my Lullaby Music Box for sweet chimes! 🎵';
    }
    if (q.includes('fabric') || q.includes('cotton') || q.includes('linen') || q.includes('safe')) {
      return 'We only use GOTS-certified combed cotton, breathable bamboo muslin, and flax linen with nickel-free snaps and soft flat seams so baby never gets pinched!';
    }

    return 'That sounds wonderful! I am stitching new little dreams right now. Would you like to explore the Collections or try the Tiny Tailor studio? ♡';
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    audioManager.playClickSound();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Save user message to Firebase
    sendChatMessage({
      sender: 'user',
      text: text.trim(),
      time: 'Now'
    });

    // Simulate gentle bunny typing delay
    setTimeout(() => {
      const replyText = generateMimiResponse(text);
      const mimiMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mimi',
        text: replyText,
        time: 'Just now'
      };
      setMessages((prev) => [...prev, mimiMsg]);
      audioManager.playTone(659.25, 0.2, 0.08); // pleasant chime

      // Save Mimi's response to Firebase
      sendChatMessage({
        sender: 'mimi',
        text: replyText,
        time: 'Just now'
      });

      // Fallback: save to localStorage
      saveMessagesToLocal([...messages, userMsg, mimiMsg]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            audioManager.playClickSound();
            setIsOpen(true);
          }}
          aria-label="Talk with Mimi"
          className="group px-4 py-3 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-sm shadow-xl flex items-center gap-2.5 border-2 border-[#5C4033] cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-[#F7DDE5] border border-[#5C4033] flex items-center justify-center text-base">
            🐰
          </div>
          <span>Talk to Mimi</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`w-[340px] sm:w-[380px] h-[500px] rounded-3xl border-3 shadow-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 ${
            nightMode
              ? 'bg-[#1F1426] border-[#5E3B7A] text-[#F3E8FF]'
              : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-dashed border-[#A34063]/30 flex items-center justify-between bg-white/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] flex items-center justify-center text-lg">
                🐰
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <span>Mimi Bunny</span>
                  <span className="text-[10px] font-hand font-bold text-[#A34063]">
                    • Little Tailor
                  </span>
                </h4>
                <span className="text-[10px] opacity-75 font-sans">
                  Rule-based companion • Online
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                audioManager.playClickSound();
                setIsOpen(false);
              }}
              aria-label="Close chat with Mimi"
              className="p-1.5 rounded-full border border-current hover:opacity-70 transition-opacity cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#A34063] text-white rounded-br-none'
                      : nightMode
                      ? 'bg-[#291B33] border border-[#432A57] text-[#F3E8FF] rounded-bl-none'
                      : 'bg-white border border-[#EABAC8] text-[#5C4033] rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1 font-mono">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2.5 border-t border-dashed border-[#A34063]/20 bg-white/10 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-rounded font-semibold bg-white/80 dark:bg-stone-800 border border-[#EABAC8] hover:bg-[#F7DDE5] transition-colors cursor-pointer text-[#5C4033] dark:text-[#D8C7E8]"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-dashed border-[#A34063]/30 flex items-center gap-2 bg-white/30"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Mimi anything..."
              className={`flex-1 px-3.5 py-2 rounded-full text-xs font-sans border focus:outline-none ${
                nightMode
                  ? 'bg-[#180E21] border-[#432A57] text-white placeholder-stone-400 focus:border-[#A34063]'
                  : 'bg-white border-[#EABAC8] text-[#5C4033] placeholder-stone-400 focus:border-[#A34063]'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-full bg-[#A34063] disabled:opacity-40 text-white cursor-pointer hover:bg-[#852E4D]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
