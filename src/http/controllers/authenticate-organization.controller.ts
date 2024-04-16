import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository'
import { AuthenticateOrganizationService } from '@/services/authenticate-organization.service'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
    const authenticateOrganizationService = new AuthenticateOrganizationService(
      prismaOrganizationsRepository,
    )

    const { organization } = await authenticateOrganizationService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
