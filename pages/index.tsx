// 'use client';
// import { useEffect, useState } from 'react';
// import ShaderBackground from '@/components/ShaderBackground';
// import Image from 'next/image';
// import MiniPlayer from '@/components/MiniPlayer';
// import Navbar from '@/components/Navbar';
// import { supabase } from '@/lib/supabase';
// import { Song } from '@/components/Player';

// export default function Home() {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLatestSong = async () => {
//       const { data, error } = await supabase
//         .from('songs')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching songs for homepage:', error);
//       } else {
//         setSongs(data || []);
//       }
//       setLoading(false);
//     };

//     fetchLatestSong();
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full text-white">
//       <ShaderBackground />
//       <Navbar />

//       {/* === Bottom Bar: Player + Logo === */}
//       <div className="fixed bottom-4 left-0 w-full flex items-center justify-between px-6 sm:px-8 z-40">
//         {/* Mini Player */}
//         <div className="flex items-center">
//           {!loading && songs.length > 0 ? (
//             <MiniPlayer songs={songs} />
//           ) : (
//             <div className="text-sm text-gray-400">Loading music...</div>
//           )}
//         </div>

//         {/* Logo stays aligned with miniplayer */}
//         <div className="flex-shrink-0">
//           <Image
//             src="/EB_FAVICOwhite.png"
//             alt="Ezell Logo"
//             width={40}
//             height={40}
//             className="opacity-100 filter brightness-150"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// Code works ezell hide image feature isnt included=================================================================
// =================================================================================================================

'use client';

import { useEffect, useState } from 'react';
import ShaderBackground from '@/components/ShaderBackground';
import Image from 'next/image';
import MiniPlayer from '@/components/MiniPlayer';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { Song } from '@/components/Player';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const [playerExpanded, setPlayerExpanded] = useState(false); // NEW

  useEffect(() => {
    const fetchLatestSong = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching songs for homepage:', error);
      } else {
        setSongs(data || []);
      }
      setLoading(false);
    };

    fetchLatestSong();
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white">
      <ShaderBackground />
      <Navbar />

      {/* === Bottom Bar: Player + Logo === */}
      <div className="fixed bottom-4 left-0 w-full flex items-center justify-between px-6 sm:px-8 z-40">
        {/* Mini Player */}
        <div className="flex items-center">
          {!loading && songs.length > 0 ? (
            <MiniPlayer
              songs={songs}
              onExpandChange={setPlayerExpanded} // NEW
            />
          ) : (
            <div className="text-sm text-gray-400">Loading music...</div>
          )}
        </div>

        {/* Logo fades out when player expands */}
        <div
          className={`flex-shrink-0 transition-opacity duration-300 ${
            playerExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Image
            src="/EB_FAVICOwhite.png"
            alt="Ezell Logo"
            width={40}
            height={40}
            className="filter brightness-150"
          />
        </div>
      </div>
    </div>
  );
}

