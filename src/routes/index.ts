/*
 * API Routes
 * 
 * This module handles all API routes with versioning.
 */

import { Hono } from "hono";

import { AppVariables } from "../types/app.types";
import v1Router from "./v1";

const apiRouter = new Hono<{ Variables: AppVariables }>();

// Mount versioned routes
apiRouter.route("/v1", v1Router);

export default apiRouter;
