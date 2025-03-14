import { Hono } from "hono"

const rowsRoute = new Hono()

rowsRoute.post("/add", (c) => {
    return c.json({ message: "Add row" })
})

rowsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete row" })
})

export default rowsRoute