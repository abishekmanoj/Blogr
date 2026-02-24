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



const AuthPage = () => {

    const signInForm = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '' , password: '' }
    })

    const signUpForm = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: ''}
    })

    const onSignIn = () => {

    }

    const onSignUp = () => {

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

                                    <Button className="w-full" type="submit">
                                        Sign In
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
                                                            type="name"
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
                                                            placeholder="Password"
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
                                                            placeholder="Confirm Password"
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
                                        Signup
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
