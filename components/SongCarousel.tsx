// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";

// type Song = {
//   id: number;
//   title: string;
//   cover: string;
//   file: string;
// };

// type Props = {
//   songs: Song[];
//   onSelectSong: (index: number) => void;
//   currentSongIndex: number;
// };

// const SongCarousel = ({ songs, onSelectSong, currentSongIndex }: Props) => {
//   // Always call hooks first
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const songRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const current = songRefs.current[currentSongIndex];
//     if (current && containerRef.current) {
//       current.scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//         block: "nearest",
//       });
//     }
//   }, [currentSongIndex]);

//   // Then conditionally render
//   if (!songs || songs.length === 0) return null;

//   return (
//     <div
//       ref={containerRef}
//       className="overflow-x-auto whitespace-nowrap py-4 px-2 mt-4 flex items-center scroll-smooth"
//     >
//       {songs.map((song, index) => (
//         <div
//           key={song.id || index}
//           ref={(el) => (songRefs.current[index] = el)}
//           className="inline-block text-center mx-2 w-24 flex-shrink-0"
//         >
//           <div
//   className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-transform hover:scale-105 hover:opacity-90 ${
//     index === currentSongIndex
//       ? "border-ezellYellow ring-ezellYellow"
//       : "border-white"
//   }`}
//   onClick={() => onSelectSong(index)}
//   title={`Play ${song.title}`}
// >

//             <Image
//               src={song.cover}
//               alt={song.title}
//               fill
//               className="object-cover"
//               sizes="96px"
//               priority={index === currentSongIndex}
//             />
//           </div>
//           <p
//             className="text-[10px] text-white mt-2 font-semibold leading-tight truncate"
//             title={song.title}
//           >
//             {song.title.split(" - ")[1]?.split("(")[0] || song.title}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SongCarousel;
// ========ABOVE IS THE ORIGINAL CODE FOR SongCarousel.tsx========
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const current = songRefs.current[currentSongIndex];
    if (current && containerRef.current) {
      // Calculate the scroll position to center the current song
      const container = containerRef.current;
      const songElement = current;
      
      const containerWidth = container.clientWidth;
      const songLeft = songElement.offsetLeft;
      const songWidth = songElement.offsetWidth;
      
      // Center the current song in the viewport
      const scrollLeft = songLeft - (containerWidth / 2) + (songWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentSongIndex]);

  return (
    <div className="w-full mt-4">
      {/* Mobile-first horizontal scrollable carousel */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden py-4 px-4 flex items-center gap-3 sm:gap-4 scroll-smooth"
        style={{ 
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          msOverflowStyle: "auto"
        }}
      >
        {songs.map((song, index) => (
          <div
            key={song.id || index}
            ref={(el) => (songRefs.current[index] = el)}
            className="flex-shrink-0 text-center"
          >
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-3 transition-all duration-300 hover:scale-105 hover:opacity-90 ${
                index === currentSongIndex
                  ? "border-ezellYellow ring-2 ring-ezellYellow shadow-glow transform scale-110"
                  : "border-white opacity-70"
              }`}
              onClick={() => onSelectSong(index)}
              title={`Play ${song.title}`}
            >
              <Image
                src={song.cover}
                alt={song.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                priority={index === currentSongIndex}
              />
            </div>
            <p
              className="text-xs text-white mt-2 font-medium leading-tight truncate w-16 sm:w-20 md:w-24"
              title={song.title}
            >
              {song.title.split(" - ")[1]?.split("(")[0] || song.title}
            </p>
          </div>
        ))}
      </div>
      
      {/* Custom scrollbar styles for webkit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default SongCarousel;