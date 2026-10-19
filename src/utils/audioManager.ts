/**
 * Web Audio API synthesizer for Mimi's Lullaby Music Box & UI Click Sounds
 * 100% self-contained, no external dependencies, no audio files to load.
 */

type StateChangeListener = (isPlaying: boolean) => void;

class AudioManager {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private musicNoteIndex: number = 0;
  private isMusicPlaying: boolean = false;
  private isSoundMuted: boolean = false; // Enabled for music on first interaction
  private listeners: Set<StateChangeListener> = new Set();

  private lullabyMelody: { note: number; duration: number }[] = [
    // Gentle original music box sequence: "Mimi's Nursery Lullaby"
    { note: 523.25, duration: 0.6 }, // C5
    { note: 659.25, duration: 0.6 }, // E5
    { note: 783.99, duration: 0.8 }, // G5
    { note: 659.25, duration: 0.4 }, // E5
    { note: 880.00, duration: 0.7 }, // A5
    { note: 783.99, duration: 0.9 }, // G5
    { note: 659.25, duration: 0.5 }, // E5
    { note: 587.33, duration: 0.7 }, // D5
    { note: 523.25, duration: 1.0 }, // C5
    { note: 659.25, duration: 0.5 }, // E5
    { note: 587.33, duration: 0.6 }, // D5
    { note: 783.99, duration: 0.8 }, // G5
    { note: 659.25, duration: 0.5 }, // E5
    { note: 523.25, duration: 1.2 }, // C5
  ];

  public subscribe(listener: StateChangeListener): () => void {
    this.listeners.add(listener);
    listener(this.isMusicPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.isMusicPlaying);
      } catch {
        // ignore
      }
    });
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a soft, bell-like music box chime
  public playTone(freq: number, duration: number = 0.5, volume: number = 0.15) {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave creates a pure, sweet glockenspiel/music box tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Music box envelope: instant attack, long gentle decay
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  // Subtle UI click / pop sound
  public playClickSound() {
    if (this.isSoundMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  // Start music box lullaby loop
  public startLullaby(onNotePlay?: (noteName: string) => void) {
    if (this.isMusicPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isMusicPlaying = true;
    this.isSoundMuted = false;
    this.musicNoteIndex = 0;
    this.notify();

    const playNext = () => {
      if (!this.isMusicPlaying) return;
      const current = this.lullabyMelody[this.musicNoteIndex];
      this.playTone(current.note, current.duration * 1.5, 0.14);
      if (onNotePlay) {
        onNotePlay(`♪ ${Math.round(current.note)}Hz`);
      }
      this.musicNoteIndex = (this.musicNoteIndex + 1) % this.lullabyMelody.length;

      const nextDelay = current.duration * 1000 + 150;
      this.musicInterval = window.setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  // Stop music box lullaby
  public stopLullaby() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
    this.notify();
  }

  public toggleLullaby(onNotePlay?: (noteName: string) => void): boolean {
    if (this.isMusicPlaying) {
      this.stopLullaby();
      return false;
    } else {
      this.startLullaby(onNotePlay);
      return true;
    }
  }

  public setMuted(muted: boolean) {
    this.isSoundMuted = muted;
    if (muted && this.isMusicPlaying) {
      this.stopLullaby();
    }
  }

  public isMuted(): boolean {
    return this.isSoundMuted;
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const audioManager = new AudioManager();
