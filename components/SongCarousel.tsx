'use client';
import { songs } from '../utils/songData';

const SongCarousel = () => {
  return (
    <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
      {songs.map((song) => (
        <img
          key={song.id}
          src={song.cover}
          alt={song.title}
          className="inline-block w-32 h-32 object-cover mx-2 rounded-md border-2 border-white hover:scale-105 transition-transform"
        />
      ))}
    </div>
  );
};

export default SongCarousel;
