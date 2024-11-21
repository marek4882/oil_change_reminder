// custom.d.ts
import { JwtPayload } from "jsonwebtoken"; // Ensure you import from the correct package

declare module "express-serve-static-core" {
  export interface Response {
    locals: {
      user?: JwtPayload; // Adjust according to your JWT payload structure
    };
  }
}
