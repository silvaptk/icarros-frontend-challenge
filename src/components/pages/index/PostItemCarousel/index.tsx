import * as S from './styles'
import LeftIcon from '@/assets/icons/left.svg?react'
import RightIcon from '@/assets/icons/right.svg?react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface PostItemCarouselProps {
  images: string[]
}

export default function PostItemCarousel({ images }: PostItemCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [imageWidth, setImageWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    function handleResize() {
      if (!containerRef.current) {
        return
      }
      setImageWidth(containerRef.current.clientWidth)
    }

    const observer = new ResizeObserver(handleResize)

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!listRef.current) {
      return
    }

    listRef.current.scrollTo({
      left: activeImageIndex * imageWidth,
      behavior: 'smooth',
    })
  }, [activeImageIndex, listRef, imageWidth])

  return (
    <S.Container ref={containerRef}>
      <S.List ref={listRef} data-testid="post-item-carousel-images-list">
        {images.map((image) => (
          <S.Item
            key={image}
            style={{ width: imageWidth }}
            data-testid="post-item-carousel-image-container"
          >
            <img src={image} data-testid="post-item-carousel-image" />
          </S.Item>
        ))}
      </S.List>

      <S.Footer>
        <S.ProgressBarContainer>
          <span data-testid="post-item-carousel-active-image">
            {activeImageIndex + 1}
          </span>
          <div>
            <motion.div
              animate={{
                width: `${((activeImageIndex + 1) / images.length) * 100}%`,
              }}
            />
          </div>
          <span data-testid="post-item-carousel-images-length">
            {images.length}
          </span>
        </S.ProgressBarContainer>

        <S.ControlsContainer>
          <button
            disabled={activeImageIndex === 0}
            onClick={setActiveImageIndex.bind(null, (state) => state - 1)}
            data-testid="post-item-carousel-scroll-left-button"
          >
            <LeftIcon />
          </button>
          <button
            onClick={setActiveImageIndex.bind(null, (state) => state + 1)}
            disabled={activeImageIndex === images.length - 1}
            data-testid="post-item-carousel-scroll-right-button"
          >
            <RightIcon />
          </button>
        </S.ControlsContainer>
      </S.Footer>
    </S.Container>
  )
}
