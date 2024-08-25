import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import productControllers from "../controllers/product.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../multer";
import {
	createProductSchema,
	updateProductSchema,
} from "../schemas/product.schema";

// Create a new express router
const productRouter = Router();

// Get all products
productRouter.get("/", productControllers.getAllProducts);

// Get a single product
productRouter.get("/:id", productControllers.getProductById);

// Guard all the next routes with auth middleware
productRouter.use(authMiddleware);

// Create a new product
productRouter.post(
	"/",
	upload.single("image"),
	validateRequestBody(createProductSchema),
	productControllers.createProduct,
);

// Update a product
productRouter.patch(
	"/:id",
	upload.single("image"),
	validateRequestBody(updateProductSchema),
	productControllers.updateProduct,
);

// Delete a product
productRouter.delete("/:id", productControllers.deleteProduct);

export default productRouter;
