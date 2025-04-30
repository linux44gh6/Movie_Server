import httpStatus from "http-status";
import { uploadToCloudinary } from "../../../utils"
import { Prisma, PrismaClient } from "@prisma/client"
import ApiError from "../../errors/ApiError";
const prisma = new PrismaClient()

const createContent = async (req: any) => {
    try {
        const file = req.file
        if (file) {
            const uploadImage = await uploadToCloudinary(file)
            req.body.thumbnailImage = uploadImage.secure_url
        }
        const content = await prisma.video.create({
            data: req.body
        })
        return content
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message)
    }
}


interface SearchParams {
    searchTerm?: string;
    [key: string]: any; // For dynamic field filters
}

const searchableFields = ["title", "description", "director", "cast", "genre"];

const getAllContent = async (params: SearchParams) => {
    try {
        const { searchTerm, ...exactMatchFields } = params;

        const conditions: Prisma.VideoWhereInput[] = [];

        //*create search conditions for searchable fields
        if (searchTerm) {
            conditions.push({
                OR: searchableFields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }))
            });
        }

        //*create conditions for exact match fields
        if (Object.keys(exactMatchFields).length > 0) {
            conditions.push({
                AND: Object.entries(exactMatchFields).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return { [key]: { in: value } };
                    }
                    return { [key]: { equals: value } };
                })
            });
        }

        const whereConditions: Prisma.VideoWhereInput = conditions.length > 0
            ? { AND: conditions }
            : {};

        return await prisma.video.findMany({
            where: whereConditions,
            // Consider adding for better performance:
            // take: 20, // Pagination limit
            // orderBy: { createdAt: 'desc' } // Default sorting
        });

    } catch (err) {
        const error = err instanceof Error ? err : new Error('Database operation failed');
        // More appropriate status code for database errors
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};
export const contentService = {
    createContent,
    getAllContent
}
