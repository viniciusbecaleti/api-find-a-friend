import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const createdOrganization = await prisma.organization.create({
      data,
    })

    return createdOrganization
  }

  async findOrganizationByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findManyByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
    })

    return organizations
  }
}
