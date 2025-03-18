import { getColor, getRadius, getSpace } from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.form`
  border: 1px solid #eee;
  border-radius: ${getRadius('small')};
  padding: ${getSpace('tiny')} ${getSpace('small')};
  display: flex;
  align-items: center;
  gap: ${getSpace('small')};

  & svg {
    color: ${getColor('thirdGray')};
  }
`

export const Input = styled.input`
  border: none;
  outline: none;

  &::placeholder {
    color: ${getColor('thirdGray')};
  }
`
