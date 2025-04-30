import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAuthUser } from '../../interface/common';
import { CommentServices } from './comments.services';

const addComments = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await CommentServices.addComments(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Review add successfully',
        data: result,
    });
});

export const CommentController = {
    addComments,
};
