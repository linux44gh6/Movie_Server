import { ReviewStatus } from "@prisma/client"
import prisma from "../../../helpers/prisma"


const approveOrUnpublishReview = async (reviewId: string, payload: { status: ReviewStatus }) => {

    await prisma.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    })


    const result = await prisma.review.update({
        where: {
            id: reviewId
        },
        data: {
            status: payload.status
        }
    })

    return result
}


export const AdminServices = {
    approveOrUnpublishReview
}
