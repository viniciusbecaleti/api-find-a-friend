import fasfify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fasfify()

app.register(appRoutes)
