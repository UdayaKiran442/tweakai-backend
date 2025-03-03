import { Hono } from 'hono'
import { ActiveConfig } from './utils/config.utils'

const app = new Hono()

app.get('/', (c) => {
  const env = ActiveConfig.ENV
  return c.text(`Hello Hono! ENV: ${env}`)
})

export default app
