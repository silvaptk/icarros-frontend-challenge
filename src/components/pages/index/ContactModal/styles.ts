import { getColor, getRadius, getSpace } from '@/services/theme'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${getColor('translucidBlack')};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContent = styled.div`
  background-color: ${getColor('white')};
  padding: ${getSpace('big')};
  border-radius: ${getRadius('large')};
  width: 90%;
  max-width: 540px;
`

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${getColor('primary')};
`

export const ModalSubtitle = styled.p`
  color: ${getColor('thirdGray')};
`

export const ContactData = styled.datalist`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: ${getSpace('huge')} 0;

  dt {
    font-weight: bold 
    color: ${getColor('thirdGray')};
  }

  dd {
    color: ${getColor('fourthGray')};
  }
`
