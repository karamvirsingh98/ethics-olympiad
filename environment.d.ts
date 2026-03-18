declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // jwt
      JWT_SECRET: string;

      // database (turso)
      TURSO_CONNECTION_URL: string;
      TURSO_AUTH_TOKEN: string;

      // ws provider (ably)
      ABLY_API_KEY: string;
    }
  }
}

export {};
