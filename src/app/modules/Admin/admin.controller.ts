import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.services';

const approveOrUnpublishReview = catchAsync(async (req, res, next) => {

    const reviewId = req.params.id
    const result = await AdminServices.approveOrUnpublishReview(reviewId, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review status has been successfully updated.',
        data: result
    });
});

const approveOrUnpublishComment = catchAsync(async (req, res, next) => {

    const commentId = req.params.id
    const result = await AdminServices.approveOrUnpublishComment(commentId, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment status has been successfully updated.',
        data: result
    });
});


export const AdminController = {
    approveOrUnpublishReview,
    approveOrUnpublishComment
};
