import { useRef, useState } from 'react'

import usePosts from '@/hooks/data/usePosts'
import Header from '@/components/layout/Header'
import PostsList from '@/components/pages/index/PostsList'
import ContactModal from '@/components/pages/index/ContactModal'

export default function HomePage() {
  const [brandSearchText, setBrandSearchText] = useState('')
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)

  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const { posts, postsAreLoading } = usePosts({ brandSearchText })

  function handleSearchChange(searchText: string) {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    setShowLoadingIndicator(true)

    debounceTimeoutRef.current = setTimeout(() => {
      setBrandSearchText(searchText)
      setShowLoadingIndicator(false)
    }, 500)
  }

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <PostsList
        data={posts || []}
        isLoading={postsAreLoading || showLoadingIndicator}
      />
      <ContactModal />
    </>
  )
}
