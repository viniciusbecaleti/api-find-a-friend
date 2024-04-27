import { PrismaRequirementsForAdoptionRepository } from '@/repositories/prisma/prisma-requirements-for-adoption.repository'
import { CreateRequimentForAdoptionService } from '../create-requirement-for-adoption.service'

export function makeCreateRequimentForAdoptionService() {
  const requirementsForAdoptionRepository =
    new PrismaRequirementsForAdoptionRepository()
  const service = new CreateRequimentForAdoptionService(
    requirementsForAdoptionRepository,
  )

  return service
}
