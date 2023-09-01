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
    currentPrcie?: number,
    duration?: string,
    status?: string,
    createdBy?: string
}

export const createItem: RequestHandler<unknown, unknown, CreateItemBody,unknown> = async (req, res, next) => {
  const itemName = req.body.itemName  
  const currentPrcie = req.body.currentPrcie  
  const duration = req.body.duration  
  const status = req.body.status  
  const createdBy = req.body.createdBy  
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!itemName || !currentPrcie || !duration || !status || !createdBy) {
        throw createHttpError(400, "Missing Parameters");
    }

    const newItem = await ItemModel.create({
        itemName: itemName,
        currentPrcie: currentPrcie,
        duration: duration,
        status: status,
        createdBy:authenticatedUserId
    })
    res.status(201).json(newItem)


    
  } catch (error) {
        next(error)
  }
}