import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render } from '@/test/utils'
import Redirect from './Redirect'
import { BrowserRouter, Route, Routes } from 'react-router'

beforeEach(() => vi.clearAllMocks())

describe('`Redirect` component integration tests', () => {
  describe('integration with `useNavigate` hook', () => {
    test('updates the current route as soon as it gets rendered', () => {
      const ComponentMock = vi.fn().mockReturnValue(null)
      const destination = '/destination'

      render(
        <BrowserRouter>
          <Routes>
            <Route path={destination} element={<ComponentMock />} />
            <Route index path="/*" element={<Redirect to={destination} />} />
          </Routes>
        </BrowserRouter>,
      )

      expect(ComponentMock).toHaveBeenCalledTimes(1)
    })
  })
})
