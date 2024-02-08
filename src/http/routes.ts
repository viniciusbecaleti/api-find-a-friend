import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/create-org.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}
