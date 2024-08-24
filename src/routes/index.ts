import { Router } from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";

// Create a new express router
const apiRouter = Router();

// User Routes
apiRouter.use("/auth", authRouter);

// Product Routes
apiRouter.use("/product", productRouter);

export default apiRouter;
