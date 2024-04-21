import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRequirementsForAdoptionRepository } from '@/repositories/in-memory/in-memory-requirements-for-adoption.repository'
import { CreateRequimentForAdoptionService } from './create-requirement-for-adoption.service'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'

let inMemoryRequirementsForAdoptionRepository: InMemoryRequirementsForAdoptionRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: CreateRequimentForAdoptionService

describe('Create Requiment For Adoption Service', async () => {
  beforeEach(async () => {
    inMemoryRequirementsForAdoptionRepository =
      new InMemoryRequirementsForAdoptionRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new CreateRequimentForAdoptionService(
      inMemoryRequirementsForAdoptionRepository,
    )
  })

  it('should be able to create a requiment for adoption for pet', async () => {
    const { id: petId } = await inMemoryPetsRepository.create({
      name: 'Pet Name',
      about: 'Pet About',
      species: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      organization_id: 'organization-id',
    })

    const { requirementForAdoption } = await sut.execute({
      petId,
      description: 'Requirement 1',
    })

    expect(requirementForAdoption.id).toEqual(expect.any(String))
  })
})
