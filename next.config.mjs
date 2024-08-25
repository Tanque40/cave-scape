/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$|\.frag$|\.vert$/i,
      use: ['raw-loader'],
    })
    return config
  }
}

export default nextConfig;
