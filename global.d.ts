// global.d.ts
declare global {
    namespace NodeJS {
      interface Global {
        mongoose: Cached | undefined;
      }
    }
  }
  
  interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  }

  
  export {};
  