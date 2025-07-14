// 'use client';

// import { useRef, useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { songs } from '../utils/songData';
// import SongCarousel from './SongCarousel';

// const formatTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
// };

// const Player = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const currentSong = songs[currentIndex];

//   const playSong = async () => {
//     if (audioRef.current && !isLoading) {
//       try {
//         setIsLoading(true);
//         await audioRef.current.play();
//         setIsPlaying(true);

//         if ('mediaSession' in navigator) {
//           navigator.mediaSession.playbackState = 'playing';
//         }
//       } catch (err) {
//         console.error('Play error:', err);
//         setIsPlaying(false);
//         if ('mediaSession' in navigator) {
//           navigator.mediaSession.playbackState = 'paused';
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const pauseSong = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);

//       if ('mediaSession' in navigator) {
//         navigator.mediaSession.playbackState = 'paused';
//       }
//     }
//   };

//   const changeSong = async (newIndex: number, shouldAutoPlay: boolean = false) => {
//     if (!audioRef.current) return;
//     const wasPlaying = isPlaying || shouldAutoPlay;

//     setIsLoading(true);
//     setCurrentIndex(newIndex);

//     setTimeout(async () => {
//       if (audioRef.current && wasPlaying) {
//         try {
//           await audioRef.current.play();
//           setIsPlaying(true);
//           if ('mediaSession' in navigator) {
//             navigator.mediaSession.playbackState = 'playing';
//           }
//         } catch (err) {
//           console.error('Playback failed after song change:', err);
//           setIsPlaying(false);
//           if ('mediaSession' in navigator) {
//             navigator.mediaSession.playbackState = 'paused';
//           }
//         }
//       }
//       setIsLoading(false);
//     }, 100);
//   };

//   const handleNext = useCallback((autoPlay: boolean = false) => {
//     const nextIndex = (currentIndex + 1) % songs.length;
//     changeSong(nextIndex, autoPlay);
//   }, [currentIndex, isPlaying]);

//   const handlePrev = useCallback(() => {
//     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
//     changeSong(prevIndex);
//   }, [currentIndex]);

