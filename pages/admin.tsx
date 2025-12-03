'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';

type FormData = {
  title: string;
  date: Date;
  location: string;
  link: string;
  image: FileList;
};

type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image_url: string;
  user_id: string;
};


const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [view, setView] = useState<'create' | 'manage'>('create');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>();

  const image = watch('image');

  const fetchEvents = useCallback(async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: true });

    if (!error) {
      setEvents(data || []);
    } else {
      toast.error('Failed to fetch events');
    }
  }, [session]);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
      } else {
        setSession(data.session);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchEvents();
  }, [session, fetchEvents]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    const { data, error } =
      authMode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(authMode === 'login' ? 'Logged in!' : 'Check your email to confirm signup.');
      if (data.session) setSession(data.session);
    }
  };

  const onSubmit = async (data: FormData) => {
    toast.loading(editingEvent ? 'Updating event...' : 'Uploading event...');
    let imageUrl = editingEvent?.image_url;

    try {
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;

        if (editingEvent?.image_url) {
          const oldFileName = editingEvent.image_url.split('/').pop();
          await supabase.storage.from('event-images').remove([oldFileName!]);
        }
      }

      const eventData = {
        title: data.title,
        date: data.date.toISOString(),
        location: data.location || null,
        link: data.link || null,
        image_url: imageUrl,
        user_id: session!.user.id,
      };

      let result;
      if (editingEvent) {
        result = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id)
          .eq('user_id', session!.user.id)
          .select();
      } else {
        result = await supabase.from('events').insert([eventData]).select();
      }

      if (result.error) throw result.error;

      toast.dismiss();
      toast.success(editingEvent ? 'Event updated!' : 'Event added!');
      reset();
      setEditingEvent(null);
      fetchEvents();
      setView('manage');
    } catch (err: unknown) {
      toast.dismiss();
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setValue('title', event.title);
    setValue('date', new Date(event.date));
    setValue('location', event.location || '');
    setValue('link', event.link || '');
    setView('create');
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Delete "${event.title}"?`)) return;

    toast.loading('Deleting event...');
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id)
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      const fileName = event.image_url.split('/').pop();
      await supabase.storage.from('event-images').remove([fileName!]);

      toast.dismiss();
      toast.success('Deleted!');
      fetchEvents();
    } catch (err: unknown) {
      toast.dismiss();
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    reset();
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error('Logout error');
    else {
      setSession(null);
      toast.success('Logged out');
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">
          🔐 {authMode === 'login' ? 'Admin Login' : 'Create Account'}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4 w-full max-w-sm">
          <input name="email" type="email" placeholder="Email" required className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600" />
          <input name="password" type="password" placeholder="Password" required className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600" />
          <button type="submit" className="w-full adminYellow font-bold px-4 py-2 rounded">
            {authMode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="mt-4 text-sm underline text-gray-400 hover:text-white">
          {authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-end mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 cursor-pointer">
          Logout
        </button>
      </div>

      {/* ANALYTICS DASHBOARD */}
<div className="bg-[#1a1a1a] p-6 rounded-lg mb-10 border border-gray-700">
  <h2 className="text-2xl font-bold mb-4 text-center underline">Site Analytics</h2>

  <iframe
    width="100%"
    height="600"
    src="https://lookerstudio.google.com/embed/reporting/c0e79329-d237-487b-b755-730cd7fb6a8a/page/JqlhF"
    // frameBorder="0"
    style={{ border: 0 }}
    allowFullScreen
    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
  ></iframe>
</div>


      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <h1 className="text-3xl font-bold text-center underline mb-6">EVENT ADMIN DASHBOARD</h1>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => setView('create')} className={`px-4 py-2 rounded cursor-pointer ${view === 'create' ? 'adminYellow' : 'bg-gray-700 text-white'}`}>
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </button>
              <button onClick={() => setView('manage')} className={`px-4 py-2 rounded cursor-pointer ${view === 'manage' ? 'adminYellow' : 'bg-gray-700 text-white'}`}>
                Manage Events ({events.length})
              </button>
            </div>
            <div className="bg-gray-800 p-2 px-4 rounded text-sm border border-gray-700 ml-auto">
              Logged in as: {session.user.email}
            </div>
          </div>
        </div>

        {view === 'create' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">{editingEvent ? `Edit: ${editingEvent.title}` : 'Create New Event'}</h2>
            {editingEvent && (
              <button onClick={handleCancelEdit} className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer">
                Cancel Edit
              </button>
            )}
            <div>
              <label className="block mb-1 font-semibold">EVENT TITLE</label>
              <input {...register('title', { required: 'Title is required' })} className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">DATE</label>
              <DatePicker
                selected={watch('date')}
                onChange={(date: Date | null) => date && setValue('date', date)}
                className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600 text-white cursor-pointer"
                placeholderText="Select event date"
              />
              {errors.date && <p className="text-red-500 text-sm">Date is required</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">LOCATION</label>
              <input {...register('location')} className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600" />
            </div>

            <div>
              <label className="block mb-1 font-semibold">RSVP LINK</label>
              <input {...register('link')} className="w-full p-2 bg-[#1a1a1a] rounded border border-gray-600" />
            </div>

            <div>
              <label className="block mb-1 font-semibold">IMAGE {editingEvent && '(optional)'}</label>
              <input type="file" {...register('image', { required: !editingEvent })} accept="image/*" className="text-white cursor-pointer  p-1 border-2 w-55 rounded" />
              {image?.[0] && (
                <Image
                  src={URL.createObjectURL(image[0])}
                  alt="Preview"
                  width={400}
                  height={128}
                  className="mt-2 rounded object-cover"
                />
              )}
              {!image?.[0] && editingEvent?.image_url && (
                <Image
                  src={editingEvent.image_url}
                  alt={editingEvent.title}
                  width={400}
                  height={128}
                  className="mt-2 rounded object-cover"
                />
              )}
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <button type="submit" className="adminYellow font-bold px-4 py-2 rounded cursor-pointer">
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">MANAGE EVENTS</h2>
            {events.length === 0 ? (
              <p className="text-gray-400">No events created yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      width={600}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400 mb-1">{event.location}</p>
                      <p className="adminYellowText mb-4">{new Date(event.date).toLocaleDateString()}</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(event)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 text-sm cursor-pointer">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(event)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
