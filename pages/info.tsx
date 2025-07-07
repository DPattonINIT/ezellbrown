// import Sidebar from "@/components/Sidebar";
// import Image from 'next/image';

// const InfoPage = () => {
//   return (
    
//     <div className="flex">

        
//       <Sidebar />

      
//       <div className="p-10  text-white max-w-4xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-bold mb-12 border-b pb-4 border-gray-700 text-center">WHO IS EZELL BROWN</h1>
//           <Image 
//           width={600} height={400}
//     src="/images/Ezellphoto.jpg" 
//     alt="Ezell Brown" 
//     className="w-full max-w-md mx-auto mt-6 rounded-lg shadow-lg"
//   />
//         <p className="mb-6 mt-15 text-lg leading-relaxed text-center">
//           DJ. Musician. Multi-instrumentalist. Vibe architect.
//           <br />
//           Ezell&rsquo;s been crafting soundscapes for years—mixing genres, remixing classics,
//           and building beats that move people. He co-founded <strong>BeachParty Records</strong> in LA,
//           a label built on freedom, energy, and community.
//         </p>

//         <h2 className="text-2xl font-semibold mb-4 mt-10 underline">This Site? It&rsquo;s a Vibe Hub.</h2>
//         <p className="mb-6 text-lg leading-relaxed">
//           If you love real music, raw energy, and no-fake-zone dance floors—you&rsquo;re home.
//           <br />
//           Here, you&rsquo;ll find Ezell&rsquo;s original tracks, remixes, and exclusive sets.
//           Stream anytime. Catch the vibe on demand.
//         </p>

//         <h2 className="text-2xl font-semibold mb-4 mt-10 underline">Catch Him Live.</h2>
//         <p className="mb-6 text-lg leading-relaxed">
//           Ezell hosts DJ events where the goal is simple: forget the world and just dance.
//           Safe, fun, high-vibe spaces where bills, stress, and drama don&rsquo;t exist.
//           <br />
//           Want him at your event? He&rsquo;s bookable—head over to the Booking tab to lock in a date.
//         </p>

//         <h2 className="text-2xl font-semibold mb-4 mt-10 underline">Join the Movement.</h2>
//         <p className="text-lg leading-relaxed">
//           Sign up for the list. Get updates, event drops, new mixes, and more.
//           <br />
//           This isn&rsquo;t just music. It&rsquo;s a culture.
//           <br />
//           Be part of it—or wonder what you missed. Head over to the Home tab and join the mailing list.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InfoPage;
// ----------------------------Above is the original code for InfoPage.tsx----------------------------

import Sidebar from "@/components/Sidebar";
import Image from 'next/image';

const InfoPage = () => {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <main className="w-full px-6 py-10 sm:px-10 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 border-b pb-4 border-gray-700 ">
          WHO IS EZELL BROWN
        </h1>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden ">
            <Image
              width={600}
              height={400}
              src="/images/Ezellphoto.jpg"
              alt="Ezell Brown"
              className="w-full object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <p className="mt-10 text-lg leading-relaxed text-center text-white max-w-3xl mx-auto">
          <span className="block mb-4 font-semibold  text-xl">DJ. Musician. Multi-instrumentalist. Vibe architect.</span>
          Ezell’s been crafting soundscapes for years—mixing genres, remixing classics,
          and building beats that move people. He co-founded <strong className="text-white font-bold">BeachParty Records</strong> in LA,
          a label built on freedom, energy, and community.
        </p>

        <section className="mt-14 space-y-10 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold mb-3 underline text-[#f3eb00] ">This Site? It’s a Vibe Hub.</h2>
            <p>
              If you love real music, raw energy, and no-fake-zone dance floors—you’re home.
              <br />
              Here, you’ll find Ezell’s original tracks, remixes, and exclusive sets.
              Stream anytime. Catch the vibe on demand.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 underline text-[#f3eb00] ">Catch Him Live.</h2>
            <p>
              Ezell hosts DJ events where the goal is simple: forget the world and just dance.
              Safe, fun, high-vibe spaces where bills, stress, and drama don’t exist.
              <br />
              Want him at your event? He’s bookable—head over to the <strong className="text-white font-semibold">Booking</strong> tab to lock in a date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 underline text-[#f3eb00] ">Join the Movement.</h2>
            <p>
              Sign up for the list. Get updates, event drops, new mixes, and more.
              <br />
              This isn’t just music. It’s a culture.
              <br />
              Be part of it—or wonder what you missed. Head over to the <strong className="text-white font-semibold">Home</strong> tab and join the mailing list.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InfoPage;

