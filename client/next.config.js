/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env:{
    Backend_url: 'http://localhost:3030/',
SECRET_KEY: "mysecretkey"
  }
}
