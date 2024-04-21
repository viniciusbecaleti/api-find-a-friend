import { Prisma, RequirementsForAdoption } from '@prisma/client'
import { randomUUID } from 'crypto'
import { RequirementsForAdoptionRepository } from '../requirements-for-adoption.repository'

export class InMemoryRequirementsForAdoptionRepository
  implements RequirementsForAdoptionRepository
{
  public items: RequirementsForAdoption[] = []

  async create(data: Prisma.RequirementsForAdoptionUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      pet_id: data.pet_id,
      description: data.description,
    }

    this.items.push(requirement)

    return requirement
  }
}
