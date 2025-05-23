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

//       // Debug response status
//       console.log('Response status:', res.status);
      
//       try {
//         const data = await res.json();
        
//         if (!res.ok) throw new Error(data.error || 'Something went wrong');

//         setStatus('success');
//         setMessage('Thanks for subscribing!');
//         setName('');
//         setEmail('');
//       } catch (jsonError) {
//         console.error('Error parsing JSON response:', jsonError);
//         throw new Error(`Failed to parse response: ${res.status} ${res.statusText}`);
//       }
//     } catch (err: any) {
//       console.error('Form submission error:', err);
//       setStatus('error');
//       setMessage(err.message || 'Failed to subscribe.');
//     }
//   };

//   return (
//     <section className="w-full max-w-md mx-auto p-6 bg-black text-white rounded-xl shadow-lg border border-yellow-400 backdrop-blur-md flex-1">
//       <h2 className="text-2xl font-bold text-center mb-4 text-white">
//         Join the Mailing List
//       </h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-1">
//           <label htmlFor="name" className="text-sm text-gray-300">Name</label>
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

//         <div className="flex flex-col gap-1">
//           <label htmlFor="email" className="text-sm text-gray-300">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Your.email@example.com"
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
//           <p
//             className={`text-sm text-center mt-2 ${
//               status === 'error' ? 'text-red-400' : 'text-green-400'
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </section>
//   );
// };

// export default MailingListForm;
// ==============================above works =================================


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
    } catch (err: any) {
      console.error('Form submission error:', err);
      setStatus('error');
      setMessage(err.message || 'Failed to subscribe.');
    }
  };

  return (
    <section className="w-full max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-xl shadow-lg  backdrop-blur-md font-sans">
      <h2 className="text-2xl font-bold text-center mb-4 underline">JOIN THE MAILING LIST</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <label htmlFor="name" className="text-sm text-white">Name</label>
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
          <label htmlFor="email" className="text-sm text-white">Email</label>
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

// // ======================================================================== 2nd newest version


// // "use client";

// // import { useState } from "react";

// // const MailingListForm = () => {
// //   const [email, setEmail] = useState("");
// //   const [name, setName] = useState("");
// //   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setStatus("loading");

// //     try {
// //       // Simulate an API call
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       setStatus("success");
// //       setEmail("");
// //       setName("");
// //     } catch (error) {
// //       console.error("Mailing list signup error:", error);
// //       setStatus("error");
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="mt-8 w-full max-w-md mx-auto text-sm text-white"
// //     >
// //       <h2 className="text-xl text-white font-semibold mb-4 text-center">
// //         Join the Mailing List
// //       </h2>

// //       <div className="mb-4 text-center">
// //         <label htmlFor="name" className="block mb-1 text-white">
// //           Name
// //         </label>
// //         <input
// //           id="name"
// //           type="text"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           placeholder="Your name"
// //           className="w-full px-4 py-2 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //         />
// //       </div>

// //       <div className="mb-4 text-center">
// //         <label htmlFor="email" className="block mb-1 text-white">
// //           Email
// //         </label>
// //         <input
// //           id="email"
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="you@example.com"
// //           className="w-full px-4 py-2 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //           required
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={status === "loading"}
// //         className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition"
// //       >
// //         {status === "loading" ? "Submitting..." : "Subscribe"}
// //       </button>

// //       {status === "success" && (
// //         <p className="mt-3 text-green-400 text-center">Thanks for subscribing!</p>
// //       )}
// //       {status === "error" && (
// //         <p className="mt-3 text-red-500 text-center">
// //           Something went wrong. Please try again.
// //         </p>
// //       )}
// //     </form>
// //   );
// // };

// // export default MailingListForm;
