import { useState, useCallback } from 'react'
import { fotosetImages } from '../images'
import heroImageSrc from '../../rsc/preview.png'
import './OverviewScreen2.css'

export default function OverviewScreen2({ onBack, onNext, onPreview }) {
  const [selected, setSelected] = useState(() => {
    const defaultExcluded = new Set([1, 2, 6, 11, 12, 16, 23, 26, 28, 32, 34, 36, 38, 46, 47, 48, 50, 55, 57, 63, 65, 67, 70, 73, 74, 75, 79, 80, 81, 83, 86, 88, 89])
    return new Set(fotosetImages.map((_, i) => i).filter(i => !defaultExcluded.has(i)))
  })

  const toggle = useCallback((idx) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }, [])

  const heroImg = heroImageSrc

  return (
    <div className="ov2-screen">
      <div className="ov2-navbar">
        <button className="ov2-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="ov2-title">Übersicht</span>
        <div className="ov2-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="ov2-scroll">
        <div className="ov2-hero-wrap">
          <img src={heroImg} alt="" className="ov2-hero-img" />
        </div>

        <div className="ov2-header">
          <div className="ov2-badge">Von 1.032 Bildern</div>
          <h1 className="ov2-heading">Wir haben Ihre 302 besten Fotos ausgewählt</h1>
        </div>

        <div className="ov2-tip">
          <svg className="ov2-tip-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
          </svg>
          <p className="ov2-tip-text">Tippe auf ein Foto, um es aus deiner Auswahl zu entfernen. Du kannst es jederzeit wieder einschließen.</p>
        </div>

        <div className="ov2-searchbar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
          </svg>
          <span className="ov2-searchbar-placeholder">Suchen...</span>
        </div>

        <div className="ov2-grid">
          {fotosetImages.map((src, i) => {
            const isIncluded = selected.has(i)
            return (
              <div key={i} className={`ov2-cell${isIncluded ? '' : ' ov2-cell--excluded'}`}>
                <button
                  className="ov2-cell-btn"
                  onClick={() => toggle(i)}
                  aria-label={isIncluded ? 'Foto ausschließen' : 'Foto einschließen'}
                >
                  <img src={src} alt="" loading="lazy" className="ov2-cell-img" />
                  {!isIncluded && <div className="ov2-excluded-overlay" />}
                  {!isIncluded && (
                    <div className="ov2-excluded-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
                      </svg>
                      <span>ausgeschlossen</span>
                    </div>
                  )}
                </button>
                <button
                  className="ov2-preview-btn"
                  onClick={(e) => { e.stopPropagation(); onPreview(i, fotosetImages) }}
                  aria-label="Vollbildvorschau"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="ov2-bottombar">
        <div className="ov2-bottombar-inner">
          <button className="ov2-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="ov2-home-indicator" />
      </div>
    </div>
  )
}
