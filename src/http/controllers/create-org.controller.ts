import { CreateOrgUseCase } from '@/use-cases/create-org'
import { PrismaOrgsRepository } from './../../repositories/prisma/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { responsible, email, cep, address, phone, password } =
    createOrgBodySchema.parse(request.body)

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

    await createOrgUseCase.execute({
      responsible,
      email,
      cep,
      address,
      phone,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
