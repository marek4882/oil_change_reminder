// custom.d.ts
import { JwtPayload } from "jwt";

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}
