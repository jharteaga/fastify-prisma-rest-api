import { FastifyInstance } from 'fastify'
import { createTrackerHandler, getTrackersHandler } from './tracker.controller'
import { $ref } from './tracker.schema'

const trackerRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      preHandler: [server.auth],
      schema: {
        body: $ref('createTrackerSchema'),
        response: {
          201: $ref('trackerResponseSchema')
        }
      }
    },
    createTrackerHandler
  )

  server.get(
    '/',
    {
      preHandler: [server.auth],
      schema: {
        response: {
          200: $ref('trackersResponseSchema')
        }
      }
    },
    getTrackersHandler
  )
}

export default trackerRoutes
