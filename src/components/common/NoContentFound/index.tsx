import { ReactNode } from 'react'
import * as S from './styles'
import NotFoundIllustration from '@/assets/illustrations/not-found.svg?react'

interface NoContentFoundProps {
  title: ReactNode
  description: ReactNode
}

export default function NoContentFound({
  title,
  description,
}: NoContentFoundProps) {
  return (
    <S.Container data-testid="no-content-found">
      <NotFoundIllustration />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  )
}
