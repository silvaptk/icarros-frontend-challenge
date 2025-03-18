import SearchInput from '../../common/SearchInput'
import * as S from './styles'
import Logo from '@/assets/icons/icarros-logo.svg?react'

interface HeaderProps {
  onSearchChange?: (searchText: string) => void
  searchIsHidden?: boolean
}

export default function Header({
  onSearchChange,
  searchIsHidden,
}: HeaderProps) {
  return (
    <S.Container>
      <S.Content>
        <Logo />
        {!searchIsHidden && <SearchInput onChange={onSearchChange} />}
      </S.Content>
    </S.Container>
  )
}
