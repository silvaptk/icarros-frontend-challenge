import { getBorder, getSpace } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.main`
  margin-top: ${getSpace('veryHuge')};
  border-top: ${getBorder('default')};
  padding: ${getSpace('huge')};
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${getSpace('big')};
  max-width: 1440px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-top: ${getBorder('default')};
  padding: ${getSpace('big')} 0;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
`
