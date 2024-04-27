import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { hash } from 'bcryptjs'
import { OrganizationAlredyExistsError } from './errors/organization-alredy-exists-error'
import { Organization } from '@prisma/client'

interface RegisterOrganizationServiceRequest {
  responsibleName: string
  email: string
  cep: string
  address: string
  neighborhood: string
  city: string
  state: string
  whatsapp: string
  password: string
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    responsibleName,
    email,
    cep,
    address,
    neighborhood,
    city,
    state,
    whatsapp,
    password,
  }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
    const organizationAlreadyExists =
      await this.organizationsRepository.findOrganizationByEmail(email)

    if (organizationAlreadyExists) {
      throw new OrganizationAlredyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    const createdOrganization = await this.organizationsRepository.create({
      responsible_name: responsibleName,
      email,
      cep,
      address,
      neighborhood,
      city,
      state,
      whatsapp,
      password: hashedPassword,
    })

    return {
      organization: createdOrganization,
    }
  }
}
