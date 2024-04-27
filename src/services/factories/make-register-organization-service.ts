import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository'
import { RegisterOrganizationService } from '../register-organization.service'

export function makeRegisterOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const service = new RegisterOrganizationService(organizationsRepository)

  return service
}
