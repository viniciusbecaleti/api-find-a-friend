import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      organization_id: data.organization_id,
      name: data.name,
      about: data.about,
      species: data.species,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
    }

    this.items.push(pet)

    return pet
  }
}
