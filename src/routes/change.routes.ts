import { Router } from "express";
import changeControllers from "../controllers/change.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

// Create a new express router
const changeRouter = Router();

// Guard all the next routes with auth middleware
changeRouter.use(authMiddleware);

// Get all pending changes
changeRouter.get("/", changeControllers.getPendingChanges);

// Approve a pending change
changeRouter.post("/:id/approve", changeControllers.approveChange);

// Reject a pending change
changeRouter.post("/:id/reject", changeControllers.rejectChange);

export default changeRouter;
