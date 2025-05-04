import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";
import httpStatus from 'http-status';


const addToWatchList = async (user: IAuthUser, payload: any) => {

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED,"User is not authenticated or doesn't exist");
    }

    const video = await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });

    const result = await prisma.watchList.create({
        data: {
            userId: user?.id,
            videoId: video.id
        }
    })
    return result
}


export const WatchServices = {
    addToWatchList
}
