import { Router } from "express";
import authRouter from "./auth.routes";

// Create a new express router
const apiRouter = Router();

// User Routes
apiRouter.use("/auth", authRouter);

export default apiRouter;
