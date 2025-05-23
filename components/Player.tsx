// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import Image from 'next/image';
// import { songs } from '../utils/songData';
// import SongCarousel from './SongCarousel';

// const Player = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const currentSong = songs[currentIndex];

//   const playSong = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const pauseSong = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleNext = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
//   };

//   const handlePrev = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load();
//       if (isPlaying) {
//         const playPromise = audioRef.current.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((err) => {
//             console.error('Play error:', err);
//             setIsPlaying(false);
//           });
//         }
//       }
//     }
//   }, [currentIndex, isPlaying]); 

//   const handleSongSelect = (index: number) => {
//     setCurrentIndex(index);
//     setIsPlaying(true);
//   };

//   return (
//     <div className="text-center px-4 text-amber-100">
//       <div className="relative w-full max-w-sm mx-auto mt-2">
//         <div className="bg-black border-4 border-yellow-400 rounded-full p-2">
//           <div className="relative w-full aspect-square">
//             <Image
//               src={currentSong.cover}
//               alt={currentSong.title}
//               fill
//               sizes="(max-width: 768px) 100vw, 384px"
//               className={`object-cover rounded-full transition-all duration-500 ${
//                 isPlaying ? 'spin-record' : ''
//               }`}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="text-xl md:text-3xl font-semibold text-black mt-4 mb-2">{currentSong.title}</h1>

//       <div className="flex justify-center items-center gap-4 my-4">
//         <button
//           onClick={handlePrev}
//           className="bg-yellow-100 p-2 rounded-full shadow hover:bg-yellow-300 transition"
//           title="Previous"
//         >
//           <div className="relative w-6 h-6">
//             <Image 
//               src="/images/rewind-button.png" 
//               alt="Previous" 
//               fill 
//               sizes="24px"
//             />
//           </div>
//         </button>

//         {isPlaying ? (
//           <button
//             onClick={pauseSong}
//             className="bg-yellow-100 p-2 rounded-full shadow hover:bg-yellow-300 transition"
//             title="Pause"
//           >
//             <div className="relative w-6 h-6">
//               <Image 
//                 src="/images/pause.png" 
//                 alt="Pause" 
//                 fill 
//                 sizes="24px"
//               />
//             </div>
//           </button>
//         ) : (
//           <button
//             onClick={playSong}
//             className="bg-yellow-100 p-2 rounded-full shadow hover:bg-yellow-300 transition"
//             title="Play"
//           >
//             <div className="relative w-6 h-6">
//               <Image 
//                 src="/images/play.png" 
//                 alt="Play" 
//                 fill 
//                 sizes="24px"
//               />
//             </div>
//           </button>
//         )}

//         <button
//           onClick={handleNext}
//           className="bg-yellow-100 p-2 rounded-full shadow hover:bg-yellow-300 transition"
//           title="Next"
//         >
//           <div className="relative w-6 h-6">
//             <Image
//               src="/images/rewind-button.png"
//               alt="Next"
//               fill
//               sizes="24px"
//               className="transform -scale-x-100"
//             />
//           </div>
//         </button>

//         <a
//           href={currentSong.file}
//           download
//           title="Download"
//           className="bg-yellow-400 p-2 rounded-full shadow hover:bg-yellow-500 transition"
//         >
//           <div className="relative w-6 h-6">
//             <Image 
//               src="/images/download.png" 
//               alt="Download" 
//               fill 
//               sizes="24px"
//             />
//           </div>
//         </a>
//       </div>

//       <SongCarousel
//         songs={songs}
//         onSelectSong={handleSongSelect}
//         currentSongIndex={currentIndex}
//       />

//       <audio ref={audioRef} src={currentSong.file} preload="auto" />
//     </div>
//   );
// };

// export default Player;

// =============================================================================================
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { songs } from "../utils/songData";
import SongCarousel from "./SongCarousel";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songs[currentIndex];

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Play error:", err);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentIndex, isPlaying]);

  const handleSongSelect = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="text-center px-4 text-white">
      <div className="relative w-full max-w-sm mx-auto mt-2">
        <div className="bg-black  p-2">
          <div className="relative w-full aspect-square">
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className={`object-cover rounded-full transition-all duration-500 ${
                isPlaying ? "spin-record" : ""
              }`}
              priority
            />
          </div>
        </div>
      </div>

      <h1 className="text-xl md:text-3xl font-semibold text-white mt-4 mb-2">
        {currentSong.title}
      </h1>

      <div className="flex justify-center items-center gap-4 my-4">
        <button
          onClick={handlePrev}
          className="bg-yellow-500 p-2 rounded-full shadow hover:bg-yellow-600 transition"
          title="Previous"
        >
          <div className="relative w-6 h-6">
            <Image src="/images/rewind-button.png" alt="Previous" fill sizes="24px" />
          </div>
        </button>

        {isPlaying ? (
          <button
            onClick={pauseSong}
            className="bg-yellow-500 p-2 rounded-full shadow hover:bg-yellow-600 transition"
            title="Pause"
          >
            <div className="relative w-6 h-6">
              <Image src="/images/pause.png" alt="Pause" fill sizes="24px" />
            </div>
          </button>
        ) : (
          <button
            onClick={playSong}
            className="bg-yellow-500 p-2 rounded-full shadow hover:bg-yellow-600 transition"
            title="Play"
          >
            <div className="relative w-6 h-6">
              <Image src="/images/play.png" alt="Play" fill sizes="24px" />
            </div>
          </button>
        )}

        <button
          onClick={handleNext}
          className="bg-yellow-500 p-2 rounded-full shadow hover:bg-yellow-600 transition"
          title="Next"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/rewind-button.png"
              alt="Next"
              fill
              sizes="24px"
              className="transform -scale-x-100"
            />
          </div>
        </button>

        <a
          href={currentSong.file}
          download
          title="Download"
          className="bg-yellow-500 p-2 rounded-full shadow hover:bg-yellow-600 transition"
        >
          <div className="relative w-6 h-6">
            <Image src="/images/download.png" alt="Download" fill sizes="24px" />
          </div>
        </a>
      </div>

      <SongCarousel
        songs={songs}
        onSelectSong={handleSongSelect}
        currentSongIndex={currentIndex}
      />

      <audio ref={audioRef} src={currentSong.file} preload="auto" />
    </div>
  );
};

export default Player;
