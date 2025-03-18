import { getBorder, getSpace } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.header`
  padding: ${getSpace('small')} ${getSpace('huge')};
  border-bottom: ${getBorder('default')};

  @media (min-width: 768px) {
    padding: ${getSpace('medium')} ${getSpace('veryHuge')} ${getSpace('medium')};
  }
`

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  width: 100%;
`
