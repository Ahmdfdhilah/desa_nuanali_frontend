module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.pixabay.com',
      'localhost',
      'nuniali-51afdf69a4d2.herokuapp.com',
      'nuniali.my.id'
    ],
    async rewrites() {
      return [
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*', 
        },
      ];
    },
  },
}
