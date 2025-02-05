import { drizzle } from "drizzle-orm/d1";

import { Services } from "../services";

declare module "hono" {
  interface ContextVariableMap {
    body: any;
    services: Services;
  }

  interface HonoEnv {
    Bindings: {
      DISCORD_APPLICATION_ID: string;
      DISCORD_BOT_TOKEN: string;
      DISCORD_PUBLIC_KEY: string;
      REGISTER_TOKEN: string;
    };
  }
}

export {};
