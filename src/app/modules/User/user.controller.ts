import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body)

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'User create successfully',
        data: result
    })
}

export const UserController = {
    createUser
}
