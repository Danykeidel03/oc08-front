const nextConfig = {
  experimental: {
    // el backend permite hasta 6 imagenes de 5MB (30MB); el default de Next es 1MB
    serverActions: {
      bodySizeLimit: "32mb",
    },
  },
};

export default nextConfig;
