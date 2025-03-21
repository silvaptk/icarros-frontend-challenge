import { ChangeEvent } from 'react'
import * as S from './styles'
import SearchIcon from '@/assets/icons/search.svg?react'
import { preventSubmission } from '@/utils/events'

interface SearchInputProps {
  onChange?: (searchText: string) => void
}

export default function SearchInput({ onChange }: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value)
  }

  return (
    <S.Container onSubmit={preventSubmission} data-testid="search-input-form">
      <SearchIcon />
      <S.Input
        placeholder="busque por marca"
        onChange={handleChange}
        data-testid="search-input"
      />
    </S.Container>
  )
}
