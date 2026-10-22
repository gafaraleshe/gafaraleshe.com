/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Rendered in Node by app/cv.pdf/route.ts; bundling it breaks its font
  // and layout engines.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
