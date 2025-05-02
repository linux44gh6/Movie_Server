import prisma from "../../../helpers/prisma";

const getAllTags = async () => {
    const result = await prisma.tag.findMany();
    return result
}

const createTag = async (payload: any) => {
    const result = await prisma.tag.createMany({
        data: payload.tags
    });
    return result
}

export const TagServices = {
    getAllTags,
    createTag
}
