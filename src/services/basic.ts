import { Context, HonoEnv } from "hono";
import { BaseService } from "./base";
import { InteractionResponseType } from "discord-interactions";

export class BasicService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async hello() {
    return Promise.resolve({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Hello from cloudflare with love!",
      },
    });
  }
}
