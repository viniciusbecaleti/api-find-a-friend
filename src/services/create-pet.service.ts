import { PetsRepository } from '@/repositories/pets.repository'
import { RequirementsForAdoptionRepository } from '@/repositories/requirements-for-adoption.repository'
import { Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  organizationId: string
  name: string
  about: string | null
  species: 'DOG' | 'CAT'
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  requirementsForAdoption?: string[]
  adopted?: boolean
}

interface CreatePetServiceResponse {
  pet: Pet
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
    adopted = false,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const createdPet = await this.petsRepository.create({
      name,
      about,
      species,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      organization_id: organizationId,
      adopted,
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
