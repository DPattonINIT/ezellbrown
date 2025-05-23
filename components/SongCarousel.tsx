// 'use client';

// import Image from 'next/image'; 

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
//   if (!songs || songs.length === 0) return null;

//   return (
//     <div className="overflow-x-auto whitespace-nowrap py-4 px-2 mt-4 flex items-center justify-center">
//       {songs.map((song, index) => (
//         <div key={song.id || index} className="inline-block text-center mx-2 w-24">
//           <div
//             className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-transform hover:scale-105 hover:opacity-90 ${
//               index === currentSongIndex
//                 ? 'border-yellow-300 ring-2 ring-yellow-400'
//                 : 'border-amber-100'
//             }`}
//             onClick={() => onSelectSong(index)}
//             title={`Play ${song.title}`}
//           >
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
//             className="text-[10px] text-amber-100 mt-2 font-semibold leading-tight truncate"
//             title={song.title}
//           >
//             {song.title.split(' - ')[1]?.split('(')[0] || song.title}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SongCarousel;

// ========================================= old version above =========================================

"use client";

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
  if (!songs || songs.length === 0) return null;

  return (
    <div className="overflow-x-auto whitespace-nowrap py-4 px-2 mt-4 flex items-center justify-center">
      {songs.map((song, index) => (
        <div key={song.id || index} className="inline-block text-center mx-2 w-24">
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

// ===============================================================
// "use client";

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
//   if (!songs || songs.length === 0) return null;

//   return (
//     <div className="w-full mt-4 px-2">
//       <div
//         className="flex overflow-x-auto gap-4 py-2 sm:justify-center"
//         style={{
//           scrollbarColor: "#888 transparent",
//           scrollbarWidth: "thin",
//         }}
//       >
//         {songs.map((song, index) => (
//           <div key={song.id} className="flex-none w-20 sm:w-24 text-center">
//             <div
//               className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-transform hover:scale-105 ${
//                 index === currentSongIndex
//                   ? "border-yellow-500 ring-2 ring-yellow-600"
//                   : "border-white"
//               }`}
//               onClick={() => onSelectSong(index)}
//             >
//               <Image
//                 src={song.cover}
//                 alt={song.title}
//                 fill
//                 sizes="96px"
//                 className="object-cover"
//                 priority={index === currentSongIndex}
//               />
//             </div>
//             <p
//               className="text-[10px] text-white mt-2 font-semibold leading-tight truncate"
//               title={song.title}
//             >
//               {song.title.split(" - ")[1]?.split("(")[0] || song.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SongCarousel;
