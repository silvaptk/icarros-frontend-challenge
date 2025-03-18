import { ReactNode } from 'react'

import * as S from './styles'

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
  return <S.Container onClick={onClick}>{children}</S.Container>
}
