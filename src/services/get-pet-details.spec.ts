import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { GetPetDetailsService } from './get-pet-details.service'
import { PetNotFoundError } from './errors/pet-not-found-error'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetDetailsService

describe('Get Pet Details Service', async () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsService(inMemoryPetsRepository)
  })

  it('should be able to get a pet details', async () => {
    const createdPet = await inMemoryPetsRepository.create({
      name: 'Pet Name',
      about: 'Pet About',
      species: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      organization_id: 'organization-id',
      adopted: false,
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
  })

  it('should not be able to get a pet details if not exists', async () => {
    await expect(() =>
      sut.execute({
        petId: 'not-exists-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
