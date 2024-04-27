import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { FetchPetsForAdoptionService } from '../fetch-pets-for-adoption.service'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository'

export function makeFetchPetsForAdoptionService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const service = new FetchPetsForAdoptionService(
    organizationsRepository,
    petsRepository,
  )

  return service
}
