import { useNavigate } from 'react-router'

import Button from '@/components/common/Button'
import NoContentFound from '@/components/common/NoContentFound'
import Header from '@/components/layout/Header'
import * as S from './styles'

export default function ErrorPage() {
  const navigate = useNavigate()

  function handleReload() {
    navigate('/')
  }

  return (
    <>
      <Header searchIsHidden />
      <S.Container>
        <NoContentFound
          title="Algo de errado aconteceu"
          description="Recarregue a página para tentar novamente"
        />

        <Button onClick={handleReload}>recarregar página</Button>
      </S.Container>
    </>
  )
}
