// 'use client';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import Image from 'next/image';
// import Player, { Song as PlayerSong } from '@/components/Player';
// import Navbar from '@/components/Navbar';

// type Album = {
//   id: string;
//   title: string;
//   cover_url: string;
// };

// export default function MusicPage() {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
//   const [songs, setSongs] = useState<PlayerSong[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [songsLoading, setSongsLoading] = useState(false);

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('albums')
//           .select('id,title,cover_url')
//           .order('created_at', { ascending: false });

//         if (error) console.error('Error fetching albums:', error);
//         else setAlbums(data || []);
//       } catch (err) {
//         console.error('Error in fetchAlbums:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       if (!selectedAlbum) return;
//       setSongsLoading(true);

//       try {
//         const { data, error } = await supabase
//           .from('songs')
//           .select('*')
//           .eq('album_id', selectedAlbum.id);

//         if (error) console.error('Error fetching songs:', error);
//         else setSongs(data || []);
//       } catch (err) {
//         console.error('Error in fetchSongs:', err);
//       } finally {
//         setSongsLoading(false);
//       }
//     };

//     fetchSongs();
//   }, [selectedAlbum]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         <p className="text-xl">Loading albums...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />

//       <div className="pt-[160px] px-4"> {/* Padding for navbar height */}
//         <h1 className="text-4xl text-center py-8">Albums</h1>

//         {albums.length === 0 ? (
//           <p className="text-center text-gray-400">No albums found</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {albums.map((album) => (
//               <div
//                 key={album.id}
//                 className="cursor-pointer hover:opacity-80 transition-opacity"
//                 onClick={() => setSelectedAlbum(album)}
//               >
//                 {album.cover_url ? (
//                   <Image
//                     src={album.cover_url}
//                     alt={album.title}
//                     width={300}
//                     height={300}
//                     className="rounded w-full h-auto"
//                   />
//                 ) : (
//                   <div className="w-full h-[300px] bg-gray-700 rounded flex items-center justify-center">
//                     <span className="text-gray-300 text-sm">No Cover</span>
//                   </div>
//                 )}
//                 <p className="mt-2 text-center">{album.title}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedAlbum && (
//           <>
//             <div className="flex items-center justify-center py-6">
//               <button
//                 onClick={() => setSelectedAlbum(null)}
//                 className="mr-4 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded cursor-pointer"
//               >
//                 ← Back to Albums
//               </button>
//               <h2 className="text-2xl">{selectedAlbum.title}</h2>
//             </div>

//             {songsLoading ? (
//               <p className="text-center text-gray-400">Loading songs...</p>
//             ) : songs.length > 0 ? (
//               <>
//                 <div className="text-center mb-4">
//                   <h3 className="text-lg text-white">Songs in this album:</h3>
//                   <ul className="text-sm text-white mt-2">
//                     {songs.map((song, i) => (
//                       <li key={song.id}>
//                         {i + 1}. {song.title}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <Player songs={songs} />
//               </>
//             ) : (
//               <div className="text-center">
//                 <p className="text-gray-400">No songs found in this album</p>
//                 {/* <p className="text-xs text-gray-500 mt-2">
//                   Make sure songs are uploaded with album_id: {selectedAlbum.id}
//                 </p> */}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// Code above works, autoscroll funtcion isnt applied===================================================================================
// ====================================================================================================

'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Player, { Song as PlayerSong } from '@/components/Player';
import Navbar from '@/components/Navbar';

type Album = {
  id: string;
  title: string;
  cover_url: string;
};

export default function MusicPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<PlayerSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState(false);

  // 👇 Ref for auto-scrolling to player
  const playerRef = useRef<HTMLDivElement | null>(null);

  // 👇 Optional ref for scrolling back to top
  const topRef = useRef<HTMLDivElement | null>(null);

  // Fetch albums on mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data, error } = await supabase
          .from('albums')
          .select('id,title,cover_url')
          .order('created_at', { ascending: false });

        if (error) console.error('Error fetching albums:', error);
        else setAlbums(data || []);
      } catch (err) {
        console.error('Error in fetchAlbums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Fetch songs for the selected album
  useEffect(() => {
    const fetchSongs = async () => {
      if (!selectedAlbum) return;
      setSongsLoading(true);

      try {
        const { data, error } = await supabase
          .from('songs')
          .select('*')
          .eq('album_id', selectedAlbum.id);

        if (error) console.error('Error fetching songs:', error);
        else setSongs(data || []);
      } catch (err) {
        console.error('Error in fetchSongs:', err);
      } finally {
        setSongsLoading(false);
      }
    };

    fetchSongs();
  }, [selectedAlbum]);

  // 👇 Auto-scroll to player once songs are loaded
  useEffect(() => {
    if (!songsLoading && selectedAlbum && playerRef.current) {
      const timeout = setTimeout(() => {
        playerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [songsLoading, selectedAlbum]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading albums...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* 👇 Reference point for scrolling back to top */}
      <div ref={topRef} className="pt-[160px] px-4">
        <h1 className="text-4xl text-center py-8">Albums</h1>

        {albums.length === 0 ? (
          <p className="text-center text-gray-400">No albums found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedAlbum(album)}
              >
                {album.cover_url ? (
                  <Image
                    src={album.cover_url}
                    alt={album.title}
                    width={300}
                    height={300}
                    className="rounded w-full h-auto"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-gray-300 text-sm">No Cover</span>
                  </div>
                )}
                <p className="mt-2 text-center">{album.title}</p>
              </div>
            ))}
          </div>
        )}

        {selectedAlbum && (
          <>
            <div className="flex items-center justify-center py-6">
              <button
                onClick={() => {
                  setSelectedAlbum(null);
                  // 👇 Optional: scroll back to top when leaving album
                  setTimeout(() => {
                    topRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="mr-4 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded cursor-pointer"
              >
                ← Back to Albums
              </button>
              <h2 className="text-2xl">{selectedAlbum.title}</h2>
            </div>

            {songsLoading ? (
              <p className="text-center text-gray-400">Loading songs...</p>
            ) : songs.length > 0 ? (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg text-white">Songs in this album:</h3>
                  <ul className="text-sm text-white mt-2">
                    {songs.map((song, i) => (
                      <li key={song.id}>
                        {i + 1}. {song.title}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 👇 Scroll target */}
                <div ref={playerRef}>
                  <Player songs={songs} />
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-400">No songs found in this album</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

