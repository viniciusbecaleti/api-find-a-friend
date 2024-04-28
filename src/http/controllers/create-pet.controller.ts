import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetBodySchema = z.object({
    name: z.string().min(1),
    about: z.string().nullable(),
    species: z.enum(['DOG', 'CAT']),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    adopted: z.boolean().default(false),
    organizationId: z.string().uuid(),
    requirementsForAdoption: z.array(z.string()).optional(),
  })

  const {
    name,
    about,
    species,
    age,
    size,
    energyLevel,
    independenceLevel,
    adopted,
    organizationId,
    requirementsForAdoption,
  } = createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()

  await createPetService.execute({
    name,
    about,
    species,
    age,
    size,
    energyLevel,
    independenceLevel,
    adopted,
    requirementsForAdoption,
    organizationId,
  })

  return reply.status(201).send()
}
