import { Context, HonoEnv } from "hono";
import { BaseService } from "./base";
import { COMMANDS } from "../commands";

export class DiscordService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async executeCommand(data: DiscordApplicationCommand.Data): Promise<any> {
    const services = this.context.get("services");

    switch (data.name.toLowerCase()) {
      case COMMANDS.HELLO.name:
        return services.basic.hello();
      case COMMANDS.COUNTER.name:
        return services.basic.initializeCounter(data);
    }
  }

  async executeMessageComponent(
    data: DiscordMessageComponent.Data,
    message: DiscordMessageComponent.Message
  ): Promise<any> {
    const services = this.context.get("services");

    switch (data.custom_id) {
      case "increment_button":
        return services.basic.updateCounter(message);
    }

    throw new Error("Unknown Command");
  }

  async registerSlash() {
    const token = this.context.env.DISCORD_BOT_TOKEN;
    const applicationId = this.context.env.DISCORD_APPLICATION_ID;

    if (!token) {
      const error = "The DISCORD_TOKEN environment variable is required.";
      console.error(error);
      throw new Error(error);
    }
    if (!applicationId) {
      const error =
        "The DISCORD_APPLICATION_ID environment variable is required.";
      console.error(error);
      throw new Error(error);
    }

    const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(Object.values(COMMANDS)),
    });

    if (response.ok) {
      const message = "Registered all commands";
      console.log(message);

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));

      return { message };
    } else {
      console.error("Error registering commands");
      let errorText = `Error registering commands \n ${response.url}: ${response.status} ${response.statusText}`;
      try {
        const error = await response.text();
        if (error) {
          errorText = `${errorText} \n\n ${error}`;
        }
      } catch (err) {
        console.error("Error reading body from request:", err);
      }
      console.error(errorText);

      throw new Error(errorText);
    }
  }
}
