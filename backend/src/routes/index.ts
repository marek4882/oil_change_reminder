import { Router } from "express";

const router = Router();

router.get("/hello", (req, res) => {
  res.send("Hello from the backend!");
});

export default router;
