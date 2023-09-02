import { RequestHandler } from "express"
import createHttpError from "http-errors"
import UserModel from "../models/user"
import bcrypt from "bcrypt"
import { assertIsDefined } from "../util/assertisDefined"
import mongoose from "mongoose"

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

    try {
        if(!authenticatedUserId)
            throw createHttpError(401, "User not Authenticated!")

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

interface SignUpBody{
    username?: string,
    email?: string,
    password?: string,
    wallet?: number
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async ( req, res, next) =>{
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password
   
    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "parametersss Missing!")
        }
            
        const existingUsername = await UserModel.findOne({ username:username }).exec()
        if (existingUsername)
            throw createHttpError(409, "Username already exist. Login Instead.")

        const existingEmail = await UserModel.findOne({ email:email }).exec()
        if (existingEmail)
            throw createHttpError(409, "Email Address already exist. Login Instead.")
        
        const passwordHashed = await bcrypt.hash(passwordRaw, 10)  
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            wallet: 0
        })

        req.session.userId = newUser._id

        res.status(201).json(newUser)
    } catch (error) {

        next(error)
    }
}

interface LoginBody {
    username: string,
    password: string
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
     const username = req.body.username
     const password = req.body.password

     try {
        if (!username || !password) 
            throw createHttpError(400, "Parameters missing!")      
            
        const user = await UserModel.findOne({username:username}).select("+password +email").exec()
        if (!user)
            throw createHttpError(401, "Invalid credentials!")

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw createHttpError(401, "Invalid credentials!")
        }

        req.session.userId = user._id
        res.status(201).json(user)

     } catch (error) {
        next(error)        
     }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error)
            next(error)
        else
            res.sendStatus(200)
    })
}

interface UpdateUserParams {
    userId: string
  }
  
  interface UpdateUserBody{
    wallet?: number,
  }
  
  export const updateWallet: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> = async(req, res, next) => {
    const userId = req.session.userId
    const newWallet = req.body.wallet
    const authenticatedUserId = req.session.userId  


    try {
      assertIsDefined(authenticatedUserId)
  
      if(!mongoose.isValidObjectId(userId))
        throw createHttpError(400, "Invalid user ID.")
  
      if (!newWallet) 
        throw createHttpError(400, "User must have wallet credits.");
      
      
      const user = await UserModel.findById(userId).exec()
  
      if(!user)
        throw createHttpError(404, "User not found")
      
      if ( !user._id.equals(authenticatedUserId))
        throw createHttpError(401, "You Add wallet credits to this Account!")
    
        if( user.wallet !== undefined)
        user.wallet = +user?.wallet + +newWallet
  
      const updatedUser = await user.save()
  
      res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
      
    }
  
  }