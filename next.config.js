/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		DATABASE_HOST: process.env.DATABASE_HOST,
		DATABASE_USERNAME: process.env.DATABASE_USERNAME,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
		JWT_SECRETE: process.env.JWT_SECRETE,
	},
};

module.exports = nextConfig;
