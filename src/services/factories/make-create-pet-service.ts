import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { CreatePetService } from '../create-pet.service'
import { PrismaRequirementsForAdoptionRepository } from '@/repositories/prisma/prisma-requirements-for-adoption.repository'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const requirementsForAdoptionRepository =
    new PrismaRequirementsForAdoptionRepository()
  const service = new CreatePetService(
    petsRepository,
    requirementsForAdoptionRepository,
  )

  return service
}
