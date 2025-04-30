import prisma from "../../../helpers/prisma"
import { IAuthUser } from "../../interface/common"



const addReview = async (user: IAuthUser, payload: any) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    })

    await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    })

    const result = await prisma.review.create({
        data: {
            ...payload,
            userId: userData.id
        }
    })

    return result

}


export const ReviewServices = {
    addReview
}
