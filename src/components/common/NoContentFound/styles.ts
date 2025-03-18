import { getColor } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 20rem;
    height: 20rem;
  }
`

export const Title = styled.h2`
  color: ${getColor('primary')};
  margin: 0;
  margin-top: 2rem;
`

export const Description = styled.p`
  color: ${getColor('secondGray')};
  margin: 0;
  margin-top: 1rem;
`
