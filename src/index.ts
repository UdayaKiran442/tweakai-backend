import { Hono } from 'hono'
import { prettyJSON } from "hono/pretty-json";

import { ActiveConfig } from './utils/config.utils'
import authRouter from './routes/auth/auth.router'
import datasetsRoute from './routes/datasets/datasets.route'
import rowsRoute from './routes/rows/rows.route'
import columnsRoute from './routes/columns/columns.route';
import testRoute from './routes/test/test.route';

const app = new Hono()

const env = ActiveConfig.ENV

app.use(prettyJSON())

app.route("/auth", authRouter)
app.route("/datasets", datasetsRoute)
app.route("/rows", rowsRoute)
app.route("/columns", columnsRoute) 
app.route("/test", testRoute)

app.get('/', (c) => {
  return c.text(`Hello Hono! Welcome to TweakAI. Running in ${env} environment`)
})

app.get('/health-check', (c) => {
  return c.text(`Server is healthy and running in ${env} environment`)
})

export default app
