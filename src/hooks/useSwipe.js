import { useRef } from 'react'

export function useSwipe(onSwipeLeft, onSwipeRight, options = {}) {
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const touchEndX = useRef(null)
  const touchEndY = useRef(null)
  const minSwipeDistance = options.minSwipeDistance || 50
  const maxVerticalDistance = options.maxVerticalDistance || 100

  const onTouchStart = (e) => {
    touchEndX.current = null
    touchEndY.current = null
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
  }

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distanceX = touchStartX.current - touchEndX.current
    const distanceY = Math.abs(touchStartY.current - (touchEndY.current || touchStartY.current))
    
    // Only trigger swipe if horizontal movement is greater than vertical (horizontal swipe)
    if (distanceY > maxVerticalDistance) return
    
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

