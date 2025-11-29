"use client";

import { useRef, useState } from "react";

export default function ChristmasMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.5;
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/christmas.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-50 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-700 transition"
      >
        {playing ? "🔇 Tắt nhạc" : "🔊 Bật nhạc"}
      </button>
    </>
  );
}
