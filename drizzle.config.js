/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./config/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        // url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL, // if it is not accessable
        url: "postgresql://neondb_owner:fu6rlacmQ9YX@ep-old-dust-a5tej07b.us-east-2.aws.neon.tech/ai_short_video_genrator?sslmode=require"
    }
};