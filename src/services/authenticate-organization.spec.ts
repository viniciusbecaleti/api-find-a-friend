import { InMemoryOrganizationsRepository } from './../repositories/in-memory/in-memory-organizations.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationService } from './authenticate-organization.service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationService

describe('Authenticate Organization Service', async () => {
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationService(inMemoryOrganizationsRepository)
  })

  it('should be able to authenticate a organization', async () => {
    const email = 'any_email'
    const password = 'any_password'

    await inMemoryOrganizationsRepository.create({
      email,
      password: await hash(password, 6),
      address: 'any_address',
      cep: 'any_cep',
      responsible_name: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    const { organization } = await sut.execute({
      email,
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a organization with wrong email', async () => {
    const password = 'any_password'

    await inMemoryOrganizationsRepository.create({
      email: 'any_email',
      password: await hash(password, 6),
      address: 'any_address',
      cep: 'any_cep',
      responsible_name: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    await expect(() =>
      sut.execute({
        email: 'other_email',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a organization with wrong password', async () => {
    const email = 'any_email'

    await inMemoryOrganizationsRepository.create({
      email,
      password: await hash('any_password', 6),
      address: 'any_address',
      cep: 'any_cep',
      responsible_name: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    await expect(() =>
      sut.execute({
        email,
        password: 'other_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
