import z from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type SigninType = z.infer<typeof signinSchema>;

export const createCourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
})

export type CreateCourseType = z.infer<typeof createCourseSchema>