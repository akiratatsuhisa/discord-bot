import { HonoEnv, MiddlewareHandler } from "hono";
import { verifyKey } from "discord-interactions";

export const verifySignature: () => MiddlewareHandler<HonoEnv> =
  () => async (context, next) => {
    const signature = context.req.header("x-signature-ed25519");
    const timestamp = context.req.header("x-signature-timestamp");

    const body = await context.req.text();

    const publicKey = context.env.DISCORD_PUBLIC_KEY;

    const isValidRequest =
      signature &&
      timestamp &&
      (await verifyKey(body, signature, timestamp, publicKey));

    if (!isValidRequest || !body) {
      return context.text("Bad request signature.", { status: 401 });
    }

    const jsonBody = JSON.parse(body);
    context.set("body", jsonBody);

    await next();
  };

export const verifyRegister: () => MiddlewareHandler<HonoEnv> =
  () => async (context, next) => {
    const token = context.req.header("Authorization");

    if (token != `Token ${context.env.REGISTER_TOKEN}`) {
      return context.text("Bad request register.", { status: 401 });
    }

    await next();
  };
