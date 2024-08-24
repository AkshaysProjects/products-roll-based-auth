import express from "express";
import connectDb from "./db";
import { env } from "./env";
import frontendRouter from "./frontend";
import errorHandler from "./middlewares/error_handler.middleware";
import apiRouter from "./routes";

// Create a new express application instance
const app = express();

// Use body parser to parse JSON requests
app.use(express.json());

// Define a route handler for the default home page
app.get("/", (_req, res) => {
	res.send("Hello World");
});

// Define a route handler for the /api path
app.use("/api", apiRouter);

// Temporary frontend routes
// TODO: Remove this after the frontend is ready
app.use("/", frontendRouter);

// Use error handler middleware
app.use(errorHandler);

// Function to start the app
async function startApp() {
	// Wait for the database connection
	await connectDb();

	// Start the server
	app.listen(env.PORT, () => {
		console.log("Server is running on port 3000");
	});
}

// Start the app
startApp();
