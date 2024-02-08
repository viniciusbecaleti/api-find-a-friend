import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createOrgUseCase } from '@/use-cases/create-org'

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
    await createOrgUseCase({
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
