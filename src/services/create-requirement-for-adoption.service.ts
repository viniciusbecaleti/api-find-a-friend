import { RequirementsForAdoptionRepository } from '@/repositories/requirements-for-adoption.repository'
import { RequirementsForAdoption } from '@prisma/client'

interface CreateRequimentForAdoptionServiceRequest {
  petId: string
  description: string
}

interface CreateRequimentForAdoptionServiceResponse {
  requirementForAdoption: RequirementsForAdoption
}

export class CreateRequimentForAdoptionService {
  constructor(
    private requirementsForAdoptionRepository: RequirementsForAdoptionRepository,
  ) {}

  async execute({
    petId,
    description,
  }: CreateRequimentForAdoptionServiceRequest): Promise<CreateRequimentForAdoptionServiceResponse> {
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
