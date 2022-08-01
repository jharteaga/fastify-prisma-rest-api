import { hashPassword } from '../../utils/hash'
import { CreateUserInput } from './user.schema'
import prisma from '../../utils/prisma'

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input

  const { hash, salt } = hashPassword(password)

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash }
  })

  return user
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}

export const findUsers = async () => {
  return prisma.user.findMany({
    select: {
      email: true,
      fullName: true,
      id: true
    }
  })
}
