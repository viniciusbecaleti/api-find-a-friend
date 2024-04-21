import { Prisma, RequirementsForAdoption } from '@prisma/client'

export interface RequirementsForAdoptionRepository {
  create(
    data: Prisma.RequirementsForAdoptionUncheckedCreateInput,
  ): Promise<RequirementsForAdoption>
}
