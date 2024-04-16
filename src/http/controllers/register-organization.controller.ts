import { RegisterOrganizationService } from '@/services/register-organization.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations.repository'
import { OrganizationAlredyExistsError } from '@/services/errors/organization-alredy-exists-error'

export async function registerOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    responsibleName: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    address: z.string(),
    whatsapp: z.string().length(11),
    password: z.string().min(6),
  })

  const { responsibleName, email, address, cep, password, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
    const registerOrganizationService = new RegisterOrganizationService(
      prismaOrganizationsRepository,
    )

    await registerOrganizationService.execute({
      responsibleName,
      email,
      address,
      cep,
      password,
      whatsapp,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrganizationAlredyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
