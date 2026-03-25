import { App } from "../../types";
import { signUp } from "../../controller/auth/sign-up";
import { signIn } from "../../controller/auth/sign-in";

export const authRouter = (app: App) => {
  app.post("/auth/sign-up", signUp);
  app.post("/auth/sign-in", signIn);
};
