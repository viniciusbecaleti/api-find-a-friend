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

    const { pets } = await sut.execute({
      city: 'Mogi Guaçu',
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
      city: 'Mogi Mirim',
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
      city: 'Mogi Guaçu',
      age: 'ADULT',
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
      city: 'Mogi Guaçu',
      size: 'BIG',
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
      city: 'Mogi Guaçu',
      energyLevel: 'LOW',
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
      city: 'Mogi Guaçu',
      independenceLevel: 'MEDIUM',
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
      city: 'Mogi Guaçu',
      species: 'CAT',
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
      city: 'Mogi Guaçu',
      species: 'CAT',
      age: 'ADULT',
    })

    expect(pets).toHaveLength(2)
  })
})
