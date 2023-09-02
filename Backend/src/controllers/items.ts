import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { assertIsDefined } from "../util/assertisDefined"
import ItemModel from "../models/items"
import mongoose from "mongoose"



export const getItems: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId)

    const items = await ItemModel.find().exec()
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
}

export const getItemsByUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId)
    console.log(authenticatedUserId)
    const items = await ItemModel.find({'createdBy' : authenticatedUserId }).exec()
    res.status(200).json(items)

  } catch (error) {
    next(error)
  }
}

export const getItem: RequestHandler = async (req, res, next) => {
  const itemId = req.params.itemId
  const authenticatedUserId = req.session.userId
  
  try {
    assertIsDefined(authenticatedUserId)
    
    if (!mongoose.isValidObjectId(itemId)) 
      throw createHttpError(400, "Invalid item id")
    

    const item = await ItemModel.findById(itemId).exec()

    if (!item) 
      throw createHttpError(404, "Item not found");
  
    // if (!item.createdBy.equals(authenticatedUserId)) {
    //     throw createHttpError(401, "You cannot access this note");
    // }
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
}

interface CreateItemBody{
    itemName?: string,
    currentPrice?: number,
    duration?: string,
    status?: string,
    createdBy?: string
}

export const createItem: RequestHandler<unknown, unknown, CreateItemBody,unknown> = async (req, res, next) => {
  const itemName = req.body.itemName  
  const currentPrice = req.body.currentPrice  
  const duration = req.body.duration  
  const status = req.body.status  
  const authenticatedUserId = req.session.userId

  try { console.log(req.body)
    assertIsDefined(authenticatedUserId)

    if (!itemName || !currentPrice || !duration || !status) {
        throw createHttpError(400, "Missing Parameters");
    }

    const newItem = await ItemModel.create({
        itemName: itemName,
        currentPrice: currentPrice,
        duration: duration,
        status: status,
        createdBy:authenticatedUserId
    })
    res.status(201).json(newItem)


    
  } catch (error) {
        next(error)
  }
}

interface UpdateItemParams {
  itemId: string
}

interface UpdateItemBody{
  itemName?: string,
  currentPrice?: number,
  duration: string
  status?: string,
}

export const updateItem: RequestHandler<UpdateItemParams, unknown, UpdateItemBody, unknown> = async(req, res, next) => {
  const itemId = req.params.itemId
  const newItemName = req.body.itemName
  const newCurrentPrice = req.body.currentPrice
  const newStatus = req.body.status
  const authenticatedUserId = req.session.userId  

  try {
    assertIsDefined(authenticatedUserId)

    if(!mongoose.isValidObjectId(itemId))
      throw createHttpError(400, "Invalid item ID.")

    if (!newItemName) 
      throw createHttpError(400, "Item must have a name.");
    
    if (!newCurrentPrice) 
    throw createHttpError(400, "Item must have a current price.")

    if (!newStatus) 
    throw createHttpError(400, "Item must have a status.")
    
    const item = await ItemModel.findById(itemId).exec()

    if(!item)
      throw createHttpError(404, "Item not found")
    
    if ( !item.createdBy.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot edit this item!")

    item.itemName = newItemName
    item.currentPrice = newCurrentPrice
    item.status = newStatus

    const updatedItem = await item.save()

    res.status(200).json(updatedItem)
  } catch (error) {
      next(error)
    
  }

}