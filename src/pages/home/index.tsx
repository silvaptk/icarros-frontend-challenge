import { useEffect, useState } from 'react'

import usePosts from '@/hooks/data/usePosts'
import Header from '@/components/layout/Header'
import PostsList from '@/components/pages/index/PostsList'
import ContactModal from '@/components/pages/index/ContactModal'
import { useSearchParams } from 'react-router'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [brandSearchText, setBrandSearchText] = useState(
    searchParams.get('brand') || '',
  )
  const [submittedSearch, setSubmittedSearch] = useState(brandSearchText)
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)

  const { posts, postsAreLoading } = usePosts({
    brandSearchText: submittedSearch,
  })

  useEffect(() => {
    setBrandSearchText(searchParams.get('brand') || '')
  }, [searchParams])

  useEffect(() => {
    setShowLoadingIndicator(true)

    const debounceTimeout = setTimeout(() => {
      setSubmittedSearch(brandSearchText)
      setShowLoadingIndicator(false)
      if ((searchParams.get('brand') || "") !== brandSearchText) {
        setSearchParams({ brand: brandSearchText })
      }
    }, 500)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [brandSearchText, setSearchParams, searchParams])

  return (
    <>
      <Header search={brandSearchText} onSearchChange={setBrandSearchText} />
      <PostsList
        data={posts || []}
        isLoading={postsAreLoading || showLoadingIndicator}
      />
      <ContactModal />
    </>
  )
}
