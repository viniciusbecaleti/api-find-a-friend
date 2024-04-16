export class OrganizationAlredyExistsError extends Error {
  constructor() {
    super('Já existe uma organização cadastrada com este email')
  }
}
