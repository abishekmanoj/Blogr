import { z } from "zod"


const emailSchema = z.email("Enter a valid email").trim().toLowerCase()

const passwordSchema = z.string().min(5, "Password must lie between 5-25 characters").max(25, "Password must lie between 5-25 characters")


export const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),

})

export const signUpSchema = z.object({
        name: z.string().trim().min(2, 'Name should be atleast 2 characters').max(20, 'Name too long'),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Please confirm your password')
        }).superRefine(({ password, confirmPassword}, ctx) => {
                if(password !== confirmPassword){
                    ctx.addIssue({
                        code: 'custom',
                        path: ['confirmPassword'],
                        message: "Passwords do not match"
                    })
                }
        })

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>