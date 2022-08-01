import prisma from '../../utils/prisma'
import { CreateTrackerInput } from './tracker.schema'

export const createTracker = async (
  data: CreateTrackerInput & { ownerId: string }
) => {
  return prisma.tracker.create({ data })
}

export const getTrackers = async () => {
  return prisma.tracker.findMany({
    select: {
      id: true,
      title: true,
      maxAmount: true,
      currentAmount: true,
      createdAt: true,
      updatedAt: true,
      owner: true,
      ownerId: true
    }
  })
}
