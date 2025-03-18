import ErrorNotification from '@/components/layout/ErrorNotification'
import { toast } from 'react-toastify'

export function showErrorToast(title: string, content: string) {
  toast.error(ErrorNotification, {
    data: { title, content },
    icon: false,
    theme: 'colored',
  })
}
