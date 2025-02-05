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

declare global {
  namespace DiscordApplicationCommand {
    interface Data {
      name: string;
      options: Array<
        {
          name: string;
        } & ({ type: 3; value: string } | { type: 4; value: number })
      >;
    }
  }

  namespace DiscordMessageComponent {
    interface Data {
      component_type: number;
      custom_id: string;
    }

    interface Message {
      content: string;
      components: Array<any>;
    }
  }
}

export {};
