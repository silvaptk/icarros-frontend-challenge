import {
  getBorder,
  getColor,
  getFontSize,
  getRadius,
  getSpace,
} from '@/services/theme'
import styled from 'styled-components'

export const Container = styled.li`
  border: ${getBorder('default')};
  border-radius: ${getRadius('default')};
  overflow: hidden;

  & > button {
    margin: ${getSpace('medium')};
    margin-bottom: ${getSpace('big')};
  }

  small {
    font-size: ${getFontSize('small')};
  }
`

export const FirstSection = styled.section`
  display: flex;
  align-items: center;
  margin: ${getSpace('huge')} ${getSpace('large')} 0;
  padding-bottom: ${getSpace('big')};
  border-bottom: ${getBorder('default')};
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;

    h3 {
      margin: 0;
      margin-bottom: ${getSpace('small')};
    }

    small {
      color: ${getColor('thirdGray')};
    }
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    padding: ${getSpace('medium')};
    color: ${getColor('secondGray')};
    cursor: pointer;
    transition-duration: 0.3s;

    &:hover {
      color: ${getColor('fourthGray')};
    }

    &:disabled {
      color: ${getColor('secondGray')};
      cursor: not-allowed;
    }

    &.active {
      color: ${getColor('primary')};
    }

    svg {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
`

export const Price = styled.h4`
  margin: ${(props) => props.theme.spaces.large};
`

export const SecondSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: ${getSpace('large')};
  align-items: center;
  color: ${getColor('fourthGray')};

  div {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
  }

  p {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
