import { InMemoryOrganizationsRepository } from './../repositories/in-memory/in-memory-organizations.repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.useRealTimers()
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

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
      },
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search for pets for adoption in a city (empty array)', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Mirim',
      },
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })

  it('should be able to search for pets for adoption in a city by age', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
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
      organization_id: organization.id,
      name: 'Pet Grande',
      about: 'any_about',
      species: 'DOG',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        age: 'ADULT',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets for adoption in a city by size', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
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
      organization_id: organization.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        size: 'BIG',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets for adoption in a city by energy level', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
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
      organization_id: organization.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        energyLevel: 'LOW',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets for adoption in a city by independence level', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
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
      organization_id: organization.id,
      name: 'any_name',
      about: 'any_about',
      species: 'DOG',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        independenceLevel: 'MEDIUM',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets for adoption in a city by species', async () => {
    const organization = await inMemoryOrganizationsRepository.create({
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

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
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
      organization_id: organization.id,
      name: 'any_name',
      about: 'any_about',
      species: 'CAT',
      age: 'ADULT',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        species: 'CAT',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets for adoption in a city by multiple filters', async () => {
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
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      adopted: false,
    })

    await inMemoryPetsRepository.create({
      organization_id: organizationOne.id,
      name: 'any_name',
      about: 'any_about',
      species: 'CAT',
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
      species: 'CAT',
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
      species: 'CAT',
      age: 'BABY',
      size: 'BIG',
      energy_level: 'LOW',
      independence_level: 'MEDIUM',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
        species: 'CAT',
        age: 'ADULT',
      },
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search for pets for adoption in a city by page', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

    const organization = await inMemoryOrganizationsRepository.create({
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

    for (let i = 1; i <= 20; i++) {
      await inMemoryPetsRepository.create({
        organization_id: organization.id,
        name: 'any_name',
        about: 'any_about',
        species: 'DOG',
        age: 'ADULT',
        size: 'BIG',
        energy_level: 'LOW',
        independence_level: 'MEDIUM',
        adopted: false,
      })
    }

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await inMemoryPetsRepository.create({
      organization_id: organization.id,
      name: `Mel`,
      about: 'any_about',
      species: 'DOG',
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'LOW',
      adopted: false,
    })

    const { pets } = await sut.execute({
      filters: {
        city: 'Mogi Guaçu',
      },
      page: 2,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Mel',
      }),
    ])
  })
})
