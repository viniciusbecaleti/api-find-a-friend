import { PetsRepository } from '@/repositories/pets.repository'
import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization, Pet } from '@prisma/client'

interface FetchPetsForAdoptionServiceRequest {
  city: string
}

interface FetchPetsForAdoptionServiceResponse {
  petsForAdoption: Pet[]
}

export class FetchPetsForAdoptionService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
  }: FetchPetsForAdoptionServiceRequest): Promise<FetchPetsForAdoptionServiceResponse> {
    const organizationsFromCity: Organization[] =
      await this.organizationsRepository.findManyByCity(city)

    const petsForAdoption: Pet[] = []

    organizationsFromCity.forEach(async (organization) => {
      const petsFromOrganization =
        await this.petsRepository.findManyByOrganizationId(organization.id)

      const petsFilteredByAdoptionStatus = petsFromOrganization.filter(
        (pet) => pet.adopted === false,
      )

      petsForAdoption.push(...petsFilteredByAdoptionStatus)
    })

    return {
      petsForAdoption,
    }
  }
}
