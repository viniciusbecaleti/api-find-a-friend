import { prisma } from '@/lib/prisma'
import { PetsRepository } from '@/repositories/pets.repository'

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
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationId,
    name,
    about,
    species,
    age,
    size,
    energyLevel,
    independenceLevel,
    requirementsForAdoption,
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

    let createdRequerimentsForAdoption

    if (requirementsForAdoption) {
      const requirements = requirementsForAdoption.map((requirement) => {
        return {
          pet_id: createdPet.id,
          description: requirement,
        }
      })

      createdRequerimentsForAdoption =
        await prisma.requirementsForAdoption.createMany({
          data: requirements,
        })
    }

    return {
      pet: createdPet,
      requirementsForAdoption: createdRequerimentsForAdoption,
    }
  }
}
