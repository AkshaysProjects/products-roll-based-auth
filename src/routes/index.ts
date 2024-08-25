import { Router } from "express";
import authRouter from "./auth.routes";
import changeRouter from "./change.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

// Create a new express router
const apiRouter = Router();

// User Routes
apiRouter.use("/auth", authRouter);

// Product Routes
apiRouter.use("/product", productRouter);

// Change Routes
apiRouter.use("/changes", changeRouter);

// User Routes
apiRouter.use("/user", userRouter);

export default apiRouter;
