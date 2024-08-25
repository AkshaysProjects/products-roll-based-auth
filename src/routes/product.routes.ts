import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import productControllers from "../controllers/product.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../multer";
import { createProductSchema } from "../schemas/create_product.schema";

// Create a new express router
const productRouter = Router();

// Product Routes
productRouter.post(
	"/",
	authMiddleware,
	upload.single("image"),
	validateRequestBody(createProductSchema),
	productControllers.createProduct,
);

export default productRouter;
