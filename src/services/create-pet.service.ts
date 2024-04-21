import { PetsRepository } from '@/repositories/pets.repository'
import { RequirementsForAdoptionRepository } from '@/repositories/requirements-for-adoption.repository'

interface CreatePetServiceRequest {
  organizationId: string
  name: string
  about: string
  species: 'DOG' | 'CAT'
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  requirementsForAdoption?: string[]
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private requirementsForAdoptionRepository: RequirementsForAdoptionRepository,
  ) {}

  async execute({
    organizationId,
    name,
    about,
    species,
    age,
    size,
    energyLevel,
    independenceLevel,
    requirementsForAdoption = [],
  }: CreatePetServiceRequest) {
    const createdPet = await this.petsRepository.create({
      name,
      about,
      species,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      organization_id: organizationId,
    })

    if (requirementsForAdoption.length) {
      requirementsForAdoption.map((requiment) =>
        this.requirementsForAdoptionRepository.create({
          pet_id: createdPet.id,
          description: requiment,
        }),
      )
    }

    return {
      pet: createdPet,
    }
  }
}
