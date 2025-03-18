import { getSpace } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.main`
  padding-top: ${getSpace('veryHuge')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${getSpace('huge')};
`
