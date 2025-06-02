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
//     setCurrentIndex((prev) => (prev + 1) % songs.length);
//   };

//   const handlePrev = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
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
//     <div className="text-center px-2 sm:px-4 text-white w-full">
//       <div className="relative w-full max-w-sm mx-auto mt-2">
//         <div className="bg-black p-2 rounded-full">
//           <div className="relative w-full aspect-square">
//             <Image
//               src={currentSong.cover}
//               alt={currentSong.title}
//               fill
//               sizes="(max-width: 768px) 100vw, 384px"
//               className={`object-cover rounded-full transition-all duration-500 ${isPlaying ? 'spin-record' : ''}`}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="text-lg sm:text-2xl font-semibold text-white mt-4 mb-2">
//         {currentSong.title}
//       </h1>

//       <div className="flex justify-center items-center gap-4 flex-wrap my-4">
//         <button
//           onClick={handlePrev}
//           className="ezellYellow  p-2 rounded-full shadow  transition"
//         >
//           <div className="relative w-6 h-6">
//             <Image src="/images/rewind-button.png" alt="Previous" fill sizes="24px" />
//           </div>
//         </button>

//         {isPlaying ? (
//           <button
//             onClick={pauseSong}
//             className="ezellYellow  p-2 rounded-full shadow  transition"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/pause.png" alt="Pause" fill sizes="24px" />
//             </div>
//           </button>
//         ) : (
//           <button
//             onClick={playSong}
//             className="ezellYellow  p-2 rounded-full shadow  transition"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/play.png" alt="Play" fill sizes="24px" />
//             </div>
//           </button>
//         )}

//         <button
//           onClick={handleNext}
//           className="ezellYellow  p-2 rounded-full shadow  transition"
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
//           className=" ezellYellow  p-2 rounded-full shadow  transition"
//         >
//           <div className="relative w-6 h-6">
//             <Image src="/images/download.png" alt="Download" fill sizes="24px" />
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

// ==============================================================

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
//     setCurrentIndex((prev) => (prev + 1) % songs.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
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
//     <div className="text-center px-2 sm:px-4 text-white w-full">
//       <div className="relative w-full max-w-sm mx-auto mt-2">
//         <div className="bg-black p-2 rounded-full">
//           <div className="relative w-full aspect-square">
//             <Image
//               src={currentSong.cover}
//               alt={currentSong.title}
//               fill
//               sizes="(max-width: 768px) 100vw, 384px"
//               className={`object-cover rounded-full transition-all duration-500 ${isPlaying ? 'spin-record' : ''}`}
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="text-lg sm:text-2xl font-semibold text-white mt-4 mb-2">
//         {currentSong.title}
//       </h1>

//       <div className="flex justify-center items-center gap-4 flex-wrap my-4">
//         <button
//           onClick={handlePrev}
//           className="ezellYellow p-2 rounded-full shadow transition"
//         >
//           <div className="relative w-6 h-6">
//             <Image src="/images/rewind-button.png" alt="Previous" fill sizes="24px" />
//           </div>
//         </button>

//         {isPlaying ? (
//           <button
//             onClick={pauseSong}
//             className="ezellYellow p-2 rounded-full shadow transition"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/pause.png" alt="Pause" fill sizes="24px" />
//             </div>
//           </button>
//         ) : (
//           <button
//             onClick={playSong}
//             className="ezellYellow p-2 rounded-full shadow transition"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/play.png" alt="Play" fill sizes="24px" />
//             </div>
//           </button>
//         )}

//         <button
//           onClick={handleNext}
//           className="ezellYellow p-2 rounded-full shadow transition"
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
//           className="ezellYellow p-2 rounded-full shadow transition"
//         >
//           <div className="relative w-6 h-6">
//             <Image src="/images/download.png" alt="Download" fill sizes="24px" />
//           </div>
//         </a>
//       </div>

//       <SongCarousel
//         songs={songs}
//         onSelectSong={handleSongSelect}
//         currentSongIndex={currentIndex}
//       />

//       <audio
//         ref={audioRef}
//         src={currentSong.file}
//         preload="auto"
//         onEnded={handleNext}
//       />
//     </div>
//   );
// };

// export default Player;

// ===========================================================continous playback above=========================

// ==============================================================

'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { songs } from '../utils/songData';
import SongCarousel from './SongCarousel';

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
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error('Play error:', err);
            setIsPlaying(false);
          });
        }
      }
    }

    // ✅ Media Session API for Lock Screen / Media Controls
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        // artist: 'Ezell Brown', 
        album: 'MAX WELL MIX',   // Optional
        artwork: [
          {
            src: currentSong.cover,
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      });

      navigator.mediaSession.setActionHandler('play', playSong);
      navigator.mediaSession.setActionHandler('pause', pauseSong);
      navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
    }
  }, [currentIndex, isPlaying]);

  const handleSongSelect = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="text-center px-2 sm:px-4 text-white w-full">
      <div className="relative w-full max-w-sm mx-auto mt-2">
        <div className="bg-black p-2 rounded-full">
          <div className="relative w-full aspect-square">
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className={`object-cover rounded-full transition-all duration-500 ${isPlaying ? 'spin-record' : ''}`}
              priority
            />
          </div>
        </div>
      </div>

      <h1 className="text-lg sm:text-2xl font-semibold text-white mt-4 mb-2">
        {currentSong.title}
      </h1>

      <div className="flex justify-center items-center gap-4 flex-wrap my-4">
        <button
          onClick={handlePrev}
          className="ezellYellow p-2 rounded-full shadow transition"
        >
          <div className="relative w-6 h-6">
            <Image src="/images/rewind-button.png" alt="Previous" fill sizes="24px" />
          </div>
        </button>

        {isPlaying ? (
          <button
            onClick={pauseSong}
            className="ezellYellow p-2 rounded-full shadow transition"
          >
            <div className="relative w-6 h-6">
              <Image src="/images/pause.png" alt="Pause" fill sizes="24px" />
            </div>
          </button>
        ) : (
          <button
            onClick={playSong}
            className="ezellYellow p-2 rounded-full shadow transition"
          >
            <div className="relative w-6 h-6">
              <Image src="/images/play.png" alt="Play" fill sizes="24px" />
            </div>
          </button>
        )}

        <button
          onClick={handleNext}
          className="ezellYellow p-2 rounded-full shadow transition"
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
          className="ezellYellow p-2 rounded-full shadow transition"
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

      <audio
        ref={audioRef}
        src={currentSong.file}
        preload="auto"
        onEnded={handleNext}
      />
    </div>
  );
};

export default Player;
