// import Image from 'next/image';
// import Navbar from '@/components/Navbar';

// const InfoPage = () => {
//   return (
//     <div className="flex bg-black text-white min-h-screen">
//       <Navbar />

//       <main className="w-full px-6 py-10 sm:px-10 max-w-5xl mx-auto">
//         <h1 className="text-xl sm:text-5xl font-bold text-center mb-12  pb-4 border-gray-700 ">
//           Info
//         </h1>

//         <div className="flex flex-col items-center justify-center">
//           <div className="w-full max-w-md rounded-lg overflow-hidden ">
//             <Image
//               width={600}
//               height={400}
//               src="/images/Ezellphoto.jpg"
//               alt="Ezell Brown"
//               className="w-full object-cover rounded-lg"
//               priority
//             />
//           </div>
//         </div>

//         <p className="mt-10 text-lg leading-relaxed text-center text-white max-w-3xl mx-auto">
//           <span className="block mb-4 font-semibold  text-xl">DJ. Musician. Multi-instrumentalist. Vibe architect.</span>
//           Ezell’s been crafting soundscapes for years—mixing genres, remixing classics,
//           and building beats that move people. He co-founded <strong className="text-white font-bold">BeachParty Records</strong> in LA,
//           a label built on freedom, energy, and community.
//         </p>

//         <section className="mt-14 space-y-10 text-lg leading-relaxed">
//           <div>
//             <h2 className="text-2xl font-semibold mb-3 underline ">This Site? It’s a Vibe Hub.</h2>
//             <p>
//               If you love real music, raw energy, and no-fake-zone dance floors—you’re home.
//               <br />
//               Here, you’ll find Ezell’s original tracks, remixes, and exclusive sets.
//               Stream anytime. Catch the vibe on demand.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold mb-3 underline ">Catch Him Live.</h2>
//             <p>
//               Ezell hosts DJ events where the goal is simple: forget the world and just dance.
//               Safe, fun, high-vibe spaces where bills, stress, and drama don’t exist.
//               <br />
//               Want him at your event? He’s bookable—head over to the <strong className="text-white font-semibold">Booking</strong> tab to lock in a date.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold mb-3 underline">Join the Movement.</h2>
//             <p>
//               Sign up for the list. Get updates, event drops, new mixes, and more.
//               <br />
//               This isn’t just music. It’s a culture.
//               <br />
//               Be part of it—or wonder what you missed. Head over to the <strong className="text-white font-semibold">Home</strong> tab and join the mailing list.
//             </p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default InfoPage;
// code above needs title styling changes==========================================================
// ===================================================================================================

'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

const InfoPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="pt-[160px] px-6 sm:px-10 max-w-5xl mx-auto">
        <h1 className="text-4xl text-center py-8">Info</h1>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden">
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
          <span className="block mb-4 font-semibold text-xl">
            DJ. Musician. Multi-instrumentalist. Vibe architect.
          </span>
          Ezell’s been crafting soundscapes for years—mixing genres, remixing classics,
          and building beats that move people. He co-founded{' '}
          <strong className="text-white font-bold">BeachParty Records</strong> in LA,
          a label built on freedom, energy, and community.
        </p>

        <section className="mt-14 space-y-10 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold mb-3">This Site? It’s a Vibe Hub.</h2>
            <p>
              If you love real music, raw energy, and no-fake-zone dance floors—you’re home.
              <br />
              Here, you’ll find Ezell’s original tracks, remixes, and exclusive sets.
              Stream anytime. Catch the vibe on demand.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Catch Him Live.</h2>
            <p>
              Ezell hosts DJ events where the goal is simple: forget the world and just dance.
              Safe, fun, high-vibe spaces where bills, stress, and drama don’t exist.
              <br />
              Want him at your event? He’s bookable—head over to the{' '}
              <strong className="text-white font-semibold">Booking</strong> tab to lock in a date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Join the Movement.</h2>
            <p>
              Sign up for the list. Get updates, event drops, new mixes, and more.
              <br />
              This isn’t just music. It’s a culture.
              <br />
              Be part of it—or wonder what you missed. Head over to the{' '}
              <strong className="text-white font-semibold">Home</strong> tab and join the mailing list.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InfoPage;

