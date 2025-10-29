/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.coolmate.me', 
        port: '',
        pathname: '/cdn-cgi/image/**',
      },
      {
        protocol: 'https',
        hostname: 'static.zara.net', 
        port: '',
        pathname: '/photos/**',
      },
      // --- THÊM KHỐI UNIQLO NÀY ---
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com', // Tên miền chính xác
        port: '',
        pathname: '/UQ/ST3/AsianCommon/imagesgoods/**', // Dùng path chung nhất
      },
      // --- HẾT KHỐI UNIQLO ---
      {
        protocol: 'https',
        hostname: 'picsum.photos', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;