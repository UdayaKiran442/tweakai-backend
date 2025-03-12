import { Hono } from 'hono'
import { prettyJSON } from "hono/pretty-json";

import authRouter from './routes/auth/auth.router'
import { ActiveConfig } from './utils/config.utils'
const app = new Hono()

const env = ActiveConfig.ENV

app.use(prettyJSON())

app.route("/auth", authRouter)

app.get('/', (c) => {
  return c.text(`Hello Hono! Welcome to TweakAI. Running in ${env} environment`)
})

app.get('/health-check', (c) => {
  return c.text(`Server is healthy and running in ${env} environment`)
})

export default app
