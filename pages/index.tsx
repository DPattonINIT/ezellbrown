// import MailingListForm from "@/components/MailingListForm";
// import Player from "@/components/Player";
// import Sidebar from "@/components/Sidebar";
// import Image from 'next/image';


// export default function Home() {
//   return (
//      <div className="flex">
//       <Sidebar />
//     <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-black">


//       {/* Hero Title - Better responsive scaling */}
//        <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[3/1]  z-10 rounded-lg overflow-hidden ">
//         <Image
//           src="/images/header.jpeg"
//           alt="Ezell Brown"
//           fill
//           className="object-contain"
//           priority
//            sizes="(max-width: 640px) 100vw,
//          (max-width: 768px) 90vw,
//          (max-width: 1024px) 80vw,
//          50vw"
//         />
//       </div>

//       {/* Main Content Container - Better responsive width and spacing */}
//       <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-black bg-opacity-70 backdrop-blur-md p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl z-10">
        
//         {/* Desktop: Side by side layout, Mobile: Stacked */}
//         <div className="flex flex-col lg:gap-8 xl:gap-12 items-center lg:items-center">
          
//           {/* Player Section */}
//           <div className="w-full lg:flex-1  lg:mb-0">
//             <Player />
//           </div>
          
//           {/* Mailing List Section */}
//           <div className="w-full lg:w-auto lg:flex-shrink-0">
//             <MailingListForm />
//           </div>
          
//         </div>
//       </div>
//     </main>
//     </div>
//   );
// }

// =============================ABOVE IS THE ORIGINAL CODE========================
import Sidebar from "@/components/Sidebar";
import MailingListForm from "@/components/MailingListForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden px-4 py-12">
        {/* Subtle glowing background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]  opacity-10 rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* Chrome Hero Image */}
        <div className="z-10 flex flex-col items-center gap-6 text-center fade-in">
          <div className="relative w-48 h-48 md:w-60 md:h-60 chrome-ring bg-white p-2 shadow-xl">
            <Image
              src="/EB_FAVICON.png"
              alt="Ezell Brown"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase">
            The Sound of <span className="text-[#f3eb00]">Ezell Brown</span>
          </h1>

          <p className="text-sm sm:text-base max-w-md text-gray-300 italic">
            A fusion of soul, rhythm, and unforgettable grooves. Be the first to know about new drops and events.
          </p>
        </div>

        {/* Mailing List Form */}
        <div className="mt-12 z-10 fade-in-slow">
          <MailingListForm />
        </div>
      </main>
    </div>
  );
}
