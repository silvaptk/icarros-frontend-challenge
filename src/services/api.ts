import axios from 'axios'

export default function getApiClient() {
  const client = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: 'http://localhost:3001',
  })

  return client
}
