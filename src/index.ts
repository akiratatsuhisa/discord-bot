import { Hono, HonoEnv } from "hono";
import { InteractionResponseType, InteractionType } from "discord-interactions";

import { verifySignature, services, verifyRegister } from "./middlewares";
import { database } from "./middlewares/database";

const app = new Hono<HonoEnv>();

app.use("*", services());
app.use("*", database());

app.get("/", verifySignature(), (context) => {
  return context.text(`👋 ${context.env.DISCORD_APPLICATION_ID}`);
});

app.post("/", verifySignature(), async (context) => {
  const discord = context.get("services").discord;

  const interaction = context.get("body");

  switch (interaction.type) {
    case InteractionType.PING:
      return context.json({ type: InteractionResponseType.PONG });

    case InteractionType.APPLICATION_COMMAND: {
      try {
        const result = await discord.executeCommand(interaction.data);

        return context.json(result);
      } catch (e) {
        console.error(e);
        return context.json({ error: "Unknown Command" }, { status: 400 });
      }
    }

    case InteractionType.MESSAGE_COMPONENT: {
      try {
        const result = await discord.executeMessageComponent(
          interaction.data,
          interaction.message
        );

        return context.json(result);
      } catch (e) {
        console.error(e);
        return context.json({ error: "Unknown update" }, { status: 400 });
      }
    }

    case InteractionType.MODAL_SUBMIT: {
    }

    case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE: {
    }
  }

  return context.json({ error: "Unknown Type" }, { status: 400 });
});

app.post("/register", verifyRegister(), async (context) => {
  const discord = context.get("services").discord;

  try {
    const result = await discord.registerSlash();

    return context.json(result);
  } catch (error: unknown) {
    return context.json({ error: (error as Error).message }, { status: 400 });
  }
});

export default app;
