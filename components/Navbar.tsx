// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = ['Music', 'Info', 'Events', 'Sign Up'];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Brand */}
//         <Link
//           href="/"
//           className="text-white font-bold uppercase tracking-tight"
//           style={{ fontSize: '45px', lineHeight: '1' }}
//         >
//           Ezell Brown
//         </Link>

//         {/* Desktop Links */}
//        <nav className="hidden md:flex gap-8">
//   {navLinks.map((item) => (
//     <Link
//       key={item}
//       href={`/${item.toLowerCase().replace(' ', '')}`}
//       className="relative text-white uppercase font-medium transition-opacity duration-200 text-[24px] hover:opacity-70
//                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//     >
//       {item}
//     </Link>
//   ))}
// </nav>
 

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-white p-2 z-50"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-label="Toggle Menu"
//         >
//           <svg
//             className="w-8 h-8"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             viewBox="0 0 24 24"
//           >
//             {mobileMenuOpen ? (
//               <path d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8">
//           {navLinks.map((item) => (
//             <Link
//               key={item}
//               href={`/${item.toLowerCase().replace(' ', '')}`}
//               className="text-3xl uppercase font-medium text-white hover:opacity-70 transition-opacity"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }
// collapse navbar on code above======================================================
// =================================================================================


'use client';

import Link from 'next/link';

export default function Navbar() {
  const navLinks = ['Music', 'Info', 'Events', 'Sign Up'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-white font-bold uppercase tracking-tight leading-none
                     text-[28px] sm:text-[36px] md:text-[45px]"
        >
          Ezell Brown
        </Link>

        {/* Always visible nav links, with responsive text sizing */}
        <nav className="flex gap-3 sm:gap-6 md:gap-8">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '')}`}
              className="relative text-white uppercase font-medium transition-opacity duration-200
                         text-[12px] sm:text-[18px] md:text-[24px] hover:opacity-70
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
