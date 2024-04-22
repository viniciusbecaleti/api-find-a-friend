import { PetsRepository } from '@/repositories/pets.repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { OrganizationsRepository } from '@/repositories/organizations.repository'

interface FetchPetsForAdoptionServiceRequest {
  city: string
}

export class FetchPetsForAdoptionService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({ city }: FetchPetsForAdoptionServiceRequest) {
    const organizationsFromCity =
      await this.organizationsRepository.findManyByCity(city)
  }
}
