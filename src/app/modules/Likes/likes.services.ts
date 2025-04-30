import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";


const likeVideo = async (user: IAuthUser, payload: any) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user?.email,
            isDeleted: false
        }
    })


    const existingVideo = await prisma.video.findUnique({
        where: {
            id: payload.videoId
        }
    });

    if (!existingVideo) {
        throw new ApiError(404, 'Video not found')
    }

    const existingLike = await prisma.like.findFirst({
        where: {
            userId: userData.id,
            videoId: payload.videoId
        }
    })

    if (existingLike) {
        return {
            message: 'You have already liked this video'
        }
    }

    const result = await prisma.like.create({
        data: {
            userId: userData.id,
            videoId: existingVideo.id
        }
    })

    // const result = await prisma.$transaction(async (tx) => {
    //     await tx.like.create({
    //         data: {
    //             userId: userData.id,
    //             videoId: payload.videoId
    //         }
    //     })

    //     await tx.video.update({
    //         where: {
    //             id: payload.videoId
    //         },
    //         data: {
    //             like: {
    //                 increment: 1
    //             }
    //         }
    //     })

    //     return {
    //         message: "Video liked successfully"
    //     }
    // })
    return result

}

export const LikeServices = {
    likeVideo
}
