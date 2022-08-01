import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

export const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  fullName: z.string({
    required_error: 'Full name is required',
    invalid_type_error: 'Full name must be a string'
  })
}

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  })
})

const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  password: z.string()
})

const loginResponseSchema = z.object({
  accessToken: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
  },
  { $id: 'user' }
)
