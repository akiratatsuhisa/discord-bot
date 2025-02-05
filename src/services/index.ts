import { Context, HonoEnv } from "hono";

import { CommandsService } from "./commands";
import { BasicService } from "./basic";

export { CommandsService };

export const initServices = (context: Context<HonoEnv>) => {
  return {
    commands: new CommandsService(context),
    basic: new BasicService(context),
  };
};

export type Services = ReturnType<typeof initServices>;
