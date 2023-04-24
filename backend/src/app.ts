/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

//To pass json data (post method)
app.use(express.json());

//To get json data
app.use("/api/notes", notesRoutes);

// Outside of 500 error, error is handled here.
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// With next param, express understands that this is the errorHandler func.
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An unknown error occurred";

  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
