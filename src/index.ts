import { Hono, HonoEnv } from "hono";
import { InteractionResponseType, InteractionType } from "discord-interactions";

import { verifySignature, services, verifyRegister } from "./middlewares";

const app = new Hono<HonoEnv>();

app.use("*", services());

app.get("/", verifySignature(), (context) => {
  return context.text(`👋 ${context.env.DISCORD_APPLICATION_ID}`);
});

app.post("/", verifySignature(), async (context) => {
  const interaction = context.get("body");

  if (interaction.type === InteractionType.PING) {
    return context.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const commandsService = context.get("services").commands;

    try {
      const result = await commandsService.execute(interaction.data);

      return context.json(result);
    } catch {
      return context.json({ error: "Unknown Command" }, { status: 400 });
    }
  }

  return context.json({ error: "Unknown Type" }, { status: 400 });
});

app.post("/register", verifyRegister(), async (context) => {
  const commandsService = context.get("services").commands;

  try {
    const result = await commandsService.register();

    return context.json(result);
  } catch (error: unknown) {
    return context.json({ error: (error as Error).message }, { status: 400 });
  }
});

export default app;
