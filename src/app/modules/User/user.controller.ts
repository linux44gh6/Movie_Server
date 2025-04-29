import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'User create successfully',
        data: result
    })
}

export const UserController = {
    createUser
}
