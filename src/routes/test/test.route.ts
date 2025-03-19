import { Hono } from "hono";
import { fetchDatasetByIdFromDB } from "../../repository/datasets/datasets.repository";

const testRoute = new Hono()

testRoute.get("/", async (c) => {
    const response = await fetchDatasetByIdFromDB("dataset-75626bdb-9602-4155-808e-0035f34f6e8e");
    return c.json({ message: "Get dataset by id", response });
})

export default testRoute
