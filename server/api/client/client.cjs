import { defineEventHandler, readBody } from 'h3'
import * as clientService from '../../services/clientService.cjs'

export default defineEventHandler(async (event) => {
  const { method } = event.node.req

  if (method === 'GET') {
    try {
      const clients = await clientService.getAllClients()
      return clients
    } catch (error) {
      return { error: error.message }
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { name, phone, email, address } = body

    if (!name || !phone) {
      return { error: 'Name and phone are required' }
    }

    try {
      const newClient = await clientService.createClient(name, phone, email, address)
      return newClient
    } catch (error) {
      return { error: error.message }
    }
  }

  return { error: 'Method not allowed' }
})
