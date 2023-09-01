import express from "express"
import * as ItemController from "../controllers/items"

const router = express.Router()

router.get("/", ItemController.getItems)
router.get("/:itemId", ItemController.getItem)
router.post("/", ItemController.createItem)


export default router