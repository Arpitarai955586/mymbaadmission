import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sibmhyd.edu.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'timess3spore.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newsletter.somaiya.edu',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drupal.mbauniverse.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xim.edu.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zolostays.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.alliance.edu.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admitexpert.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.coeptech.ac.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'e2pconsultancy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tapmi.edu.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.boostmytalent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.shiksha.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-static.collegedunia.com',
        pathname: '/**',
      } , 
      {
        protocol : "https",
        hostname : "assets.kollegeapply.com",
        pathname : "/**"
      }
    ],
  },
};

export default nextConfig;