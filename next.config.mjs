import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    reloadOnOnline: true,
    dest: "public"
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            }
        ]
    },
    reactStrictMode: true,
};

export default withPWA(nextConfig);
