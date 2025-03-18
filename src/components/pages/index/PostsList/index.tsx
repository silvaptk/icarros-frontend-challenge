import IPost from '@/domain/Post'
import PostItem from '../PostItem'
import * as S from './styles'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import NoContentFound from '@/components/common/NoContentFound'

interface PostsListProps {
  data: IPost[]
  isLoading: boolean
}

export default function PostsList({ data, isLoading }: PostsListProps) {
  return (
    <S.Container data-testid="posts-list">
      {isLoading ? (
        <LoadingIndicator />
      ) : data.length ? (
        <S.List>
          {data.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </S.List>
      ) : (
        <NoContentFound
          title="Nenhum anúncio encontrado"
          description="Atualize a sua busca"
        />
      )}
    </S.Container>
  )
}
