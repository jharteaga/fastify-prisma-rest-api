import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'
import { userCore } from '../user/user.schema'

const trackerInput = {
  title: z.string(),
  maxAmount: z.number(),
  currentAmount: z.number()
}

const trackerGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
}

const createTrackerSchema = z.object({
  ...trackerInput
})

const trackerResponseSchema = z.object({
  ...trackerInput,
  ...trackerGenerated,
  owner: z.object(userCore)
})

const trackersResponseSchema = z.array(trackerResponseSchema)

export type CreateTrackerInput = z.infer<typeof createTrackerSchema>

export const { schemas: trackerSchemas, $ref } = buildJsonSchemas(
  {
    createTrackerSchema,
    trackersResponseSchema,
    trackerResponseSchema
  },
  { $id: 'tracker' }
)
