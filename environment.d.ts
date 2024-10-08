import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      DB_TOKEN?: string;
    }
  }
}
