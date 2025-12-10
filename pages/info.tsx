// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import { supabase } from '@/lib/supabase';

// type InfoImage = {
//   id: string;
//   image_url: string;
//   caption: string;
//   order_index: number;
// };

// const InfoPage = () => {
//   const [images, setImages] = useState<InfoImage[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const { data, error } = await supabase
//         .from('info_images')
//         .select('*')
//         .order('order_index', { ascending: true });

//       if (!error && data) {
//         setImages(data);
//       }
//       setLoading(false);
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />

//       <main className="pt-[160px] px-6 sm:px-10 max-w-5xl mx-auto">
//         <h1 className="text-4xl text-center py-8">Info</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">Loading images...</div>
//         ) : images.length > 0 ? (
//           <div className="flex flex-col items-center justify-center space-y-6">
//             {images.map((img) => (
//               <div key={img.id} className="w-full max-w-md rounded-lg overflow-hidden">
//                 <Image
//                   width={600}
//                   height={400}
//                   src={img.image_url}
//                   alt={img.caption || 'Info image'}
//                   className="w-full object-cover rounded-lg"
//                   priority={img.order_index === 0}
//                 />
//                 {img.caption && (
//                   <p className="text-center text-sm text-gray-400 mt-2">{img.caption}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center">
//             <div className="w-full max-w-md rounded-lg overflow-hidden">
//               <Image
//                 width={600}
//                 height={400}
//                 src="/images/Ezellphoto.jpg"
//                 alt="Ezell Brown"
//                 className="w-full object-cover rounded-lg"
//                 priority
//               />
//             </div>
//           </div>
//         )}

//         <p className="mt-10 text-lg leading-relaxed text-center text-white max-w-3xl mx-auto">
//           <span className="block mb-4 font-semibold text-xl">
//             DJ. Musician. Multi-instrumentalist. Vibe architect.
//           </span>
//           Ezell&apos;s been crafting soundscapes for years—mixing genres, remixing classics,
//           and building beats that move people. He co-founded{' '}
//           <strong className="text-white font-bold">BeachParty Records</strong> in LA,
//           a label built on freedom, energy, and community.
//         </p>

//         <section className="mt-14 space-y-10 text-lg leading-relaxed">
//           <div>
//             <h2 className="text-2xl font-semibold mb-3">This Site? It&apos;s a Vibe Hub.</h2>
//             <p>
//               If you love real music, raw energy, and no-fake-zone dance floors—you&apos;re home.
//               <br />
//               Here, you&apos;ll find Ezell&apos;s original tracks, remixes, and exclusive sets.
//               Stream anytime. Catch the vibe on demand.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold mb-3">Catch Him Live.</h2>
//             <p>
//               Ezell hosts DJ events where the goal is simple: forget the world and just dance.
//               Safe, fun, high-vibe spaces where bills, stress, and drama don&apos;t exist.
//               <br />
//               Want him at your event? He&apos;s bookable—head over to the{' '}
//               <strong className="text-white font-semibold">Booking</strong> tab to lock in a date.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold mb-3">Join the Movement.</h2>
//             <p>
//               Sign up for the list. Get updates, event drops, new mixes, and more.
//               <br />
//               This isn&apos;t just music. It&apos;s a culture.
//               <br />
//               Be part of it—or wonder what you missed. Head over to the{' '}
//               <strong className="text-white font-semibold">Home</strong> tab and join the mailing list.
//             </p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default InfoPage;
//  Updated info page, non scrollable for desktop===================================================================
// ================================================================================================================
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

type InfoImage = {
  id: string;
  image_url: string;
  caption: string;
  order_index: number;
};

const InfoPage = () => {
  const [images, setImages] = useState<InfoImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('info_images')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="
        pt-[140px] 
        px-6 sm:px-10 
        max-w-3xl mx-auto
        pb-20
        flex flex-col items-center
        text-center
      ">
        <h1 className="text-5xl mb-12 tracking-tight font-light">
          Info
        </h1>

        {/* === Image Section (centered perfectly) === */}
        {loading ? (
          <div className="text-gray-400">Loading images...</div>
        ) : images.length > 0 ? (
          <div className="flex flex-col items-center space-y-10 mb-14">
            {images.map((img) => (
              <div key={img.id} className="flex flex-col items-center">
                <Image
                  width={600}
                  height={400}
                  src={img.image_url}
                  alt={img.caption || 'Info image'}
                  className="rounded-xl object-cover w-full max-w-md"
                  priority={img.order_index === 0}
                />

                {img.caption && (
                  <p className="text-sm text-gray-400 mt-3 italic tracking-wide max-w-md">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mb-14">
            <Image
              width={600}
              height={400}
              src="/images/Ezellphoto.jpg"
              alt="Ezell Brown"
              className="rounded-xl object-cover w-full max-w-md"
              priority
            />
          </div>
        )}

        {/* === Info Text (centered under image) === */}
        <section className="
          text-lg md:text-xl 
          leading-relaxed md:leading-loose 
          max-w-2xl
        ">
          <p className="opacity-90 mb-8 font-semibold text-2xl">
            DJ • Musician • Multi-instrumentalist • Vibe Architect
          </p>

          <p className="opacity-80 mb-6">
            Ezell has spent years shaping immersive sound—mixing genres, reworking classics, 
            and building rhythms that move people from the inside out. He co-founded 
            <span className="font-bold text-white"> BeachParty Records</span> in LA, a 
            community-first label focused on freedom, connection, and real energy.
          </p>

          <p className="opacity-80 mb-6">
            This site is a vibe hub: original tracks, curated remixes, exclusive sets, and evolving 
            soundscapes. Tap in whenever you need to reset or ride a new frequency.
          </p>

          <p className="opacity-80 mb-6">
            You can also catch Ezell at live events crafted to bring people together—high-vibe, 
            no-judgment spaces built for movement and presence. For bookings, hit the{" "}
            <span className="font-semibold text-white">Booking</span> page.
          </p>

          <p className="opacity-80">
            Join the movement—get updates, drops, and event news. This isn’t just music; 
            it’s a culture. Be part of it instead of hearing about it later.
          </p>
        </section>
      </main>
    </div>
  );
};

export default InfoPage;
