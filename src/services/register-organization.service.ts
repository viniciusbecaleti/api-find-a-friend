import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { hash } from 'bcryptjs'
import { OrganizationAlredyExistsError } from './errors/organization-alredy-exists-error'

interface RegisterOrganizationServiceRequest {
  responsibleName: string
  email: string
  address: string
  cep: string
  password: string
  whatsapp: string
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    address,
    cep,
    email,
    password,
    responsibleName,
    whatsapp,
  }: RegisterOrganizationServiceRequest) {
    const organizationAlreadyExists =
      await this.organizationsRepository.findOrganizationByEmail(email)

    if (organizationAlreadyExists) {
      throw new OrganizationAlredyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    const createdOrganization = await this.organizationsRepository.create({
      responsible_name: responsibleName,
      email,
      address,
      cep,
      password: hashedPassword,
      whatsapp,
    })

    return {
      organization: createdOrganization,
    }
  }
}
