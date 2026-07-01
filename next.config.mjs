/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Mengabaikan eror TypeScript saat build di Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengabaikan eror ESLint saat build di Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;