/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
      },{
        hostname:"paqjmdsalwybhhdxaupt.supabase.co"
      }
    ],
  },
};

export default nextConfig;
