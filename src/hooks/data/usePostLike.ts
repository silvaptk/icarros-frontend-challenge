import getApiClient from '@/services/api'
import { handleException } from '@/services/log'
import { showErrorToast } from '@/services/toast'
import { useMutation, useQueryClient } from 'react-query'

export default function usePostLike() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: 'like-post',
    async mutationFn(data: { id: number; isLiked: boolean }) {
      try {
        await getApiClient().patch(`/posts/${data.id}`, {
          isLiked: data.isLiked,
        })

        queryClient.invalidateQueries('posts')
      } catch (error) {
        if (error instanceof Error) {
          handleException(error)
        } else {
          handleException(new Error(String(error)))
        }

        showErrorToast(
          'Erro ao interagir com postagem',
          `Não foi possível ${
            data.isLiked ? 'desfavoritar' : 'favoritar'
          } o anúncio agora. Tente novamente depois!`,
        )
      }
    },
  })

  return {
    execute: mutation.mutate,
    isLoading: mutation.isLoading,
  }
}
