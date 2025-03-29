import { Hono } from 'hono'
import { prettyJSON } from "hono/pretty-json";
import { cors } from 'hono/cors'

import { ActiveConfig } from './utils/config.utils'
import apiRouter from './routes'
import testRouter from './routes/test/test.route';

const app = new Hono()

const env = ActiveConfig.ENV

app.use("/*", cors({
  origin: ["http://localhost:5173"]
}))
app.use(prettyJSON())

// Mount the API router which handles versioning
app.route("/api", apiRouter)

// Mount test routes
app.route("/test", testRouter);

app.get('/', (c) => {
  return c.text(`Hello Hono! Welcome to TweakAI. Running in ${env} environment`)
})

app.get('/health-check', (c) => {
  return c.text(`Server is healthy and running in ${env} environment`)
})

export default app
