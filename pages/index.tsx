// import MailingListForm from '@/components/MailingListForm';
// import Player from '@/components/Player';

// export default function Home() {
//   return (
//     <main className="relative min-h-screen overflow-hidden text-amber-100 flex flex-col items-center px-4 py-12 font-sans">

     
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
//       >
//         <source src="/images/beachvid.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

     
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-0" />

    
//       <h1 className="brand-font text-5xl md:text-6xl text-yellow-300 z-10 drop-shadow-lg mb-8 text-center">
//         EZELL BROWN
//       </h1>

      
//       <div className="relative z-10 w-[95%] max-w-6xl bg-amber-50/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-yellow-300 overflow-hidden">
//         <Player />
//         <MailingListForm />
//       </div>
//     </main>
//   );
// }
// ========================================================================

// import MailingListForm from '@/components/MailingListForm';
// import Player from '@/components/Player';

// export default function Home() {
//   return (
//     <main className="relative min-h-screen overflow-hidden text-white flex flex-col items-center px-4 py-12 font-sans bg-black">

//       {/* Remove background video or replace with subtle loop later */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-10"
//       >
//         <source src="/images/beachvid.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay gradient (optional) */}
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/90 via-black/80 to-black z-0" />

//       {/* Title */}
//       <h1 className="text-5xl md:text-6xl text-futuristic-accent z-10 drop-shadow-lg mb-8 text-center font-semibold tracking-wide">
//         EZELL BROWN
//       </h1>

//       {/* Card container */}
//       <div className="relative z-10 w-[95%] max-w-6xl bg-futuristic-muted/60 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-futuristic-accent overflow-hidden">
//         <Player />
//         <MailingListForm />
//       </div>
//     </main>
//   );
// }

// ==========================================================Black Version above======================================

// import MailingListForm from "@/components/MailingListForm";
// import Player from "@/components/Player";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
//       {/* Solar Flare Background */}
//       <div className="solar-flare"></div>

//       {/* Site Title */}
//       <h1 className="text-5xl md:text-6xl font-bolder mb-8 text-center tracking-wide">
//         EZELL BROWN
//       </h1>

//       {/* Content Container */}
//       <div className="w-full max-w-4xl bg-black bg-opacity-70 backdrop-blur-md p-6 rounded-xl shadow-2xl ">
//         <Player />
//         <MailingListForm />
//       </div>
//     </main>
//   );
// }

// =========================================================
import MailingListForm from "@/components/MailingListForm";
import Player from "@/components/Player";
import Image from 'next/image';


export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-black">

      {/* <div className="solar-flare absolute inset-0 z-0"></div> */}

      {/* Hero Title - Better responsive scaling */}
       <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[3/1]  z-10 rounded-lg overflow-hidden ">
        <Image
          src="/images/header.jpeg"
          alt="Ezell Brown"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Content Container - Better responsive width and spacing */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-black bg-opacity-70 backdrop-blur-md p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl z-10">
        
        {/* Desktop: Side by side layout, Mobile: Stacked */}
        <div className="flex flex-col lg:gap-8 xl:gap-12 items-center lg:items-center">
          
          {/* Player Section */}
          <div className="w-full lg:flex-1  lg:mb-0">
            <Player />
          </div>
          
          {/* Mailing List Section */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <MailingListForm />
          </div>
          
        </div>
      </div>
    </main>
  );
}