import { z } from "zod";


const updateReview = z.object({
    body: z.object({
        status: z.string({
            required_error: "Status is required",
        }),
    }),
});

export const AdminValidationSchema = {
    updateReview,
};
