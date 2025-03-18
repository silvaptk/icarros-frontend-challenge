import { getBorder, getColor, getSpace } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  padding: ${getSpace('medium')} ${getSpace('big')};
  border: ${getBorder('default')};
  border-color: ${getColor('secondary')};
  color: ${getColor('secondary')};
  text-transform: lowercase;
  background-color: white;
  border-radius: ${getSpace('small')};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.5;
  }
`
