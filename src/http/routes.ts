import { FastifyInstance } from 'fastify'

import { authenticateOrganizationController } from './controllers/authenticate-organization.controller'
import { registerOrganizationController } from './controllers/register-organization.controller'

import { verifyJwt } from './middlewares/verify-jwt'
import { createPetController } from './controllers/create-pet.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrganizationController)
  app.post('/session', authenticateOrganizationController)

  // Authenticated routes
  app.post('/pets', { onRequest: [verifyJwt] }, createPetController)
}
