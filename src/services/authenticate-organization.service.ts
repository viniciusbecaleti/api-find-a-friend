import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Organization } from '@prisma/client'

interface AuthenticateOrganizationServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationServiceResponse {
  organization: Organization
}

export class AuthenticateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
    const organization =
      await this.organizationsRepository.findOrganizationByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const passwordMatching = await compare(password, organization.password)

    if (!passwordMatching) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