//   const handleSongSelect = (index: number) => {
//     changeSong(index);
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (audioRef.current) {
//       audioRef.current.currentTime = value;
//     }
//   };

//   useEffect(() => {
//     if ('mediaSession' in navigator) {
//       navigator.mediaSession.metadata = new MediaMetadata({
//         title: currentSong.title,
//         artist: 'Ezell Brown',
//         album: 'MAXWELL MIX',
//         artwork: [
//           { src: currentSong.cover, sizes: '512x512', type: 'image/jpeg' },
//         ],
//       });

//       navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

//       navigator.mediaSession.setActionHandler('play', playSong);
//       navigator.mediaSession.setActionHandler('pause', pauseSong);
//       navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
//       navigator.mediaSession.setActionHandler('nexttrack', () => handleNext(false));

//       navigator.mediaSession.setActionHandler('seekto', (details) => {
//         if (audioRef.current && details.seekTime !== undefined) {
//           audioRef.current.currentTime = details.seekTime;
//         }
//       });
//     }
//   }, [currentSong, isPlaying, handleNext, handlePrev]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateProgress = () => {
//       setProgress(audio.currentTime);
//       setDuration(audio.duration || 0);
//     };

//     const handleEnded = () => {
//       // Automatically play the next song when current song ends
//       handleNext(true);
//     };

//     const handleLoadStart = () => setIsLoading(true);
//     const handleCanPlay = () => setIsLoading(false);
//     const handlePlay = () => {
//       setIsPlaying(true);
//       if ('mediaSession' in navigator) {
//         navigator.mediaSession.playbackState = 'playing';
//       }
//     };
//     const handlePause = () => {
//       setIsPlaying(false);
//       if ('mediaSession' in navigator) {
//         navigator.mediaSession.playbackState = 'paused';
//       }
//     };

//     audio.addEventListener('timeupdate', updateProgress);
//     audio.addEventListener('loadstart', handleLoadStart);
//     audio.addEventListener('canplay', handleCanPlay);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('timeupdate', updateProgress);
//       audio.removeEventListener('loadstart', handleLoadStart);
//       audio.removeEventListener('canplay', handleCanPlay);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [handleNext]);

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
//               className={`object-cover rounded-full transition-all duration-500 ${
//                 isPlaying ? 'spin-record' : ''
//               }`}
//               priority
//             />
//             {isLoading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <h1 className="text-lg sm:text-2xl font-semibold text-white mt-4 mb-2">
//         {currentSong.title}
//       </h1>

//       {/* Progress Bar */}
//       <div className="w-full max-w-md mx-auto px-4 mt-2 mb-1">
//         <div className="flex justify-between text-sm text-gray-300 mb-1">
//           <span>{formatTime(progress)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//         <input
//           type="range"
//           min={0}
//           max={duration || 0}
//           value={progress}
//           step="0.1"
//           onChange={handleSeek}
//           className="custom-slider w-full "
//           // style={{ accentColor: '#FFD700' }}
//         />
//       </div>

//       <div className="flex justify-center items-center gap-4 flex-wrap my-4">
//         <button 
//           onClick={handlePrev} 
//           disabled={isLoading}
//           className="ezellYellow p-2 rounded-full shadow transition disabled:opacity-50"
//         >
//           <div className="relative w-6 h-6">
//             <Image src="/images/rewind-button.png" alt="Previous" fill sizes="24px" />
//           </div>
//         </button>

//         {isPlaying ? (
//           <button 
//             onClick={pauseSong} 
//             disabled={isLoading}
//             className="ezellYellow p-2 rounded-full shadow transition disabled:opacity-50"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/pause.png" alt="Pause" fill sizes="24px" />
//             </div>
//           </button>
//         ) : (
//           <button 
//             onClick={playSong} 
//             disabled={isLoading}
//             className="ezellYellow p-2 rounded-full shadow transition disabled:opacity-50"
//           >
//             <div className="relative w-6 h-6">
//               <Image src="/images/play.png" alt="Play" fill sizes="24px" />
//             </div>
//           </button>
//         )}

//         <button 
//           onClick={() => handleNext(false)} 
//           disabled={isLoading}
//           className="ezellYellow p-2 rounded-full shadow transition disabled:opacity-50"
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

//         <a href={currentSong.file} download className="ezellYellow p-2 rounded-full shadow transition">
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
//       />
//     </div>
//   );
// };

// export default Player;
// ====Above is the original code===============================================================================


// ============================================
// Main code im using below

// 'use client';

// import { useRef, useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { songs } from '../utils/songData';
// import SongCarousel from './SongCarousel';

// const formatTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
// };

// const Player = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const currentSong = songs[currentIndex];

//   const playSong = async () => {
//     if (audioRef.current && !isLoading) {
//       try {
//         setIsLoading(true);
//         await audioRef.current.play();
//         setIsPlaying(true);
//         navigator.mediaSession.playbackState = 'playing';
//       } catch (err) {
//         console.error('Play error:', err);
//         setIsPlaying(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const pauseSong = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//       navigator.mediaSession.playbackState = 'paused';
//     }
//   };

//   const changeSong = async (newIndex: number, shouldAutoPlay: boolean = false) => {
//     const wasPlaying = isPlaying || shouldAutoPlay;
//     setIsLoading(true);
//     setCurrentIndex(newIndex);
//     setTimeout(async () => {
//       if (audioRef.current && wasPlaying) {
//         try {
//           await audioRef.current.play();
//           setIsPlaying(true);
//         } catch (err) {
//           console.error('Error changing song:', err);
//           setIsPlaying(false);
//         }
//       }
//       setIsLoading(false);
//     }, 100);
//   };

//   const handleNext = useCallback((autoPlay: boolean = false) => {
//     const nextIndex = (currentIndex + 1) % songs.length;
//     changeSong(nextIndex, autoPlay);
//   }, [currentIndex]);

//   const handlePrev = useCallback(() => {
//     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
//     changeSong(prevIndex);
//   }, [currentIndex]);

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (audioRef.current) {
//       audioRef.current.currentTime = value;
//     }
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateProgress = () => {
//       setProgress(audio.currentTime);
//       setDuration(audio.duration || 0);
//     };

//     audio.addEventListener('timeupdate', updateProgress);
//     audio.addEventListener('ended', () => handleNext(true));

//     return () => {
//       audio.removeEventListener('timeupdate', updateProgress);
//     };
//   }, [handleNext]);

//   return (
//     <div className="text-center px-2 sm:px-4 text-white w-full">
//       {/* Main album art - responsive sizing */}
//       <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mt-4">
//         <div className="bg-black p-2 rounded-full ">
//           <div className="relative w-full aspect-square">
//             <Image
//               src={currentSong.cover}
//               alt={currentSong.title}
//               fill
//               sizes="(max-width: 640px) 280px, 384px"
//               className={`object-cover rounded-full transition-all duration-500 ${
//                 isPlaying ? 'spin-record' : ''
//               }`}
//               priority
//             />
//             {isLoading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Song title - responsive text size */}
//       <h1 className="text-xl sm:text-2xl font-bold text-white mt-4 sm:mt-6 mb-4 px-2">
//         {currentSong.title}
//       </h1>

//       {/* Progress bar - improved mobile touch */}
//       <div className="w-full max-w-md mx-auto px-2 sm:px-4 mt-2 mb-4">
//         <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
//           <span>{formatTime(progress)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//         <input
//           type="range"
//           min={0}
//           max={duration || 0}
//           value={progress}
//           step="0.1"
//           onChange={handleSeek}
//           className="custom-slider w-full h-2 sm:h-auto"
//         />
//       </div>

//       {/* Control buttons - improved mobile spacing */}
//       <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap my-4">
//         <button 
//           onClick={handlePrev} 
//           disabled={isLoading} 
//           className="ezellYellowBtn p-3 sm:p-4 cursor-pointer"
//         >
//           <Image src="/images/rewind-button.png" alt="Prev" width={20} height={20} className="sm:w-6 sm:h-6" />
//         </button>

//         <button 
//           onClick={isPlaying ? pauseSong : playSong} 
//           disabled={isLoading} 
//           className="ezellYellowBtn p-4 sm:p-5 cursor-pointer"
//         >
//           <Image
//             src={isPlaying ? '/images/pause.png' : '/images/play.png'}
//             alt={isPlaying ? 'Pause' : 'Play'}
//             width={24}
//             height={24}
//             className="sm:w-7 sm:h-7"
//           />
//         </button>

//         <button 
//           onClick={() => handleNext(false)} 
//           disabled={isLoading} 
//           className="ezellYellowBtn p-3 sm:p-4 cursor-pointer"
//         >
//           <Image 
//             src="/images/rewind-button.png" 
//             alt="Next" 
//             width={20} 
//             height={20} 
//             className="transform -scale-x-100 sm:w-6 sm:h-6 cursor-pointer" 
//           />
//         </button>

//         <a href={currentSong.file} download className="ezellYellowBtn p-3 sm:p-4">
//           <Image src="/images/download.png" alt="Download" width={20} height={20} className="sm:w-6 sm:h-6" />
//         </a>
//       </div>

//       {/* Song carousel with enhanced mobile scrolling */}
//       <SongCarousel
//         songs={songs}
//         onSelectSong={(index) => changeSong(index)}
//         currentSongIndex={currentIndex}
//       />

//       <audio ref={audioRef} src={currentSong.file} preload="auto" />
//     </div>
//   );
// };

// export default Player;
// =============================================================================
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export type Song = {
  id: string;
  title: string;
  cover_url: string;
  file_url: string;
};

type PlayerProps = { songs: Song[] };

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${('0' + Math.floor(seconds % 60)).slice(-2)}`;

const Player = ({ songs }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const current = songs[index];

  const play = async () => {
    if (audioRef.current && !loading) {
      setLoading(true);
      try {
        await audioRef.current.play();
        setPlaying(true);

        if ('mediaSession' in navigator && current.cover_url) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: current.title,
            artwork: [
              {
                src: current.cover_url,
                sizes: '512x512',
                type: 'image/jpeg',
              },
            ],
          });
        }
      } catch (err) {
        console.error('Error playing audio:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const change = useCallback(
    (newIndex: number, auto = false) => {
      const wasPlaying = playing || auto;
      setIndex(newIndex);
      setLoading(true);
      setTimeout(async () => {
        if (audioRef.current) {
          audioRef.current.src = songs[newIndex].file_url;
          if (wasPlaying) {
            await audioRef.current.play().catch(console.error);
            setPlaying(true);
          } else {
            setPlaying(false);
          }
        }
        setLoading(false);
      }, 100);
    },
    [playing, songs]
  );

  const next = useCallback(() => change((index + 1) % songs.length, true), [index, songs.length, change]);
  const prev = useCallback(() => change((index - 1 + songs.length) % songs.length, true), [index, songs.length, change]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    
    const update = () => {
      setProgress(a.currentTime);
      setDuration(a.duration || 0);
    };
    
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    
    a.addEventListener('timeupdate', update);
    a.addEventListener('ended', next);
    a.addEventListener('play', handlePlay);
    a.addEventListener('pause', handlePause);
    
    return () => {
      a.removeEventListener('timeupdate', update);
      a.removeEventListener('ended', next);
      a.removeEventListener('play', handlePlay);
      a.removeEventListener('pause', handlePause);
    };
  }, [next]);

  useEffect(() => {
    if (!current || !current.cover_url || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artwork: [
        {
          src: current.cover_url,
          sizes: '512x512',
          type: 'image/jpeg',
        },
      ],
    });

    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('previoustrack', prev);
    navigator.mediaSession.setActionHandler('nexttrack', next);
  }, [current?.cover_url, current?.title]);

  // Initialize audio element when component mounts
  useEffect(() => {
    if (audioRef.current && current) {
      audioRef.current.src = current.file_url;
    }
  }, [current]);

  return (
    <div className="text-center px-4 py-8">
      <audio ref={audioRef} preload="metadata" />
      
      <div className="relative w-64 mx-auto">
        <div className="bg-black p-2 rounded-full">
          <div className="relative aspect-square rounded-full overflow-hidden">
            {current.cover_url ? (
              <Image
                src={current.cover_url}
                alt={current.title}
                fill
                // removed spinner
                // className={`object-cover transition-transform ${playing ? 'spin-record' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <span className="text-gray-300 text-sm">No Cover</span>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold my-2">{current.title}</h3>
      
      <div className="max-w-sm mx-auto">
        <div className="flex justify-between text-gray-300 text-sm">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="relative w-full">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            step="0.1"
            onChange={(e) => {
              if (audioRef.current) audioRef.current.currentTime = +e.target.value;
            }}
            className="w-full h-2  rounded-lg appearance-none cursor-pointer custom-slider"
          />
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <button onClick={prev} disabled={loading} className="ezellYellowBtn p-2 rounded cursor-pointer">
          <Image src="/images/rewind-button.png" alt="Previous" width={32} height={32} />
        </button>

        <button
          onClick={playing ? pause : play}
          disabled={loading}
          className="ezellYellowBtn p-2 rounded cursor-pointer"
        >
          <Image
            src={playing ? '/images/pause.png' : '/images/play.png'}
            alt={playing ? 'Pause' : 'Play'}
            width={32}
            height={32}
          />
        </button>

        <button onClick={next} disabled={loading} className="ezellYellowBtn p-2 rounded cursor-pointer">
          <Image src="/images/forward-button.png" alt="Next" width={32} height={32} />
        </button>

        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = current.file_url;
            link.download = `${current.title}.mp3`;
            link.click();
          }}
          className="ezellYellowBtn p-2 rounded cursor-pointer"
        >
          <Image src="/images/download.png" alt="Download" width={32} height={32} />
        </button>
      </div>

    </div>
  );
};

export default Player;