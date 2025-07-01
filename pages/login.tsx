// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useRouter } from 'next/router';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.message);
//     } else {
//       router.push('/admin');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <form onSubmit={handleLogin} className="bg-[#1a1a1a] p-8 rounded shadow max-w-md w-full space-y-4">
//         <h2 className="text-xl font-bold">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 rounded bg-black border border-gray-600 text-white"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 rounded bg-black border border-gray-600 text-white"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded font-bold">
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
// ==========================================================

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } =
      authMode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      if (authMode === 'login') {
        router.push('/admin');
      } else {
        alert('Account created! Check your email for confirmation.');
        setAuthMode('login');
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
  <h1 className="loginYellowText text-center text-4xl md:text-5xl font-bold mb-4 border-b pb-2">
    WELCOME
  </h1>

  <form
    onSubmit={handleAuth}
    className="bg-[#1a1a1a] p-8 rounded shadow max-w-md w-full space-y-4"
  >
    <h2 className="text-xl font-bold">
      {authMode === 'login' ? 'Admin Login' : 'Create Account'}
    </h2>

    <input
      type="email"
      placeholder="Email"
      className="w-full p-2 rounded bg-black border border-gray-600 text-white"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full p-2 rounded bg-black border border-gray-600 text-white"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button
      type="submit"
      className="ezellYellow text-black px-4 py-2 rounded font-bold w-full cursor-pointer"
    >
      {authMode === 'login' ? 'Log In' : 'Sign Up'}
    </button>

    <button
      type="button"
      onClick={() =>
        setAuthMode((prev) => (prev === 'login' ? 'signup' : 'login'))
      }
      className="w-full text-sm mt-2 underline text-gray-400 hover:text-white"
    >
      {authMode === 'login'
        ? 'Need an account? Sign up'
        : 'Already have an account? Log in'}
    </button>
  </form>
</div>
  );
};

export default LoginPage;

