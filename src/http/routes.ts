import { FastifyInstance } from 'fastify'

import { authenticateOrganizationController } from './controllers/authenticate-organization.controller'
import { registerOrganizationController } from './controllers/register-organization.controller'

// import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', registerOrganizationController)
  app.post('/authenticate', authenticateOrganizationController)

  // Authenticated routes
  // app.post('/pets', { onRequest: [verifyJwt] }, createPetController)
}
