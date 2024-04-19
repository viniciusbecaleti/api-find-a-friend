import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository {
  async create(
    data: Prisma.PetUncheckedCreateInput,
    requirementsForAdoption: string[],
  ) {
    await prisma.$transaction(async (tcx) => {
      const createdPet = await tcx.pet.create({
        data,
      })

      if (requirementsForAdoption.length) {
        const requirements = requirementsForAdoption.map((requirement) => {
          return {
            pet_id: createdPet.id,
            description: requirement,
          }
        })

        await tcx.requirementsForAdoption.createMany({
          data: requirements,
        })
      }

      return createdPet
    })
  }
}
