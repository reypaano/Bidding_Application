import express from "express"
import * as ItemController from "../controllers/items"

const router = express.Router()

router.get("/itemsByUser", ItemController.getItemsByUser)
router.get("/", ItemController.getItems)
router.get("/:itemId", ItemController.getItem)
router.post("/", ItemController.createItem)
router.patch("/:itemId", ItemController.updateItem)
router.patch("/bid/:itemId", ItemController.updatePriceItem)
router.patch("/closeItem/:itemId", ItemController.closeItem)



export default router