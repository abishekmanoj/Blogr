'use client'

import Link from "next/link"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Controller, useForm } from "react-hook-form"
import { signInSchema, SignInValues, signUpSchema, SignUpValues } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"



const AuthPage = () => {

    const router = useRouter()
    const[isPending, startTransition] = useTransition()

    const signInForm = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '' , password: '' }
    })

    const signUpForm = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: ''}
    })

    const onSignIn = async (data: SignInValues) => {
        startTransition(async () => {
            try {
                await authClient.signIn.email({
                    email: data.email,
                    password: data.password,
                    fetchOptions: {
                        onSuccess: () => {
                            toast.success('Logged in', { position: "top-right"})
                            router.push('/')
                        },
                        onError: (error) => {
                            toast.error(error.error.message, { position: "top-right"})
                            signInForm.clearErrors()
                        }
                }
            })

        } catch (error) {
            console.log(error)
        }
        })
    }

    const onSignUp = (data: SignUpValues) => {
        startTransition(async () => {
            try {
            await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Account created Successfully', { position: "top-right"})
                        router.push('/')
                    },
                    onError: (error) => {
                        toast.error(error.error.message, { position: "top-right"})
                        signInForm.clearErrors()
                    }
                }
            
            })
            } catch (error) {
                console.log(error)
            }
        })
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6">
            <div className="w-full max-w-md shadow-2xs">
                <Card className="shadow-2xs">

                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl"> Welcome to Blog<span className="text-3xl text-emerald-500">r</span> </CardTitle>
                        <CardDescription>
                            Sign in to continue, or create an account to get started.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col">

                         <Tabs className="w-full" defaultValue='signin'>
                            <TabsList className="grid grid-cols-2 w-full"  variant='line'>
                                <TabsTrigger value="signin">Sign in</TabsTrigger>
                                <TabsTrigger value="signup">Sign up</TabsTrigger>
                            </TabsList>

                            
                            
                            {/* SIGN-IN */}
                            <TabsContent value="signin" className="mt-6">
                                <form className="space-y-4" onSubmit={signInForm.handleSubmit(onSignIn)}>
                                    <FieldGroup>
                                        <Controller 
                                            name = 'email'
                                            control={signInForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Email </FieldLabel>
                                                        <Input
                                                            id="signin-email"
                                                            type="email"
                                                            placeholder="you@email.com"
                                                            aria-invalid={fieldState.invalid}
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Controller 
                                            name = 'password'
                                            control={signInForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Password </FieldLabel>
                                                        <Input
                                                            id="signin-password"
                                                            type="password"
                                                            placeholder="********"
                                                            aria-invalid={fieldState.invalid}
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>

                                    <Button className="w-full" type="submit" disabled={isPending}>
                                        { isPending ? ( <><span> Signing in... </span> <Loader2 className="size-4 animate-spin" /> </>) : <span> Sign In</span>}
                                    </Button>

                                </form>

                            </TabsContent>

                            {/* SIGN-UP */}
                             <TabsContent value="signup" className="mt-6">
                                <form className="space-y-5" onSubmit={signUpForm.handleSubmit(onSignUp)}>

                                    <FieldGroup>
                                        <Controller 
                                            name = 'name'
                                            control={signUpForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Name </FieldLabel>
                                                        <Input
                                                            id="signup-name"
                                                            type="text"
                                                            placeholder="First Last"
                                                            aria-invalid={fieldState.invalid}
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Controller 
                                            name = 'email'
                                            control={signUpForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Email </FieldLabel>
                                                        <Input
                                                            id="signup-email"
                                                            type="email"
                                                            placeholder="you@email.com"
                                                            aria-invalid={fieldState.invalid}
                                                            
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>
                                    

                                    <FieldGroup>
                                        <Controller 
                                            name = 'password'
                                            control={signUpForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Password </FieldLabel>
                                                        <Input
                                                            id="signup-password"
                                                            type="password"
                                                            placeholder="********"
                                                            aria-invalid={fieldState.invalid}
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Controller 
                                            name = 'confirmPassword'
                                            control={signUpForm.control}
                                            render={({ field, fieldState}) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel> Password </FieldLabel>
                                                        <Input
                                                            id="signup-confirmPassword"
                                                            type="password"
                                                            placeholder="********"
                                                            aria-invalid={fieldState.invalid}
                                                            {...field}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )
                                            }}
                                        />
                                    </FieldGroup>

                                    <Button className="w-full" type="submit">
                                        { isPending ? ( <> <span> Signing up... </span> <Loader2 className="size-4 animate-spin" /> </>) : <span> Sign Up</span>}
                                    </Button>
                                    
                                </form>

                             </TabsContent>

                         </Tabs>

                    </CardContent>

                </Card>

            </div>
        </div>
    )
}

export default AuthPage
