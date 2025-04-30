

import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { ReviewServices } from "./reviews.services";
import { IAuthUser } from "../../interface/common";

const addReview = catchAsync(async (req, res, next) => {

    const user = req.user

    const result = await ReviewServices.addReview(user as IAuthUser, req.body)

    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Review add successfully',
        data: result
    })

})




export const ReviewController = {
    addReview,
}
