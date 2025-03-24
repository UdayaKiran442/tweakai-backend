/*
 * v1 API Routes
 * 
 * This module handles all v1 API routes.
 */

import { Hono } from "hono";
import authRouter from './auth/auth.router';
import datasetsRoute from './datasets/datasets.route';
import rowsRoute from './rows/rows.route';
import columnsRoute from './columns/columns.route';
import testRoute from '../../routes/test/test.route';

const v1Router = new Hono();

// Mount all routes under v1
v1Router.route("/auth", authRouter);
v1Router.route("/datasets", datasetsRoute);
v1Router.route("/rows", rowsRoute);
v1Router.route("/columns", columnsRoute);
v1Router.route("/test", testRoute);

export default v1Router;
