import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    requirementsForAdoption: string[],
  ): Promise<Pet>
}
