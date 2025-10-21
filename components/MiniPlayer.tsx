// 'use client';
// import { useRef, useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { Song } from './Player';

// export default function MiniPlayer({ songs }: { songs: Song[] }) {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [playing, setPlaying] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [currentSong, setCurrentSong] = useState<Song | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const playRandomSong = useCallback(async () => {
//     if (!songs || songs.length === 0) return;

//     const random = songs[Math.floor(Math.random() * songs.length)];
//     setCurrentSong(random);
//     setProgress(0);
//     setCurrentTime(0);
//     setDuration(0);

//     if (audioRef.current) {
//       const audio = audioRef.current;
//       audio.src = random.file_url;

//       try {
//         await new Promise((resolve, reject) => {
//           if (!audio) return reject();

//           const onCanPlay = () => {
//             audio.removeEventListener('canplay', onCanPlay);
//             audio.removeEventListener('error', onError);
//             audio.removeEventListener('loadedmetadata', onLoadedMetadata);
//             resolve(null);
//           };

//           const onError = () => {
//             audio.removeEventListener('canplay', onCanPlay);
//             audio.removeEventListener('error', onError);
//             audio.removeEventListener('loadedmetadata', onLoadedMetadata);
//             reject();
//           };

//           const onLoadedMetadata = () => {
//             if (audio.duration && !isNaN(audio.duration)) {
//               setDuration(audio.duration);
//             }
//           };

//           audio.addEventListener('canplay', onCanPlay);
//           audio.addEventListener('error', onError);
//           audio.addEventListener('loadedmetadata', onLoadedMetadata);
//           audio.load();
//         });

//         await audio.play();
//         setPlaying(true);
//         setExpanded(true);
//       } catch (error) {
//         console.error('Playback failed:', error);
//       }
//     }
//   }, [songs]);

//   const togglePlay = async () => {
//     if (playing) {
//       audioRef.current?.pause();
//       setPlaying(false);
//     } else {
//       if (!currentSong) {
//         await playRandomSong();
//       } else {
//         try {
//           await audioRef.current?.play();
//           setPlaying(true);
//           setExpanded(true);
//         } catch (error) {
//           console.error('Playback failed:', error);
//         }
//       }
//     }
//   };

//   const exitPlayer = () => {
//     audioRef.current?.pause();
//     setPlaying(false);
//     setExpanded(false);
//     setProgress(0);
//     setCurrentTime(0);
//     setDuration(0);
//   };

//   // Separate effect that only runs when currentSong changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !currentSong) return;

//     const updateProgress = () => {
//       if (audio.duration > 0) {
//         const percent = (audio.currentTime / audio.duration) * 100;
//         setProgress(percent);
//         setCurrentTime(audio.currentTime);
//         setDuration(audio.duration);
//       }
//     };

//     const handleEnded = () => {
//       playRandomSong();
//     };

//     audio.addEventListener('timeupdate', updateProgress);
//     audio.addEventListener('ended', handleEnded);
//     audio.addEventListener('loadedmetadata', updateProgress);

//     return () => {
//       audio.removeEventListener('timeupdate', updateProgress);
//       audio.removeEventListener('ended', handleEnded);
//       audio.removeEventListener('loadedmetadata', updateProgress);
//     };
//   }, [currentSong, playRandomSong]);

//   const formatTime = (seconds: number) => {
//     if (isNaN(seconds)) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (!songs || songs.length === 0) return null;

//   return (
//     <>
//       {/* Audio element always present */}
//       <audio ref={audioRef} preload="metadata" />

//       {/* === Expanded Player === */}
//       {expanded && currentSong && (
//         <div className="fixed bottom-0 left-0 w-full bg-opacity-60 backdrop-blur-lg border-opacity-20 z-40 transition-all duration-500 ease-in-out">
//           {/* Controls and Song Info */}
//           <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 text-white gap-4">
//             {/* LEFT: Controls */}
//             <div className="flex items-center gap-4">
//               {/* Exit */}
//               <button
//                 onClick={exitPlayer}
//                 className="text-white hover:opacity-70 transition-opacity"
//                 aria-label="Close"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>

