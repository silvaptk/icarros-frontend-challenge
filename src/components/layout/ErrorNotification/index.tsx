import { ToastContentProps } from 'react-toastify'
import * as S from './styles'

export type IErrorNotificationProps = ToastContentProps<{
  title: string
  content: string
}>

export default function ErrorNotification({ data }: IErrorNotificationProps) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <p>{data.content}</p>
    </S.Container>
  )
}
