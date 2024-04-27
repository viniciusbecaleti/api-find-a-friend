import { PetsRepository } from '@/repositories/pets.repository'
import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization, Pet } from '@prisma/client'

interface FetchPetsForAdoptionServiceRequest {
  city: string
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  species?: 'DOG' | 'CAT'
}

interface FetchPetsForAdoptionServiceResponse {
  pets: Pet[]
}

export class FetchPetsForAdoptionService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independenceLevel,
    species,
  }: FetchPetsForAdoptionServiceRequest): Promise<FetchPetsForAdoptionServiceResponse> {
    const organizationsFromCity: Organization[] =
      await this.organizationsRepository.findManyByCity(city)

    const allPetsForAdoption: Pet[] = []

    for await (const organization of organizationsFromCity) {
      const petsFromOrganization =
        await this.petsRepository.findManyByOrganizationId(organization.id)

      const petsFilteredByAdoptionStatus = petsFromOrganization.filter(
        (pet) => pet.adopted === false,
      )

      allPetsForAdoption.push(...petsFilteredByAdoptionStatus)
    }

    let filteredPets = allPetsForAdoption

    if (age) {
      filteredPets = filteredPets.filter((pet) => pet.age === age)
    }

    if (size) {
      filteredPets = filteredPets.filter((pet) => pet.size === size)
    }

    if (energyLevel) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === energyLevel,
      )
    }

    if (independenceLevel) {
      filteredPets = filteredPets.filter(
        (pet) => pet.independence_level === independenceLevel,
      )
    }

    if (species) {
      filteredPets = filteredPets.filter((pet) => pet.species === species)
    }

    return {
      pets: filteredPets,
    }
  }
}
