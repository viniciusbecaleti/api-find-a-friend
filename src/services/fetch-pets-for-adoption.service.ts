import { PetsRepository } from '@/repositories/pets.repository'
import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization, Pet } from '@prisma/client'

interface FetchPetsForAdoptionServiceRequest {
  filters: {
    city: string
    age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
    size?: 'SMALL' | 'MEDIUM' | 'BIG'
    energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
    independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
    species?: 'DOG' | 'CAT'
  }
  page: number
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
    filters: { city, age, size, energyLevel, independenceLevel, species },
    page,
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

    // Filtering
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

    // Order the pets by created_at
    const orderedPets = filteredPets.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )

    // Pagination
    const startIndex = (page - 1) * 20
    const endIndex = startIndex + 20
    const paginatedPets = orderedPets.slice(startIndex, endIndex)

    return {
      pets: paginatedPets,
    }
  }
}
