// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggleSidebar = () => setIsOpen(!isOpen);

//     return (
//         <>
//             {/* Mobile hamburger toggle */}
//             <div className="md:hidden fixed top-4 left-4 z-50">
//                 <button
//                     onClick={toggleSidebar}
//                     aria-label="Toggle Sidebar"
//                     className="text-white p-2 focus:outline-none"
//                 >
//                     {/* Simple hamburger icon */}
//                     <svg
//                         className="w-6 h-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 6h16M4 12h16M4 18h16"
//                         />
//                     </svg>
//                 </button>
//             </div>

//             {/* Sidebar */}
//             <aside
//                 className={`fixed top-0 left-0 h-full w-60 bg-black z-40 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
//             >
//                 <nav className="flex flex-col items-center  py-30 space-y-6">
//                     {['HOME','MUSIC', 'INFO', 'EVENTS', 'BOOKING'].map((item) => (
//                         <Link
//                             key={item}
//                             href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
//                             className="text-white text-xl px-6 py-3 rounded-md transform transition duration-200 hover:scale-105 hover-text-yellow"
//                         >
//                             {item}
//                         </Link>

//                     ))}
//                 </nav>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

// ==============ABOVE IS THE ORIGINAL CODE=================

// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = ({ lightMode = false }: { lightMode?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile hamburger toggle */}
            <div className={`md:hidden fixed top-4 left-4 z-50 ${lightMode ? 'text-black' : 'text-white'}`}>
                <button
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                    className="p-2 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-60 z-40 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                ${lightMode ? 'bg-white' : 'bg-black'}`}
            >
                <nav className="flex flex-col items-center py-30 space-y-6">
                    {['HOME', 'MUSIC', 'INFO', 'EVENTS', 'BOOKING'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className={`
                                text-xl px-6 py-3 rounded-md transform transition duration-200 hover:scale-105
                                ${lightMode ? 'text-black hover:text-gray-600' : 'text-white hover:text-[#f3eb00]'}
                            `}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;

