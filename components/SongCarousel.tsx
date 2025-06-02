"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Song = {
  id: number;
  title: string;
  cover: string;
  file: string;
};

type Props = {
  songs: Song[];
  onSelectSong: (index: number) => void;
  currentSongIndex: number;
};

const SongCarousel = ({ songs, onSelectSong, currentSongIndex }: Props) => {
  // Always call hooks first
  const containerRef = useRef<HTMLDivElement | null>(null);
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const current = songRefs.current[currentSongIndex];
    if (current && containerRef.current) {
      current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentSongIndex]);

  // Then conditionally render
  if (!songs || songs.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto whitespace-nowrap py-4 px-2 mt-4 flex items-center scroll-smooth"
    >
      {songs.map((song, index) => (
        <div
          key={song.id || index}
          ref={(el) => (songRefs.current[index] = el)}
          className="inline-block text-center mx-2 w-24 flex-shrink-0"
        >
          <div
            className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-transform hover:scale-105 hover:opacity-90 ${
              index === currentSongIndex
                ? "border-yellow-500 ring-2 ring-yellow-600"
                : "border-white"
            }`}
            onClick={() => onSelectSong(index)}
            title={`Play ${song.title}`}
          >
            <Image
              src={song.cover}
              alt={song.title}
              fill
              className="object-cover"
              sizes="96px"
              priority={index === currentSongIndex}
            />
          </div>
          <p
            className="text-[10px] text-white mt-2 font-semibold leading-tight truncate"
            title={song.title}
          >
            {song.title.split(" - ")[1]?.split("(")[0] || song.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SongCarousel;

