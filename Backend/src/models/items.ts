import { InferSchemaType, model, Schema } from "mongoose";

const itemSchema = new Schema({
    itemName: {type: String, required: true},
    currentPrice: {type: Number, required: true },
    duration: {type: String, required: true },
    status: { type: String, required: true},
    createdBy:{ type: Schema.Types.ObjectId, required: true}
})



type Item = InferSchemaType<typeof itemSchema>

export default model<Item>("Item",itemSchema)