import { getColor } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.div`
  width: 8rem;
  height: 0.25rem;
  background-color: ${getColor('firstGray')};
  margin-left: auto;
  margin-right: auto;
`

export const Bar = styled.div`
  @keyframes slide {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(6rem);
    }

    100% {
      transform: translateX(0);
    }
  }

  width: 2rem;
  height: 0.25rem;
  animation: slide 1s infinite;
  background-color: ${getColor('primary')};
`
