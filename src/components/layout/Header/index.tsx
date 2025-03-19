import SearchInput from '../../common/SearchInput'
import * as S from './styles'
import Logo from '@/assets/icons/icarros-logo.svg?react'

interface HeaderProps {
  search?: string 
  onSearchChange?: (searchText: string) => void
  searchIsHidden?: boolean
}

export default function Header({
  search,
  onSearchChange,
  searchIsHidden,
}: HeaderProps) {
  return (
    <S.Container>
      <S.Content>
        <Logo />
        {!searchIsHidden && <SearchInput value={search} onChange={onSearchChange} />}
      </S.Content>
    </S.Container>
  )
}
