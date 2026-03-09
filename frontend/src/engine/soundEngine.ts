import { useEffect, useRef } from 'react';

export const useAmbienceAudio = (audioUrl?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Autoplay may be blocked until user interaction.
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioUrl]);

  return audioRef;
};
