'use client';

import { useRef, useState, useEffect } from 'react';
import { songs } from '../utils/songData';

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
                        console.error('Play error:', err);
                        setIsPlaying(false);
                    });
                }
            }
        }
    }, [currentIndex]);

    return (
        <div className="text-center">
            <img
                src={currentSong.cover}
                alt="cover"
                className="w-full max-w-md mx-auto object-cover rounded-lg shadow-lg ring-4 ring-white"
            />
            <h1 className="text-2xl font-retro text-white mt-4">{currentSong.title}</h1>

            {/* <div className="flex justify-center items-center gap-6 my-4 text-3xl text-white">
        <button onClick={handlePrev}>⏮</button>
        {isPlaying ? (
          <button onClick={pauseSong}>⏸</button>
        ) : (
          <button onClick={playSong}>▶️</button>
        )}
        <button onClick={handleNext}>⏭</button>
        <a href={currentSong.file} download title="Download">
          ⬇️
        </a>
      </div> */}

            <div className="flex justify-center items-center gap-4 my-6">
                <button
                    onClick={handlePrev}
                    className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition"
                    title="Previous"
                >
                    ⏮
                </button>

                {isPlaying ? (
                    <button
                        onClick={pauseSong}
                        className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition"
                        title="Pause"
                    >
                        ⏸
                    </button>
                ) : (
                    <button
                        onClick={playSong}
                        className="bg-white p-2 rounded-full shadow hover:bg-yellow-300 transition"
                        title="Play"
                    >
                        <img src="/images/play.png" alt="Play" className="w-6 h-6" />
                    </button>
                )}

                <button
                    onClick={handleNext}
                    className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition"
                    title="Next"
                >
                    ⏭
                </button>

                <a
                    href={currentSong.file}
                    download
                    title="Download"
                    className="bg-yellow-300 p-2 rounded-full shadow hover:bg-yellow-400 transition"
                >
                    <img src="/images/download.png" alt="Download" className="w-6 h-6" />
                </a>
            </div>


            <audio ref={audioRef} src={currentSong.file} preload="auto" />
        </div>
    );
};

export default Player;
