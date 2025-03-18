import { getColor, getGradient, getRadius, getSpace } from '@/services/theme'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  aspect-ratio: 5/4;
  position: relative;
  margin-bottom: auto;
`

export const List = styled(motion.ul)`
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
`

export const Item = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  &:hover img {
    transform: scale(1.2);
  }

  img {
    transition-duration: 0.5s;
    transition-property: transform;
    height: 100%;
    width: auto;
  }
`

export const Footer = styled.div`
  position: absolute;
  background: ${getGradient('blackToTransparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  width: 100%;
  padding: ${getSpace('medium')};
  padding-top: ${getSpace('big')};
`

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${getSpace('medium')};
  color: ${getColor('white')};

  & > div {
    width: 2rem;
    background-color: ${getColor('translucidWhite')};
    height: 0.5rem;
    border-radius: ${getRadius('small')};

    div {
      background-color: ${getColor('white')};
      width: 1rem;
      border-radius: ${getRadius('small')};
      height: 100%;
    }
  }
`

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${getSpace('small')};

  button {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: ${getColor('white')};

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
