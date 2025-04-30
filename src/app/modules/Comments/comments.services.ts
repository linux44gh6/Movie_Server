import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import httpStatus from 'http-status';


const addComments = async (user: any, payload: any) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });


    await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId,
        },
    });

    const result = await prisma.comment.create({
        data: {
            ...payload,
            userId: userData.id,
        },
    });

    return result;
};

const getAllComment = async () => {

    const result = await prisma.review.findMany()

    return result;
};

export const CommentServices = {
    addComments,
    getAllComment
}
