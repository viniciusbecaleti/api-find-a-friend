import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface createOrgUseCaseProps {
  responsible: string
  email: string
  cep: string
  address: string
  phone: string
  password: string
}

export async function createOrgUseCase({
  responsible,
  email,
  cep,
  address,
  phone,
  password,
}: createOrgUseCaseProps) {
  const userAlreadyExists = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('E-mail already in use')
  }

  const hashedPassword = await hash(password, 6)

  await prisma.org.create({
    data: {
      responsible,
      email,
      cep,
      address,
      phone,
      password: hashedPassword,
    },
  })
}
