// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import Image from 'next/image';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';

// type Event = {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   link: string;
//   image_url: string;
// };

// const EventsPage = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const { data, error } = await supabase
//         .from('events')
//         .select('*')
//         .order('date', { ascending: true });

//       if (error) {
//         console.error('Error fetching events:', error);
//       } else {
//         setEvents(data || []);
//       }
//       setLoading(false);
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="flex bg-black text-white min-h-screen">
//       <Navbar />

//       <main className="w-full px-4 sm:px-10 py-12 max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-bold mb-12 border-b pb-4 border-gray-700 text-center ">
//           UPCOMING EVENTS
//         </h1>

//         {loading ? (
//           <p className="text-gray-400 text-center mt-10">Loading...</p>
//         ) : events.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10">No events yet. Stay tuned.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-[#1a1a1a] border border-gray-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 "
//               >
//                 {event.image_url && (
//                   <div className="relative w-full h-60">
//                     <Image
//                       src={event.image_url}
//                       alt={event.title}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, 33vw"
//                     />
//                   </div>
//                 )}

//                 <div className="p-6">
//                   <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white">{event.title}</h2>
//                   <p className="text-gray-400 mb-1">{event.location}</p>
//                   <p className="font-semibold mb-4 text-[#f3eb00]">
//                     {new Date(event.date).toLocaleDateString(undefined, {
//                       weekday: 'short',
//                       month: 'short',
//                       day: 'numeric',
//                       year: 'numeric',
//                     })}
//                   </p>

//                   {event.link && (
//                     <Link
//                       href={event.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block px-4 py-2 ezellYellow font-bold rounded transition"
//                     >
//                       RSVP / Book
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default EventsPage;

// code above does not have title styling changes==========================================================

// ===================================================================================================

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image_url: string;
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="pt-[160px] px-4 sm:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl text-center py-8">Upcoming Events</h1>

        {loading ? (
          <p className="text-gray-400 text-center mt-10">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No events yet. Stay tuned.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#1a1a1a] border border-gray-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                {event.image_url && (
                  <div className="relative w-full h-60">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white">{event.title}</h2>
                  <p className="text-gray-400 mb-1">{event.location}</p>
                  <p className="font-semibold mb-4 text-[#f3eb00]">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>

                  {event.link && (
                    <Link
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 ezellWhite font-bold rounded transition"
                    >
                      RSVP / Book
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
