import cors from "cors";
import express from "express";
import session from "express-session";
import corsConfig from "./config/cors";
import sessionConfig from "./config/session";
import connectDb from "./db";
import { env } from "./env";
import errorHandler from "./middlewares/error_handler.middleware";
import apiRouter from "./routes";

// Create a new express application instance
const app = express();

// Use cors middleware
app.use(cors(corsConfig));

// Use body parser to parse JSON requests
app.use(express.json());

// Use session middleware
app.use(session(sessionConfig));

// Define a route handler for the default home page
app.get("/", (_req, res) => {
  res.send("Hello World");
});

// Define a route handler for the /api path
app.use("/api", apiRouter);

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
