import { vi, describe, test, beforeEach, expect } from 'vitest'
import getApiClient from './api'
import axios from 'axios'

beforeEach(() => vi.clearAllMocks())

vi.mock('axios', () => ({ default: { create: vi.fn() } }))

describe('API service unit tests', () => {
  describe('`getApiClient` function', () => {
    test('calls the function to create an Axios client', async () => {
      getApiClient()

      expect(axios.create).toHaveBeenCalledTimes(1)
    })

    test('returns the client gotten from Axios', async () => {
      const expectedResult = axios.create()
      vi.spyOn(axios, 'create').mockReturnValue(expectedResult)

      const gottenResult = getApiClient()

      expect(gottenResult).toBe(expectedResult)
    })
  })
})
