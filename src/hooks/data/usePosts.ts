import IPost from '@/domain/Post'
import getApiClient from '@/services/api'
import { handleException } from '@/services/log'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

interface UsePostsProps {
  brandSearchText?: string
}

export default function usePosts({ brandSearchText }: UsePostsProps) {
  const navigate = useNavigate()

  const { data: posts, isLoading: postsAreLoading } = useQuery({
    queryKey: ['posts', brandSearchText],
    async queryFn() {
      try {
        let requestPath = '/posts'

        if (brandSearchText) {
          requestPath += `?car.brand_like=${brandSearchText}`
        }

        const postsResponse = await getApiClient().get<IPost[]>(requestPath)

        return postsResponse.data
      } catch (error) {
        if (error instanceof Error) {
          handleException(error)
        } else {
          handleException(new Error(String(error)))
        }

        navigate('/500')

        return []
      }
    },
  })

  return { posts, postsAreLoading }
}
