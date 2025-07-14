'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';

type Album = {
  id: string;
  title: string;
  cover_url: string;
  user_id: string;
  created_at: string;
};

type Song = {
  id: string;
  title: string;
  file_url: string;
  album_id: string;
  user_id: string;
  created_at: string;
};

type AlbumFormData = {
  title: string;
  cover: FileList;
};

type SongFormData = {
  title: string;
  audio: FileList;
  cover: FileList;
  album_id: string;
};

export default function MusicAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [view, setView] = useState<'createAlbum' | 'manageAlbums' | 'uploadSongs' | 'manageSongs'>('manageAlbums');

  // Album form
  const {
    register: registerAlbum,
    handleSubmit: handleSubmitAlbum,
    watch: watchAlbum,
    reset: resetAlbum,
    formState: { errors: errorsAlbum },
    setValue: setValueAlbum,
  } = useForm<AlbumFormData>();

  // Song form
  const {
    register: registerSong,
    handleSubmit: handleSubmitSong,
    reset: resetSong,
    formState: { errors: errorsSong },
  } = useForm<SongFormData>();

  const cover = watchAlbum('cover');

  // Fetch albums
  const fetchAlbums = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching albums:', error);
        toast.error('Failed to fetch albums');
      } else {
        setAlbums(data || []);
      }
    } catch (err) {
      console.error('Error in fetchAlbums:', err);
      toast.error('Failed to fetch albums');
    }
  }, [session?.user?.id]);

  // Fetch songs
  const fetchSongs = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching songs:', error);
        toast.error('Failed to fetch songs');
      } else {
        setSongs(data || []);
      }
    } catch (err) {
      console.error('Error in fetchSongs:', err);
      toast.error('Failed to fetch songs');
    }
  }, [session?.user?.id]);

  // Auth & session handling
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setLoading(false);
      } catch (err) {
        console.error('Error getting session:', err);
        setLoading(false);
      }
    };

    getSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Fetch albums & songs when session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchAlbums();
      fetchSongs();
    } else {
      setAlbums([]);
      setSongs([]);
    }
  }, [session?.user?.id, fetchAlbums, fetchSongs]);

  // Album form submit handler
  const onSubmitAlbum = async (data: AlbumFormData) => {
    if (!session?.user?.id) {
      toast.error('Not authenticated');
      return;
    }

    toast.loading(editingAlbum ? 'Updating album...' : 'Uploading album...');
    let coverUrl = editingAlbum?.cover_url;

    try {
      if (data.cover && data.cover.length > 0) {
        const file = data.cover[0];
        const ext = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;

        const { error: upErr } = await supabase.storage
          .from('album-covers')
          .upload(fileName, file);

        if (upErr) throw upErr;

        const { data: urlData } = supabase.storage
          .from('album-covers')
          .getPublicUrl(fileName);

        coverUrl = urlData.publicUrl;

        // Clean up old cover if editing
        if (editingAlbum?.cover_url) {
          const old = editingAlbum.cover_url.split('/').pop()!;
          await supabase.storage.from('album-covers').remove([old]);
        }
      }

      const albumData = {
        title: data.title,
        cover_url: coverUrl,
        user_id: session.user.id,
      };

      let result;
      if (editingAlbum) {
        result = await supabase
          .from('albums')
          .update(albumData)
          .eq('id', editingAlbum.id)
          .select();
      } else {
        result = await supabase.from('albums').insert([albumData]).select();
      }

      if (result.error) throw result.error;

      toast.dismiss();
      toast.success(editingAlbum ? 'Album updated!' : 'Album added!');
      resetAlbum();
      setEditingAlbum(null);
      setView('manageAlbums');
      fetchAlbums();
    } catch (err: unknown) {
  toast.dismiss();
  const errorMessage = err instanceof Error ? err.message : 'An error occurred';
  toast.error(errorMessage);
  console.error('Error:', err);
}

  };

  // Song form submit handler
  const onSubmitSong = async (data: SongFormData) => {
  if (!session?.user?.id) {
    toast.error('Not authenticated');
    return;
  }

  if (!data.audio || data.audio.length === 0) {
    toast.error('Please select an audio file to upload');
    return;
  }

  toast.loading('Uploading song...');

  try {
    // Upload audio file
    const audioFile = data.audio[0];
    const audioExt = audioFile.name.split('.').pop();
    const audioFileName = `${uuidv4()}.${audioExt}`;

    const { error: audioUploadError } = await supabase.storage
      .from('audio-files')
      .upload(audioFileName, audioFile);
    if (audioUploadError) throw audioUploadError;

    const { data: audioUrlData } = supabase.storage
      .from('audio-files')
      .getPublicUrl(audioFileName);

    // Upload song cover (optional)
    let coverUrl = '';
    if (data.cover && data.cover.length > 0) {
      const coverFile = data.cover[0];
      const coverExt = coverFile.name.split('.').pop();
      const coverFileName = `${uuidv4()}.${coverExt}`;

      const { error: coverUploadError } = await supabase.storage
        .from('song-covers')
        .upload(coverFileName, coverFile);

      if (coverUploadError) throw coverUploadError;

      const { data: coverUrlData } = supabase.storage
        .from('song-covers')
        .getPublicUrl(coverFileName);

      coverUrl = coverUrlData.publicUrl;
    }

    // Insert song into DB
    const songData = {
      title: data.title,
      file_url: audioUrlData.publicUrl,
      cover_url: coverUrl,
      album_id: data.album_id,
      user_id: session.user.id,
    };

    const { error: insertError } = await supabase.from('songs').insert([songData]);
    if (insertError) throw insertError;

    toast.dismiss();
    toast.success('Song uploaded!');
    resetSong();
    fetchSongs();
  } catch (err: unknown) {
  toast.dismiss();
  const errorMessage = err instanceof Error ? err.message : 'An error occurred';
  toast.error(errorMessage);
  console.error('Error:', err);
}

};


  const handleEditAlbum = (alb: Album) => {
    setEditingAlbum(alb);
    setValueAlbum('title', alb.title);
    setView('createAlbum');
  };

  const handleDeleteAlbum = async (alb: Album) => {
    if (!confirm(`Delete album "${alb.title}"? This will also delete all songs in this album.`)) return;

    toast.loading('Deleting album...');
    try {
      // Delete all songs belonging to this album
      const { data: albumSongs, error: songError } = await supabase
        .from('songs')
        .select('*')
        .eq('album_id', alb.id);

      if (songError) throw songError;

      if (albumSongs && albumSongs.length > 0) {
        // Remove audio files from storage
        for (const song of albumSongs) {
          const oldAudio = song.file_url.split('/').pop()!;
          await supabase.storage.from('audio-files').remove([oldAudio]);
        }
        // Delete songs from DB
        await supabase.from('songs').delete().eq('album_id', alb.id);
      }

      // Delete album cover image
      const oldCover = alb.cover_url.split('/').pop()!;
      await supabase.storage.from('album-covers').remove([oldCover]);

      // Delete album record
      const { error } = await supabase.from('albums').delete().eq('id', alb.id);
      if (error) throw error;

      toast.dismiss();
      toast.success('Album and its songs deleted');
      fetchAlbums();
      fetchSongs();
    } catch (err: unknown) {
  toast.dismiss();
  const errorMessage = err instanceof Error ? err.message : 'An error occurred';
  toast.error(errorMessage);
  console.error('Error:', err);
}

  };

  const handleDeleteSong = async (song: Song) => {
    if (!confirm(`Delete song "${song.title}"?`)) return;

    toast.loading('Deleting song...');
    try {
      // Remove audio file from storage
      const oldAudio = song.file_url.split('/').pop()!;
      await supabase.storage.from('audio-files').remove([oldAudio]);

      // Delete song record
      const { error } = await supabase.from('songs').delete().eq('id', song.id);
      if (error) throw error;

      toast.dismiss();
      toast.success('Song deleted');
      fetchSongs();
    } catch (err: unknown) {
  toast.dismiss();
  const errorMessage = err instanceof Error ? err.message : 'An error occurred';
  toast.error(errorMessage);
  console.error('Error:', err);
}

  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout error');
      } else {
        setSession(null);
        setAlbums([]);
        setSongs([]);
        toast.success('Logged out');
      }
    } catch (err) {
      console.error('Error in handleLogout:', err);
      toast.error('Logout error');
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!session) return <p className="text-white">Please log in</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Toaster />
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center underline mb-6">MUSIC ADMIN DASHBOARD</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setView('createAlbum')}
          className={`px-4 py-2 rounded cursor-pointer ${
            view === 'createAlbum' ? 'adminYellow' : 'bg-gray-700'
          }`}
        >
          {editingAlbum ? 'Edit Album' : 'Create Album'}
        </button>

        <button
          onClick={() => setView('manageAlbums')}
          className={`px-4 py-2 rounded cursor-pointer ${
            view === 'manageAlbums' ? 'adminYellow' : 'bg-gray-700'
          }`}
        >
          Manage Albums ({albums.length})
        </button>

        <button
          onClick={() => setView('uploadSongs')}
          className={`px-4 py-2 rounded cursor-pointer ${
            view === 'uploadSongs' ? 'adminYellow' : 'bg-gray-700'
          }`}
        >
          Upload Songs
        </button>

        <button
          onClick={() => setView('manageSongs')}
          className={`px-4 py-2 rounded cursor-pointer ${
            view === 'manageSongs' ? 'adminYellow' : 'bg-gray-700'
          }`}
        >
          Manage Songs ({songs.length})
        </button>
      </div>

      {view === 'createAlbum' && (
        <form
          onSubmit={handleSubmitAlbum(onSubmitAlbum)}
          className="space-y-4 max-w-xl mx-auto cursor-pointer"
        >
          <div>
            <label className="block font-semibold">Album Title</label>
            <input
              {...registerAlbum('title', { required: 'Title required' })}
              className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600"
            />
            {errorsAlbum.title && (
              <p className="text-red-500 text-sm">{errorsAlbum.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Album Cover</label>
            <input
              type="file"
              accept="image/*"
              {...registerAlbum('cover', { required: !editingAlbum })}
              className=" p-1 border-2 w-55 cursor-pointer"
            />
            {cover?.[0] && (
              <Image
                src={URL.createObjectURL(cover[0])}
                alt="Preview"
                width={300}
                height={150}
                className="mt-2 rounded"
              />
            )}
            {!cover?.[0] && editingAlbum?.cover_url && (
              <Image
                src={editingAlbum.cover_url}
                alt="Cover"
                width={300}
                height={150}
                className="mt-2 rounded"
              />
            )}
            {errorsAlbum.cover && (
              <p className="text-red-500 text-sm">{errorsAlbum.cover.message}</p>
            )}
          </div>

          <button type="submit" className="adminYellow font-bold px-4 py-2 rounded cursor-pointer">
            {editingAlbum ? 'Update Album' : 'Add Album'}
          </button>
        </form>
      )}

      {view === 'manageAlbums' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((alb) => (
            <div key={alb.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <Image
                src={alb.cover_url}
                alt={alb.title}
                width={600}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{alb.title}</h3>
                <button
                  onClick={() => handleEditAlbum(alb)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAlbum(alb)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'uploadSongs' && (
        <form
          onSubmit={handleSubmitSong(onSubmitSong)}
          className="space-y-4 max-w-xl mx-auto"
        >
          <div>
            <label className="block font-semibold">Song Title</label>
            <input
              {...registerSong('title', { required: 'Title required' })}
              className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600"
            />
            {errorsSong.title && (
              <p className="text-red-500 text-sm">{errorsSong.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Select Album</label>
            <select
              {...registerSong('album_id', { required: 'Please select an album' })}
              className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600 cursor-pointer"
            >
              <option value="">-- Select Album --</option>
              {albums.map((alb) => (
                <option key={alb.id} value={alb.id}>
                  {alb.title}
                </option>
              ))}
            </select>
            {errorsSong.album_id && (
              <p className="text-red-500 text-sm">{errorsSong.album_id.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              {...registerSong('audio', { required: true })}
              className=" p-1 border-2 w-55 cursor-pointer"
            />
            {errorsSong.audio && (
              <p className="text-red-500 text-sm">{errorsSong.audio.message}</p>
            )}
          </div>
<div>
    <label className="block font-semibold">Song Cover Image (optional)</label>
  <input
    type="file"
    accept="image/*"
    {...registerSong('cover')}
    className=" p-1 border-2 w-55 cursor-pointer"
  />
  </div>
          <button type="submit" className="adminYellow font-bold px-4 py-2 rounded cursor-pointer">
            Upload Song
          </button>
          <div>
</div>

        </form>
      )}

      {view === 'manageSongs' && (
        <div className="max-w-4xl mx-auto space-y-4">
          {songs.length === 0 && <p>No songs uploaded yet.</p>}

          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="mb-2 sm:mb-0">
                <h4 className="font-bold">{song.title}</h4>
                <p className="text-sm text-gray-400">
                  Album:{' '}
                  {albums.find((alb) => alb.id === song.album_id)?.title || 'Unknown'}
                </p>
                <audio controls src={song.file_url} className="mt-1 w-full sm:w-64" />
              </div>
              <button
                onClick={() => handleDeleteSong(song)}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
