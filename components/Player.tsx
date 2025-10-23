// 'use client';
// import { useRef, useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';

// export type Song = {
//   id: string;
//   title: string;
//   cover_url: string;
//   file_url: string;
// };

// type PlayerProps = { songs: Song[] };

// const formatTime = (seconds: number) =>
//   `${Math.floor(seconds / 60)}:${('0' + Math.floor(seconds % 60)).slice(-2)}`;

// const Player = ({ songs }: PlayerProps) => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [index, setIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const current = songs[index];

//   const play = async () => {
//     if (audioRef.current && !loading) {
//       setLoading(true);
//       try {
//         await audioRef.current.play();
//         setPlaying(true);
//       } catch (err) {
//         console.error('Error playing audio:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const pause = () => {
//     audioRef.current?.pause();
//     setPlaying(false);
//   };

//   const change = useCallback(
//     (newIndex: number, auto = false) => {
//       const wasPlaying = playing || auto;
//       setIndex(newIndex);
//       setLoading(true);
//       setTimeout(async () => {
//         if (audioRef.current) {
//           audioRef.current.src = songs[newIndex].file_url;
//           if (wasPlaying) {
//             await audioRef.current.play().catch(console.error);
//             setPlaying(true);
//           } else {
//             setPlaying(false);
//           }
//         }
//         setLoading(false);
//       }, 100);
//     },
//     [playing, songs]
//   );

//   const next = useCallback(
//     () => change((index + 1) % songs.length, true),
//     [index, songs.length, change]
//   );
//   const prev = useCallback(
//     () => change((index - 1 + songs.length) % songs.length, true),
//     [index, songs.length, change]
//   );

//   useEffect(() => {
//     const a = audioRef.current;
//     if (!a) return;

//     const update = () => {
//       setProgress(a.currentTime);
//       setDuration(a.duration || 0);
//     };

//     const handlePlay = () => setPlaying(true);
//     const handlePause = () => setPlaying(false);

//     a.addEventListener('timeupdate', update);
//     a.addEventListener('ended', next);
//     a.addEventListener('play', handlePlay);
//     a.addEventListener('pause', handlePause);

//     return () => {
//       a.removeEventListener('timeupdate', update);
//       a.removeEventListener('ended', next);
//       a.removeEventListener('play', handlePlay);
//       a.removeEventListener('pause', handlePause);
//     };
//   }, [next]);

//   useEffect(() => {
//     if (audioRef.current && current) {
//       audioRef.current.src = current.file_url;
//     }
//   }, [current]);

//   return (
//     <div className="text-center px-4 py-8">
//       <audio ref={audioRef} preload="metadata" />

//       {/* === Album Art / Record === */}
//       <div className="relative w-64 mx-auto">
//         <div className="bg-black p-2 rounded-full">
//           <div className="relative aspect-square rounded-full overflow-hidden border border-white/20">
//             {current.cover_url ? (
//               <Image
//                 src={current.cover_url}
//                 alt={current.title}
//                 fill
//                 className={`object-cover rounded-full transition-transform duration-700 ${
//                   playing ? 'spin-record' : ''
//                 }`}
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-700">
//                 <span className="text-gray-300 text-sm">No Cover</span>
//               </div>
//             )}
//             {loading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
//                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* === Song Title === */}
//       <h3 className="text-xl font-semibold my-3">{current.title}</h3>

//       {/* === Progress Bar === */}
//       <div className="max-w-sm mx-auto">
//         <div className="flex justify-between text-gray-400 text-sm">
//           <span>{formatTime(progress)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>

//         <div className="relative w-full mt-1">
//           <input
//             type="range"
//             min={0}
//             max={duration || 0}
//             value={progress}
//             step="0.1"
//             onChange={(e) => {
//               if (audioRef.current) audioRef.current.currentTime = +e.target.value;
//             }}
//             className="w-full h-[3px] bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
//           />
//         </div>
//       </div>

//       {/* === Player Controls === */}
//       <div className="flex justify-center gap-6 mt-5">
//         <button
//           onClick={prev}
//           disabled={loading}
//           className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform bg-white"
//         >
//           <Image src="/images/rewind-button.png" alt="Previous" width={26} height={26} />
//         </button>

//         <button
//           onClick={playing ? pause : play}
//           disabled={loading}
//           className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform bg-white"
//         >
//           <Image
//             src={playing ? '/images/pause.png' : '/images/play.png'}
//             alt={playing ? 'Pause' : 'Play'}
//             width={28}
//             height={28}
//           />
//         </button>

//         <button
//           onClick={next}
//           disabled={loading}
//           className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform bg-white"
//         >
//           <Image src="/images/forward-button.png" alt="Next" width={26} height={26} />
//         </button>

//         <button
//           onClick={() => {
//             const link = document.createElement('a');
//             link.href = current.file_url;
//             link.download = `${current.title}.mp3`;
//             link.click();
//           }}
//           className="p-2 border border-white rounded-full text-white hover:scale-105 transition-transform bg-white"
//         >
//           <Image src="/images/download.png" alt="Download" width={26} height={26} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Player;
// code works. buttons need styling improvements========================================================================================
// =============================================================================================
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
      } catch (err) {
        console.error('Error playing audio:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
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

  const next = useCallback(
    () => change((index + 1) % songs.length, true),
    [index, songs.length, change]
  );
  const prev = useCallback(
    () => change((index - 1 + songs.length) % songs.length, true),
    [index, songs.length, change]
  );

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
    if (audioRef.current && current) {
      audioRef.current.src = current.file_url;
    }
  }, [current]);

  return (
    <div className="text-center px-4 py-8 text-white">
      <audio ref={audioRef} preload="metadata" />

      {/* === Album Art === */}
      <div className="relative w-64 mx-auto">
        <div className="bg-black p-2 rounded-full">
          <div className="relative aspect-square rounded-full overflow-hidden border border-white/20">
            {current.cover_url ? (
              <Image
                src={current.cover_url}
                alt={current.title}
                fill
                className={`object-cover rounded-full transition-transform duration-700 ${
                  playing ? 'spin-record' : ''
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <span className="text-gray-300 text-sm">No Cover</span>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === Song Title === */}
      <h3 className="text-xl font-semibold my-3">{current.title}</h3>

      {/* === Progress Bar === */}
      <div className="max-w-sm mx-auto">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="relative w-full mt-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            step="0.1"
            onChange={(e) => {
              if (audioRef.current) audioRef.current.currentTime = +e.target.value;
            }}
            className="w-full h-[3px] bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              border: none;
            }
            input[type='range']::-moz-range-thumb {
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>
      </div>

      {/* === Player Controls (matching MiniPlayer style) === */}
      <div className="flex justify-center gap-6 mt-5">
        {/* Previous */}
        <button
          onClick={prev}
          disabled={loading}
          className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16 4v12l-8-6 8-6zM4 4h2v12H4V4z" />
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          onClick={playing ? pause : play}
          disabled={loading}
          className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={next}
          disabled={loading}
          className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4v12l8-6-8-6zm9 0h2v12h-2V4z" />
          </svg>
        </button>

        {/* Download */}
        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = current.file_url;
            link.download = `${current.title}.mp3`;
            link.click();
          }}
          className="p-2 border border-white rounded-full hover:scale-105 transition-transform"
          aria-label="Download"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 3v8l3.5-3.5 1.5 1.5-6 6-6-6 1.5-1.5L8 11V3h2zm-7 12v2h14v-2H3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Player;
