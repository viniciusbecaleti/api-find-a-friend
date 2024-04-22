import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet.service'
import { InMemoryRequirementsForAdoptionRepository } from '@/repositories/in-memory/in-memory-requirements-for-adoption.repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryRequirementsForAdoptionRepository: InMemoryRequirementsForAdoptionRepository
let sut: CreatePetService

describe('Create Pet Service', async () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryRequirementsForAdoptionRepository =
      new InMemoryRequirementsForAdoptionRepository()
    sut = new CreatePetService(
      inMemoryPetsRepository,
      inMemoryRequirementsForAdoptionRepository,
    )
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
      adopted: false,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to create a new pet with requiments', async () => {
    const { pet } = await sut.execute({
      organizationId: 'organization-id',
      name: 'Pet Name',
      about: 'Pet About',
      species: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      independenceLevel: 'HIGH',
      requirementsForAdoption: ['Requirement 1', 'Requirement 2'],
      adopted: false,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(inMemoryRequirementsForAdoptionRepository.items).toHaveLength(2)
  })
})
