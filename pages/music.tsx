// import Sidebar from "@/components/Sidebar";
// import Player from "@/components/Player";

// export default function MusicPage() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white w-full">
//         <div className="w-full max-w-4xl">
//           <Player />
//         </div>
//       </main>
//     </div>
//   );
// }
// ====Above is the original code, below is the modified code for music.tsx ====
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";

export default function MusicPage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <main className="w-full p-2 sm:p-4 lg:p-10 flex flex-col items-center justify-center bg-black text-white relative fade-in-slow overflow-x-hidden">
        <div className="w-full max-w-4xl bg-gradient-to-br from-black via-zinc-900 to-black p-3 sm:p-4 lg:p-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.08)]">
          <Player />
        </div>
      </main>
    </div>
  );
}