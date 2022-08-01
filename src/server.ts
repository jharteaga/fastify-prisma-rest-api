import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import { withRefResolver } from 'fastify-zod'
import userRoutes from './modules/user/user.route'
import trackerRoutes from './modules/tracker/tracker.route'
import { userSchemas } from './modules/user/user.schema'
import { trackerSchemas } from './modules/tracker/tracker.schema'
import { version } from '../package.json'

export const server = Fastify()

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string
      fullName: string
      email: string
    }
  }
}

server.register(fastifyJwt, {
  secret: 'mysecretkey2022'
})

server.decorate(
  'auth',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.send(err)
    }
  }
)

server.get('/healthcheck', async (request, reply) => {
  return { status: 'Up and running' }
})

const start = async () => {
  for (const s of [...userSchemas, ...trackerSchemas]) {
    server.addSchema(s)
  }

  server.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Expenses Tracker API',
          description: 'API for Expenses Tracker',
          version
        }
      }
    })
  )

  server.register(userRoutes, { prefix: 'api/users' })
  server.register(trackerRoutes, { prefix: 'api/trackers' })

  try {
    await server.listen({ port: 3000 })
    server.log.info(`server listening on port 3000`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
