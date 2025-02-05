import { Context, HonoEnv } from "hono";
import { BaseService } from "./base";
import {
  ButtonStyleTypes,
  InteractionResponseType,
  MessageComponentTypes,
} from "discord-interactions";

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

  async initializeCounter(data: DiscordApplicationCommand.Data) {
    const count = data.options[0]?.type === 4 ? data.options[0].value : 0;

    return Promise.resolve({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Starting count at: ${count}`,
        components: [
          {
            type: MessageComponentTypes.ACTION_ROW,
            components: [
              {
                type: MessageComponentTypes.BUTTON,
                label: `Click here!`,
                style: ButtonStyleTypes.PRIMARY,
                custom_id: `increment_button`,
              },
            ],
          },
        ],
      },
    });
  }

  async updateCounter(message: DiscordMessageComponent.Message) {
    let count = parseInt(message.content.match(/\d+/)?.[0] || "0", 10);
    count++;

    return Promise.resolve({
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: `Clicked ${count} times`,
        components: message.components,
      },
    });
  }
}
