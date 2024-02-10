export const config = {
  apiPrefix: process.env.NEXT_PUBLIC_API_PREFIX ?? "http://",
  apiHost: process.env.VERCEL_URL ?? "localhost:3000",
};
