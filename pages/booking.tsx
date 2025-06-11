'use client';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const BookingForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setStatus('success');
      setFeedback('Booking request submitted!');
      setForm({ name: '', email: '', message: '' });
   } catch {
  setStatus('error');
  setFeedback('Failed to submit booking. Please try again.');
}

  };

  return (
    <section className="max-w-lg mx-auto mt-10 bg-black text-white p-6 rounded-xl shadow-lg font-sans">
      <Sidebar />
      <h2 className="text-2xl font-bold mb-4 text-center underline">Book Ezell for Your Event</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded bg-transparent border border-white placeholder-gray-400"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded bg-transparent border border-white placeholder-gray-400"
          required
        />
        <textarea
          name="message"
          placeholder="Tell us about your event (date, location, vibe...)"
          value={form.message}
          onChange={handleChange}
          className="p-3 rounded bg-transparent border border-white placeholder-gray-400"
          rows={5}
          required
        />
        <button
          type="submit"
          className="ezellYellow text-black font-bold py-2 rounded uppercase tracking-wider disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
        </button>
        {feedback && (
          <p className={`text-center text-sm mt-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
};

export default BookingForm;
