import { RegisterOrganizationService } from '@/services/register-organization.service'
import { InMemoryOrganizationsRepository } from './../repositories/in-memory/in-memory-organizations.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationAlredyExistsError } from './errors/organization-alredy-exists-error'
import { compare } from 'bcryptjs'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let registerOrganizationService: RegisterOrganizationService

describe('Register Organization Service', async () => {
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    registerOrganizationService = new RegisterOrganizationService(
      inMemoryOrganizationsRepository,
    )
  })

  it('should be able to register a new organization', async () => {
    const { organization } = await registerOrganizationService.execute({
      address: 'any_address',
      cep: 'any_cep',
      email: 'any_email',
      password: 'any_password',
      responsibleName: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.address).toBe('any_address')
    expect(organization.whatsapp).toBe('any_whatsapp')
  })

  it('should not be able to register a new organization with an email that is already in use', async () => {
    await registerOrganizationService.execute({
      address: 'any_address',
      cep: 'any_cep',
      email: 'any_email',
      password: 'any_password',
      responsibleName: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    await expect(() =>
      registerOrganizationService.execute({
        address: 'any_address',
        cep: 'any_cep',
        email: 'any_email',
        password: 'any_password',
        responsibleName: 'any_responsible_name',
        whatsapp: 'any_whatsapp',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlredyExistsError)
  })

  it('should be able to hashed the password before saving it', async () => {
    const { organization } = await registerOrganizationService.execute({
      address: 'any_address',
      cep: 'any_cep',
      email: 'any_email',
      password: 'any_password',
      responsibleName: 'any_responsible_name',
      whatsapp: 'any_whatsapp',
    })

    const isPasswordHashed = await compare(
      'any_password',
      organization.password,
    )

    expect(isPasswordHashed).toBe(true)
  })
})
