import { Prisma } from '@prisma/client'
import { RequirementsForAdoptionRepository } from '../requirements-for-adoption.repository'
import { prisma } from '@/lib/prisma'

export class PrismaRequirementsForAdoptionRepository
  implements RequirementsForAdoptionRepository
{
  async create(data: Prisma.RequirementsForAdoptionUncheckedCreateInput) {
    const createdRequirementsForAdoption =
      await prisma.requirementsForAdoption.create({
        data,
      })

    return createdRequirementsForAdoption
  }
}
