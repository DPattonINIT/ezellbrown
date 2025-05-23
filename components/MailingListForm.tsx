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
//     } catch (err: any) {
//       console.error('Form submission error:', err);
//       setStatus('error');
//       setMessage(err.message || 'Failed to subscribe.');
//     }
//   };

//   return (
//     <section className="w-full max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-xl shadow-lg  backdrop-blur-md font-sans">
//       <h2 className="text-2xl font-bold text-center mb-4 underline">JOIN THE MAILING LIST</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-1 text-center">
//           <label htmlFor="name" className="text-sm text-white">Name</label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Your name"
//             className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1 text-center">
//           <label htmlFor="email" className="text-sm text-white">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition mt-2"
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

// ==================================================================================

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
      setMessage('Thanks for subscribing!');
      setName('');
      setEmail('');
   } catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error('Error submitting mailing list form:', errorMessage);
  // handle the error or display it
}

  };

  return (
    <section className="w-full max-w-md mx-auto mt-10 p-4 sm:p-6 bg-black text-white rounded-xl shadow-lg backdrop-blur-md font-sans">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 underline">JOIN THE MAILING LIST</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <label htmlFor="name" className="text-sm">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1 text-center">
          <label htmlFor="email" className="text-sm">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="px-4 py-2 border border-white bg-transparent text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition mt-2"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>

        {message && (
          <p className={`text-sm text-center mt-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </form>
    </section>
  );
};

export default MailingListForm;
