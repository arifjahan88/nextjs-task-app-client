/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};
module.exports = {
  pageExtensions: [
    "Firebase.config.tsx",
    "Firebase.config.ts",
    "Firebase.config.jsx",
    "Firebase.config.js",
  ],
};

module.exports = nextConfig;
