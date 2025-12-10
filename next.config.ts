

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'oqygwqrsfuccynchyjjt.supabase.co', // Your Supabase domain
//     ],
//     // Alternative: Use remotePatterns for more control (Next.js 12.3+)
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'oqygwqrsfuccynchyjjt.supabase.co',
//         port: '',
//         pathname: '/storage/v1/object/public/**',
//       },
//     ],
//   },
// }

// module.exports = nextConfig
// =========================================================================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oqygwqrsfuccynchyjjt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
