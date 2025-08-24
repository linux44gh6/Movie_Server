import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import httpStatus from 'http-status';
import { IAuthUser } from "../../interface/common";
import { CommentStatus, ReviewStatus } from "@prisma/client";


const addComment = async (user: any, payload: any) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });

    let target: 'video' | 'review' | null = null;

    if (payload.videoId) {
        target = 'video';

        await prisma.video.findFirstOrThrow({
            where: {
                id: payload.videoId,
            },
        });
    }

    if (payload.reviewId) {
        target = 'review';

        await prisma.review.findFirstOrThrow({
            where: {
                id: payload.reviewId,
                status: ReviewStatus.APPROVED
            },
        });
    }

    if (!target) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Either videoId or reviewId must be provided.");
    }

    if (!payload.parentCommentId) {

        const result = await prisma.comment.create({
            data: {
                ...payload,
                userId: userData.id,
                [target + "Id"]: payload[`${target}Id`],
            },
        });
        
        // const pushCommentId = await prisma.video.update({
        //     where: {
        //         id: result.videoId!,
        //     },
        //     data: {
        //         Comment: {
        //             connect: {
        //                 id: result.id,
        //             },
        //         },
        //     },
        // });
        // console.log(pushCommentId);
        return result;
    }


    const parentComment = await prisma.comment.findUnique({
        where: {
            id: payload.parentCommentId,
        },
    });


    if (!parentComment) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Parent comment not found.");
    }


    if (parentComment.videoId !== payload.videoId && parentComment.reviewId !== payload.reviewId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Parent comment does not belong to the specified video or review.");
    }


    const result = await prisma.comment.create({
        data: {
            ...payload,
            userId: userData.id,
            [target + "Id"]: payload[`${target}Id`],
        },
    });

    return result;
};


const getAllComment = async () => {

    const result = await prisma.comment.findMany()
    return result;
};
const getCommentByContent = async (contentId: string, userId?: string) => {
    await prisma.video.findFirstOrThrow({
        where: { id: contentId },
    });

    const result = await prisma.comment.findMany({
        where: {
            videoId: contentId,
            OR: [{ status: 'APPROVED' }, ...(userId ? [{ userId }] : [])],
            parentCommentId: null,
        },
        include: {
            _count: {
                select: { Like: true },
            },
            replies: {
                where: {
                    OR: [{ status: 'APPROVED' }, ...(userId ? [{ userId }] : [])],
                },
                include: {
                    user: true,
                    _count: {
                        select: { Like: true },
                    },
                    Like: userId
                        ? {
                            where: { userId },
                            select: { commentId: true },
                        }
                        : false,
                },
            },
            user: true,
            Like: userId
                ? {
                    where: { userId },
                    select: { commentId: true },
                }
                : false,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    result.forEach((comment: any) => {
        comment.isLiked = comment.Like && comment.Like.length > 0;
        comment.likes = comment._count?.Like ?? 0;

        comment.replies?.forEach((reply: any) => {
            reply.isLiked = reply.Like && reply.Like.length > 0;
            reply.likes = reply._count?.Like ?? 0;

            delete reply.Like;
            delete reply._count;
        });

        delete comment.Like;
        delete comment._count;
    });

    return result;
};


const editComment = async (user: IAuthUser, commentId: string, payload: any) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });

    const comment = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
        },
    });
     console.log(userData);
    if (comment.userId !== userData.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to edit this review');
    }

    const result = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            ...payload,
        },
    });

    return result;
};

const deleteComment = async (user: IAuthUser, commentId: string) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });
        
    const comment = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
            status: CommentStatus.PENDING,
        },
    });

    if (comment.userId !== userData.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to edit this review');
    }

    const result = await prisma.comment.delete({
        where: {
            id: commentId,
        },
    });

    return result;
};

const getSingleComment = async (commentId: string) => {

    const result = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
        },
    });
    return result;
};
const getCommentByUser = async (userId: string) => {

    const result = await prisma.comment.findMany({
        where: {
            userId: userId,
        },
    });

    return result;
}

const getCommentByReviewId=async(id:string)=>{
    const isExist=await prisma.comment.findFirst({
        where:{
            reviewId:id
        }
    })
    if(!isExist){
        throw new ApiError(httpStatus.NOT_FOUND,'Reply not found')
    }
    const result = await prisma.comment.findMany({
        where: {
            reviewId: id,
        },
        include:{
            user:true
        }
    }
    );
    return result;
}
export const CommentServices = {
    addComment,
    getAllComment,
    editComment,
    deleteComment,
    getSingleComment,
    getCommentByUser,
    getCommentByContent,
    getCommentByReviewId
}
