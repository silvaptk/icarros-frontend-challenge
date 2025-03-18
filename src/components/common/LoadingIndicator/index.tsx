import * as S from './styles'

export default function LoadingIndicator() {
  return (
    <S.Container data-testid="loading-indicator">
      <S.Bar />
    </S.Container>
  )
}
