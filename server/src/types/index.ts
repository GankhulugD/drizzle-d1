import { Context, Hono } from "hono";

export type Bindings = Cloudflare.Env & {
  JWT_SECRET: string;
};

export type Variables = {
  user: {
    sub: number;
    email: string;
    exp: number;
  };
};

export type App = Hono<{ Bindings: Bindings; Variables: Variables }>;
export type AppContext = Context<{ Bindings: Bindings; Variables: Variables }>;
