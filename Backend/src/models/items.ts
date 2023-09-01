import { InferSchemaType, model, Schema } from "mongoose";

const itemSchema = new Schema({
    itemName: {type: String, required: true},
    currentPrcie: {type: Number, required: true },
    duration: {type: String, required: true },
    status: { type: String, required: true},
    createdBy:{ type: String, required: true}
})



type Item = InferSchemaType<typeof itemSchema>

export default model<Item>("Item",itemSchema)