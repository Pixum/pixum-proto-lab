import { useState, useCallback } from 'react'
import './AlbumScreen.css'

export default function AlbumScreen({ album, onBack, onPreview, onNext }) {
  const [selected, setSelected] = useState(new Set())

  const toggle = useCallback((idx) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }, [])

  const toggleAll = () => {
    if (selected.size === album.images.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(album.images.map((_, i) => i)))
    }
  }

  const allSelected = selected.size === album.images.length
  const selectedList = [...selected].sort((a, b) => a - b)

  return (
    <div className="al-screen">
      <div className="al-navbar">
        <button className="al-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="al-title">{album.name}</span>
        <div className="al-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="al-section-header">
        <span className="al-count">{album.images.length} Fotos</span>
        <button className="al-select-all" onClick={toggleAll}>
          {allSelected ? 'Auswahl aufheben' : 'Alle auswählen'}
        </button>
      </div>

      <div className="al-grid-wrap">
        <div className="al-grid">
          {album.images.map((src, i) => {
            const isSelected = selected.has(i)
            return (
              <div key={i} className="al-cell">
                <button className="al-photo" onClick={() => onPreview(i, album.images)}>
                  <img src={src} alt="" loading="lazy" />
                  {isSelected && <div className="al-selected-overlay" />}
                </button>
                <button
                  className={`al-check${isSelected ? ' al-check--on' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggle(i) }}
                  aria-label={isSelected ? 'Abwählen' : 'Auswählen'}
                >
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {selected.size > 0 && (
        <div className="al-bottombar">
          <div className="al-bottombar-inner">
            <div className="al-selection-info">
              <div className="al-thumbs">
                {selectedList.slice(0, 3).map(idx => (
                  <img key={idx} src={album.images[idx]} alt="" className="al-thumb" />
                ))}
              </div>
              <span className="al-sel-count">{selected.size} {selected.size === 1 ? 'Foto' : 'Fotos'} ausgewählt</span>
            </div>
            <button className="al-next-btn" onClick={onNext}>
              Nächster Schritt
            </button>
          </div>
          <div className="al-home-indicator" />
        </div>
      )}
    </div>
  )
}
