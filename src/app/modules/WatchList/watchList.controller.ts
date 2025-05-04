import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WatchServices } from './watchList.services';
import { IAuthUser } from '../../interface/common';

const addToWatchList = catchAsync(async (req, res, next) => {

    const user = req.user;
    const result = await WatchServices.addToWatchList(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Tags fetched successfully',
        data: result
    });
});



export const WatchController = {
    addToWatchList
};
