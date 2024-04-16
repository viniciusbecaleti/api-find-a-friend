import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrganizationsRepository {
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
}
