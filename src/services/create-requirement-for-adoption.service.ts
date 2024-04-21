import { RequirementsForAdoptionRepository } from '@/repositories/requirements-for-adoption.repository'

interface CreateRequimentForAdoptionServiceRequest {
  petId: string
  description: string
}

export class CreateRequimentForAdoptionService {
  constructor(
    private requirementsForAdoptionRepository: RequirementsForAdoptionRepository,
  ) {}

  async execute({
    petId,
    description,
  }: CreateRequimentForAdoptionServiceRequest) {
    const createdRequirementForAdoption =
      await this.requirementsForAdoptionRepository.create({
        pet_id: petId,
        description,
      })

    return {
      requirementForAdoption: createdRequirementForAdoption,
    }
  }
}
