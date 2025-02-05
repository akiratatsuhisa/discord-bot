import { Context, HonoEnv } from "hono";

export abstract class BaseService {
  protected context: Context<HonoEnv>;

  constructor(context: Context<HonoEnv>) {
    this.context = context;
  }
}
