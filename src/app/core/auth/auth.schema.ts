import z from 'zod'

export const registrationFormSchema = z.object({
  userName: z.string().min(3).max(50),
  email: z.email().trim().nonempty('Email is required'),
  password: z.string().min(8),
  confirmPassword: z.string().trim().nonempty('Required confirm password'),
})

export type RegistrationFormInput = z.infer<typeof registrationFormSchema>

export const loginFormSchema = z.object({
  email: z.email('Must be a valid email').trim().nonempty(),
  password: z.string().nonempty(),
})

export type LoginFormInput = z.infer<typeof loginFormSchema>

export const loginRequestSchema = loginFormSchema.strict()
export type LoginRequest = z.infer<typeof loginRequestSchema>

export const registrationRequestSchema = z.object({
  userName: z.string().min(3).max(50),
  email: z.email().trim().nonempty(),
  password: z.string().min(8),
})

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>

export const userResponseSchema = z.object({
  id: z.uuid(),
  accessToken: z.string(),
  refreshToken: z.string(),
  userName: z.string(),
  email: z.email(),
  role: z.enum(['user', 'admin']).optional(),
  createdAt: z.iso.datetime(),
})

export type UserResponse = z.infer<typeof userResponseSchema>
