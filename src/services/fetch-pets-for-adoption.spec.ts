import { InMemoryOrganizationsRepository } from './../repositories/in-memory/in-memory-organizations.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { FetchPetsForAdoptionService } from './fetch-pets-for-adoption.service'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsForAdoptionService

describe('Fetch Pets For Adoption Service', async () => {
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsForAdoptionService(
      inMemoryOrganizationsRepository,
      inMemoryPetsRepository,
    )
  })

  it('should be able to search for pets for adoption in a city', async () => {
    const organizationOne = await inMemoryOrganizationsRepository.create({
      responsible_name: 'any_responsible_name',
      email: 'any_email',
      cep: 'any_cep',
      address: 'any_address',
      neighborhood: 'any_neighborhood',
      city: 'Mogi Guaçu',
      state: 'any_state',
      whatsapp: 'any_whatsapp',
      password: 'any_password',
    })

    const organizationTwo = await inMemoryOrganizationsRepository.create({
      responsible_name: 'any_responsible_name',
      email: 'other_email',
      cep: 'any_cep',
      address: 'any_address',
      neighborhood: 'any_neighborhood',
      city: 'Mogi Guaçu',
      state: 'any_state',
      whatsapp: 'any_whatsapp',
      password: 'any_password',
    })

    await inMemoryPetsRepository.create({
      organization_id: organizationOne.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    await inMemoryPetsRepository.create({
      organization_id: organizationTwo.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      adopted: false,
    })

    await inMemoryPetsRepository.create({
      organization_id: organizationTwo.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      adopted: true,
    })

    const { petsForAdoption } = await sut.execute({
      city: 'Mogi Guaçu',
    })

    expect(petsForAdoption).toHaveLength(2)
  })
})
