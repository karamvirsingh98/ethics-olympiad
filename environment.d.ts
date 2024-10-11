import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;

      // database (turso)
      DB_URI: string;
      DB_TOKEN?: string;

      // ws provider (pusher)
      NEXT_PUBLIC_PUSHER_KEY: string;
      NEXT_PUBLIC_PUSHER_CLUSTER: string;
      PUSHER_APP_ID: string;
      PUSHER_SECRET: string;
    }
  }
}
