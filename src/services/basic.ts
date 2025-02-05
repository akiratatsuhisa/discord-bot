import { Context, HonoEnv } from "hono";
import { BaseService } from "./base";
import { InteractionResponseType } from "discord-interactions";

export class BasicService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async hello() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Chào bạn mình tới đây từ chiều",
      },
    };
  }
}
