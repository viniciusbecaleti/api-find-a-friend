import fasfify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fasfify()

app.post('/orgs', async (request, reply) => {
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

  await prisma.org.create({
    data: {
      responsible,
      email,
      cep,
      address,
      phone,
      password,
    },
  })

  return reply.status(201).send()
})
