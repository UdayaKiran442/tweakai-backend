import { Hono } from "hono/dist/types/hono"

const columnsRoute = new Hono()

columnsRoute.post("/add", (c) => {
    return c.json({ message: "Add column to dataset" })
})

columnsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete column from dataset" })
})

columnsRoute.post("/update", (c) => {
    return c.json({ message: "Update column in dataset" })
})

export default columnsRoute