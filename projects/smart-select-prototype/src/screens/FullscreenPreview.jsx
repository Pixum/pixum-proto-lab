import { useState, useRef } from 'react'
import './FullscreenPreview.css'

export default function FullscreenPreview({ images, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const touchStartX = useRef(null)

  const goTo = (i) => {
    if (i >= 0 && i < images.length) setIndex(i)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) goTo(index + 1)
    else if (delta < -50) goTo(index - 1)
    touchStartX.current = null
  }

  return (
    <div
      className="fsp-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        key={index}
        src={images[index]}
        alt=""
        className="fsp-image"
        draggable={false}
      />

      <button className="fsp-close" onClick={onClose} aria-label="Schließen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
        </svg>
      </button>

      <div className="fsp-counter">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}
