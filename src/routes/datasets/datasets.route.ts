import { Hono } from "hono";

const datasetsRoute = new Hono()

datasetsRoute.post("/create", (c) => {
    return c.json({ message: "Create dataset" })
})

datasetsRoute.get("/fetch/all", (c) => {
    return c.json({ message: "Get datasets" })
})

datasetsRoute.post("/fetch", (c) => {
    return c.json({ message: "Get dataset by id" })
})

datasetsRoute.post("/update/name", (c) => {
    return c.json({ message: "Update dataset name by id" })
})

datasetsRoute.post("/delete", (c) => {
    return c.json({ message: "Delete dataset by id" })
})

export default datasetsRoute
