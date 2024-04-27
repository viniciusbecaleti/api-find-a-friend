import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const createdPet = await prisma.pet.create({
      data,
    })

    return createdPet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByOrganizationId(organizationId: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: organizationId,
      },
    })

    return pets
  }
}
