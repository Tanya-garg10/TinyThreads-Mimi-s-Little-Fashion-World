import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Trash2, Heart, Sparkles, Send, Check } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

interface GuestbookNote {
  id: string;
  author: string;
  message: string;
  sticker: string;
  date: string;
  isCurrentUser?: boolean;
}

interface GuestbookSectionProps {
  nightMode: boolean;
}

const DEFAULT_NOTES: GuestbookNote[] = [
  {
    id: 'demo-1',
    author: 'Aria & Baby Oliver',
    message: 'The cloud-soft onesie is Oliver’s favorite naptime outfit! We love Mimi’s little studio story ♡',
    sticker: '☁️',
    date: 'Yesterday'
  },
  {
    id: 'demo-2',
    author: 'Grandma Clara',
    message: 'Reminds me of my own grandmother’s sewing box in the attic. So gentle and beautifully crafted.',
    sticker: '🧵',
    date: '2 days ago'
  },
  {
    id: 'demo-3',
    author: 'Priya & Kabir',
    message: 'Kabir wore the sage overalls to his first park picnic and crawled through the daisies!',
    sticker: '🌿',
    date: '3 days ago'
  }
];

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ nightMode }) => {
  const [notes, setNotes] = useState<GuestbookNote[]>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_guestbook');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_NOTES;
  });

  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('🐰');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const stickers = ['🐰', '🎀', '☁️', '⭐', '🧵', '🌸', '🧸'];

  useEffect(() => {
    try {
      localStorage.setItem('tinythreads_guestbook', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authorName.trim().length < 2) {
      setError('Please provide a little name (at least 2 letters)!');
      return;
    }
    if (message.trim().length < 5) {
      setError('Please write at least 5 gentle words for Mimi!');
      return;
    }

    audioManager.playClickSound();

    const newNote: GuestbookNote = {
      id: `note-${Date.now()}`,
      author: authorName.trim(),
      message: message.trim(),
      sticker: selectedSticker,
      date: 'Just now',
      isCurrentUser: true
    };

    setNotes([newNote, ...notes]);
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleDeleteNote = (id: string) => {
    audioManager.playClickSound();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <section id="guestbook" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-rounded font-bold tracking-wider uppercase mb-3 border ${
              nightMode
                ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
                : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Mimi's Guestbook Wall</span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Leave Mimi a <span className="italic text-[#A34063]">little note.</span>
          </h2>

          <p
            className={`font-sans text-base sm:text-lg ${
              nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
            }`}
          >
            Pin a sweet thought, nursery memory, or wish onto Mimi’s studio bunting board.
          </p>

          <div className="w-24 h-1 bg-[#F5D88B] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Note Form */}
          <div className="lg:col-span-5">
            <div
              className={`p-6 sm:p-8 rounded-3xl border-3 shadow-md relative ${
                nightMode
                  ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                  : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-[#A34063]/30">
                <h3 className="font-serif font-bold text-lg">Pin Your Note 📌</h3>
                <span className="text-xs font-hand text-[#A34063] font-bold">
                  Browser-local demo wall
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1">
                    Your Name / Baby’s Name:
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Mama Mia & Baby Leo"
                    maxLength={40}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans border focus:outline-none ${
                      nightMode
                        ? 'bg-[#1D1226] border-[#432A57] text-white'
                        : 'bg-white border-[#EABAC8] text-[#5C4033]'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1">
                    Your Little Note for Mimi (max 160 characters):
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a wish or favorite baby moment..."
                    maxLength={160}
                    rows={3}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans border resize-none focus:outline-none ${
                      nightMode
                        ? 'bg-[#1D1226] border-[#432A57] text-white'
                        : 'bg-white border-[#EABAC8] text-[#5C4033]'
                    }`}
                  />
                  <div className="text-[11px] opacity-60 text-right mt-0.5">
                    {message.length}/160
                  </div>
                </div>

                {/* Sticker choice */}
                <div>
                  <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1.5">
                    Choose a Sticker Stamp:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {stickers.map((stk) => (
                      <button
                        key={stk}
                        type="button"
                        onClick={() => setSelectedSticker(stk)}
                        className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-lg transition-transform cursor-pointer ${
                          selectedSticker === stk
                            ? 'bg-[#F7DDE5] border-[#A34063] scale-110 shadow-xs'
                            : 'bg-white/70 border-[#EABAC8] hover:scale-105'
                        }`}
                      >
                        {stk}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-rounded font-bold text-[#A34063]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#5C4033]"
                >
                  {submitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Pinned with Love!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Pin Note to Mimi’s Wall ♡</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Note Wall Bunting */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-5 rounded-2xl border-2 shadow-xs relative transition-transform hover:-translate-y-1 ${
                    nightMode
                      ? 'bg-[#281B34] border-[#432A57] text-[#F3E8FF]'
                      : 'bg-white border-[#F7DDE5] text-[#5C4033]'
                  }`}
                >
                  {/* Washi tape graphic at top */}
                  <div className="w-16 h-3 bg-[#F5D88B]/60 border-t border-b border-dashed border-[#5C4033]/30 mx-auto -mt-6 mb-3 transform -rotate-2" />

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">{note.sticker}</span>
                      <h4 className="font-rounded font-bold text-sm tracking-tight">
                        {note.author}
                      </h4>
                    </div>

                    {note.isCurrentUser && (
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        aria-label="Delete my note"
                        className="text-stone-400 hover:text-[#A34063] p-1 cursor-pointer"
                        title="Delete your demo note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <p className="font-serif italic text-sm leading-relaxed mb-3">
                    “{note.message}”
                  </p>

                  <div className="pt-2 border-t border-dashed border-[#A34063]/20 flex items-center justify-between text-[10px] font-mono opacity-65">
                    <span>{note.date}</span>
                    <span className="font-hand text-[#A34063] font-bold text-xs">Mimi Approved ♡</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
