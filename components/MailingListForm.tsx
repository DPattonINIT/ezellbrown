// 'use client';

// import { useState } from 'react';

// const MailingListForm = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');
//     setMessage('');
//     console.log('Submitting mailing list form:', { name, email });
//     try {
//       const res = await fetch('/api/submit-form', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || 'Something went wrong');

//       setStatus('success');
//       setMessage('Thanks for subscribing!');
//       setName('');
//       setEmail('');
//    } catch (error) {
//   const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//   console.error('Error submitting mailing list form:', errorMessage);
//   // handle the error or display it
// }

//   };

//   return (
//     <section className="w-full max-w-md mx-auto mt-10 p-4 sm:p-6 bg-white text-black rounded-xl  backdrop-blur-md font-sans">
//       <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">SIGN UP</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-1 text-center">
//           <label htmlFor="name" className="text-sm">Name</label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Your name"
//             className="px-4 py-2 border border-black bg-transparent text-black placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1 text-center">
//           <label htmlFor="email" className="text-sm">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             className="px-4 py-2 border border-black bg-transparent text-black placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition mt-2 uppercase cursor-pointer"
//           disabled={status === 'loading'}
//         >
//           {status === 'loading' ? 'Submitting...' : 'Submit'}
//         </button>
//         {message && (
//           <p className={`text-sm text-center mt-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
//             {message}
//           </p>
//         )}
//       </form>
//     </section>
//   );
// };

// export default MailingListForm;
// code above works, does not have styling========================================================
// ====================================================================================================

'use client';

import { useState } from 'react';

const MailingListForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setMessage('Thanks for signing up!');
      setName('');
      setEmail('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error submitting mailing list form:', errorMessage);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative w-full max-w-xl mx-auto p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-white/15 to-white/7 border border-white/30 backdrop-blur-lg text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:border-white/50">

      <h2 className="text-2xl font-bold text-center mb-2 tracking-wide">Sign Up</h2>
      <p className="text-sm text-gray-300 text-center mb-6">Join our community to get updates and exclusive releases.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-gray-300">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="px-4 py-2.5 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="px-4 py-2.5 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-black font-semibold py-2.5 rounded-md hover:bg-gray-200 transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
        >
          {status === 'loading' ? 'Submitting...' : 'Sign Up'}
        </button>

        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              status === 'error' ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Optional subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 pointer-events-none" />

    </section>
  );
};

export default MailingListForm;


