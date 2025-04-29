import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.loginUser(req.body)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: "User login successfully",
        data: result
    })
})


export const AuthController = {
    loginUser
}
