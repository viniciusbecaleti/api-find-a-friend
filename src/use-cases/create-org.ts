import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface CreateOrgUseCaseProps {
  responsible: string
  email: string
  cep: string
  address: string
  phone: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsible,
    email,
    cep,
    address,
    phone,
    password,
  }: CreateOrgUseCaseProps) {
    const userAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('E-mail already in use')
    }

    const hashedPassword = await hash(password, 6)

    await this.orgsRepository.create({
      responsible,
      email,
      cep,
      address,
      phone,
      password: hashedPassword,
    })
  }
}
