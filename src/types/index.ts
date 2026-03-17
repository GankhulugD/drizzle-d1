import { Context, Hono } from "hono";

export type Bindings = Cloudflare.Env;

export type App = Hono<{ Bindings: Bindings }>;

export type AppContext = Context<{ Bindings: Bindings }>;
