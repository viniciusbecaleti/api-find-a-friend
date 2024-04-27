import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      whatsapp: data.whatsapp,
      password: data.password,
    }

    this.items.push(organization)

    return organization
  }

  async findOrganizationByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findManyByCity(city: string) {
    const organizations = this.items.filter((item) => item.city === city)

    return organizations
  }
}
