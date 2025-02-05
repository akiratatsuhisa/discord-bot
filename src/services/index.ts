import { Context, HonoEnv } from "hono";

import { DiscordService } from "./discord";
import { BasicService } from "./basic";

export const initServices = (context: Context<HonoEnv>) => {
  return {
    discord: new DiscordService(context),
    basic: new BasicService(context),
  };
};

export type Services = ReturnType<typeof initServices>;
