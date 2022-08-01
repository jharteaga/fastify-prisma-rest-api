import { FastifyRequest } from 'fastify'
import { createTracker, getTrackers } from './tracker.services'
import { CreateTrackerInput } from './tracker.schema'

export const createTrackerHandler = async (
  request: FastifyRequest<{ Body: CreateTrackerInput }>
) => {
  const tracker = await createTracker({
    ...request.body,
    ownerId: request.user.id
  })

  return tracker
}

export const getTrackersHandler = async () => {
  const trackers = await getTrackers()
  return trackers
}