//               {/* Play/Pause */}
//               <button
//                 onClick={togglePlay}
//                 className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
//                 aria-label={playing ? 'Pause' : 'Play'}
//               >
//                 {playing ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
//                   </svg>
//                 )}
//               </button>

//               {/* Next */}
//               <button
//                 onClick={playRandomSong}
//                 className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
//                 aria-label="Next"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M4 4v12l8-6-8-6zm9 0h2v12h-2V4z" />
//                 </svg>
//               </button>
//             </div>

//             {/* CENTER: Progress Bar */}
//             <div className="flex items-center gap-3 flex-1 max-w-md">
//               <div className="flex-1 h-[3px] bg-white/20 rounded relative overflow-hidden">
//                 <div
//                   className="absolute top-0 left-0 h-full bg-white rounded transition-all duration-200 ease-linear"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>

//             {/* RIGHT: Song Info */}
//             <div className="text-right">
//               <p className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">
//                 {currentSong.title}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* === Collapsed Play Button === */}
//       {!expanded && (
//         <div className="fixed bottom-4 left-6 z-50">
//           <button
//             onClick={togglePlay}
//             className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform duration-200"
//             aria-label="Play"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
//             </svg>
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
// =======================================================================

'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Song } from './Player';

export default function MiniPlayer({ songs }: { songs: Song[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [progress, setProgress] = useState(0);

  const playRandomSong = useCallback(async () => {
    if (!songs || songs.length === 0) return;

    const random = songs[Math.floor(Math.random() * songs.length)];
    setCurrentSong(random);
    setProgress(0);

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.src = random.file_url;

      try {
        await new Promise((resolve, reject) => {
          if (!audio) return reject();

          const onCanPlay = () => {
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            resolve(null);
          };

          const onError = () => {
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            reject();
          };

          const onLoadedMetadata = () => {
            // Metadata loaded
          };

          audio.addEventListener('canplay', onCanPlay);
          audio.addEventListener('error', onError);
          audio.addEventListener('loadedmetadata', onLoadedMetadata);
          audio.load();
        });

        await audio.play();
        setPlaying(true);
        setExpanded(true);
      } catch (error) {
        console.error('Playback failed:', error);
      }
    }
  }, [songs]);

  const togglePlay = async () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      if (!currentSong) {
        await playRandomSong();
      } else {
        try {
          await audioRef.current?.play();
          setPlaying(true);
          setExpanded(true);
        } catch (error) {
          console.error('Playback failed:', error);
        }
      }
    }
  };

  const exitPlayer = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setExpanded(false);
    setProgress(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const updateProgress = () => {
      if (audio.duration > 0) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
      }
    };

    const handleEnded = () => {
      playRandomSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [currentSong, playRandomSong]);

  if (!songs || songs.length === 0) return null;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      {/* === Expanded Player === */}
      {expanded && currentSong && (
        <div className="fixed bottom-0 left-0 w-full bg-opacity-60 backdrop-blur-lg border-opacity-20 z-40 transition-all duration-500 ease-in-out">
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 text-white gap-4">
            {/* LEFT: Controls */}
            <div className="flex items-center gap-4">
              {/* Exit */}
              <button
                onClick={exitPlayer}
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={playRandomSong}
                className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4v12l8-6-8-6zm9 0h2v12h-2V4z" />
                </svg>
              </button>
            </div>

            {/* CENTER: Progress Bar */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="flex-1 h-[3px] bg-white/20 rounded relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded transition-all duration-200 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* RIGHT: Song Info */}
            <div className="text-right">
              <p className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">
                {currentSong.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === Collapsed Play Button === */}
      {!expanded && (
        <div className="fixed bottom-4 left-6 z-50">
          <button
            onClick={togglePlay}
            className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform duration-200"
            aria-label="Play"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}