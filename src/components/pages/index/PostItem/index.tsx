import IPost from '@/domain/Post'
import * as S from './styles'
import FavoriteIcon from '@/assets/icons/favorite.svg?react'
import FavoriteFilledIcon from '@/assets/icons/favorite-filled.svg?react'
import { formatKilometers, formatPrice, limitLength } from '@/services/format'
import PostItemCarousel from '../PostItemCarousel'
import Button from '@/components/common/Button'
import useContactModalStore from '@/stores/contact-modal'
import usePostLike from '@/hooks/data/usePostLike'

interface PostItemProps {
  data: IPost
}

export default function PostItem({ data }: PostItemProps) {
  const { show: showContactModal } = useContactModalStore()

  const postLike = usePostLike()

  function handlePostLike() {
    postLike.execute({ id: data.id, isLiked: !data.isLiked })
  }

  return (
    <S.Container data-testid="post-item">
      <PostItemCarousel images={data.images} />

      <S.FirstSection>
        <div>
          <h3>{data.title}</h3>
          <small>{data.car.model}</small>
        </div>

        <button
          onClick={handlePostLike}
          disabled={postLike.isLoading}
          className={data.isLiked ? 'active' : ''}
          data-testid="like-button"
        >
          {data.isLiked ? <FavoriteFilledIcon /> : <FavoriteIcon />}
        </button>
      </S.FirstSection>

      <S.Price>{formatPrice(data.car.price)}</S.Price>

      <S.SecondSection>
        <div>
          <p title={data.author.name}>{limitLength(data.author.name)}</p>
          <small title={`${data.author.city}, ${data.author.state}`}>
            {limitLength(data.author.city, 15)}, {data.author.state}
          </small>
        </div>

        <div>
          <small>
            {data.car.modelYear}/{data.car.productionYear}
          </small>
          <small>{formatKilometers(data.car.kilometers)}</small>
        </div>
      </S.SecondSection>

      <Button onClick={showContactModal.bind(null, data)}>contato</Button>
    </S.Container>
  )
}
