import { create } from 'zustand'

import IPost from '@/domain/Post'

export interface IContactModalStore {
  isVisible: boolean
  data: IPost | null
  show(data: IPost): void
  hide(): void
}

const useContactModalStore = create<IContactModalStore>((set) => ({
  isVisible: false,
  data: null,
  show(data: IPost) {
    set(() => ({ data, isVisible: true }))
  },
  hide() {
    set(() => ({ data: null, isVisible: false }))
  },
}))

export default useContactModalStore
