import { getColor } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  color: ${getColor('white')};
`
