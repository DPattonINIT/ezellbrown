// 'use client';

// import Link from 'next/link';

// export default function Navbar() {
//   const navLinks = ['Music', 'Info', 'Events', 'Sign Up'];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
//       <div className="flex items-center justify-between px-4 sm:px-6 py-4">
//         {/* Brand */}
//         <Link
//           href="/"
//           className="text-white font-bold uppercase tracking-tight leading-none
//                      text-[24px] sm:text-[32px] md:text-[40px]"
//         >
//           Ezell Brown
//         </Link>

//         {/* Always visible nav links, with responsive text sizing */}
//         <nav className="flex gap-4 sm:gap-8 md:gap-10 ml-2 sm:ml-6 md:ml-10">
//           {navLinks.map((item) => (
//             <Link
//               key={item}
//               href={`/${item.toLowerCase().replace(' ', '')}`}
//               className="relative text-white uppercase font-medium transition-opacity duration-200
//                          text-[12px] sm:text-[18px] md:text-[22px] hover:opacity-70
//                          after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white
//                          after:transition-all after:duration-300 hover:after:w-full"
//             >
//               {item}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }
// ===============================================================

'use client';

import Link from 'next/link';

export default function Navbar() {
  const navLinks = ['Music', 'Info', 'Events', 'Sign Up'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      {/* Desktop: row  |  Mobile: column-reverse */}
      <div className="
        flex flex-col-reverse items-center px-4 py-4 
        sm:flex-row sm:items-center sm:justify-between sm:px-6
      ">
        
        {/* Brand — stays on left on desktop, moves below links on mobile */}
        <Link
          href="/"
          className="text-white font-bold uppercase tracking-tight leading-none
                     text-[40px] sm:text-[32px] md:text-[40px]
                     text-center sm:text-left mt-2 sm:mt-0"
        >
          Ezell Brown
        </Link>

        {/* Nav Links — on mobile: top row, evenly spaced */}
        <nav className="
          w-full flex justify-evenly mb-2 
          sm:mb-0 sm:w-auto sm:flex-row sm:gap-8 md:gap-10
        ">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '')}`}
              className="relative text-white uppercase font-medium transition-opacity duration-200
                         text-[12px] sm:text-[18px] md:text-[22px] hover:opacity-70
                         after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
