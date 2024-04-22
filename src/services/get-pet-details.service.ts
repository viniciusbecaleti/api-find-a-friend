import { PetsRepository } from '@/repositories/pets.repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetDetailsServiceRequest {
  petId: string
}

export class GetPetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetDetailsServiceRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet,
    }
  }
}
