// 'use client';

// import { useEffect, useState } from 'react';
// import ShaderBackground from '@/components/ShaderBackground';
// import Image from 'next/image';
// import Link from 'next/link';
// import MiniPlayer from '@/components/MiniPlayer';
// import { supabase } from '@/lib/supabase';
// import { Song } from '@/components/Player';

// export default function Home() {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

//       {/* Top bar */}
//       <div className="absolute top-4 left-4 sm:left-6 text-sm sm:text-lg font-bold uppercase tracking-widest z-50">
//         EZELL BROWN
//       </div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex absolute top-4 right-6 gap-6 text-sm uppercase font-medium">
//         {['Music', 'Info', 'Events', 'Sign Up'].map((item) => (
//           <Link 
//             key={item} 
//             href={`/${item.toLowerCase().replace(' ', '')}`}
//             className="hover:opacity-70 transition-opacity duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//           >
//             {item}
//           </Link>
//         ))}
//       </nav>

//       {/* Mobile Hamburger Button */}
//       <button
//         className="md:hidden absolute top-4 right-4 z-50 p-2"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         aria-label="Toggle menu"
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           {mobileMenuOpen ? (
//             <path d="M6 18L18 6M6 6l12 12" />
//           ) : (
//             <path d="M4 6h16M4 12h16M4 18h16" />
//           )}
//         </svg>
//       </button>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8">
//           {['Music', 'Info', 'Events', 'Sign Up'].map((item) => (
//             <Link 
//               key={item} 
//               href={`/${item.toLowerCase().replace(' ', '')}`}
//               className="text-2xl uppercase font-medium hover:opacity-70 transition-opacity"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}

//       <div className="absolute bottom-4 right-4 sm:right-6">
//         <Image
//           src="/EB_FAVICOwhite.png"
//           alt="Ezellphoto Logo"
//           width={40}
//           height={40}
//           className="opacity-80"
//         />
//       </div>

//       <div className="absolute bottom-4 left-4 sm:left-6">
//         {!loading && songs.length > 0 ? (
//           <MiniPlayer songs={songs} />
//         ) : (
//           <div className="text-sm text-gray-400">Loading music...</div>
//         )}
//       </div>
//     </div>
//   );
// }
// ====code works, text needs resizing===================================================================

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
            <MiniPlayer songs={songs} />
          ) : (
            <div className="text-sm text-gray-400">Loading music...</div>
          )}
        </div>

        {/* Logo stays aligned with miniplayer */}
        <div className="flex-shrink-0">
          <Image
            src="/EB_FAVICOwhite.png"
            alt="Ezell Logo"
            width={40}
            height={40}
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
