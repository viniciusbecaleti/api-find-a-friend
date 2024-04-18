import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet.service'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('Register Organization Service', async () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(inMemoryPetsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      organizationId: 'organization-id',
      name: 'Pet Name',
      about: 'Pet About',
      species: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      independenceLevel: 'HIGH',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
