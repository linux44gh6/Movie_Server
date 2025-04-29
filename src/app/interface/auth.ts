import { NextFunction, Request, Response } from "express"
import { jwtHelpers } from "../../helpers/jwtHelpers"
import config from "../../config"
import {  Secret } from "jsonwebtoken"
import { apiError } from "../errors/apiError"
import { StatusCodes } from "http-status-codes"

export const auth=(...roles:string[])=>{
   try{
    return (req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization
        if(!token){
            throw new apiError(StatusCodes.UNAUTHORIZED,'You are unauthorized')
        }
        const decoded=jwtHelpers.decodeToken(token as string,config.jwt.jwt_secret as Secret)
        req.user=decoded
        if(roles.length>0 && !roles.includes(decoded.role)){
            throw new apiError(StatusCodes.UNAUTHORIZED,'You are unauthorized')
        }
         next()
    }
   }catch(err){
    throw new apiError(StatusCodes.UNAUTHORIZED,'You are unauthorized')
   }
}