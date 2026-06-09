import { useState } from 'react'
import './FilteredScreen.css'
import { figmaAsset } from '../figmaAssets'

const img0 = figmaAsset('b356560f-03f4-4137-b7e5-2df191ebc8b7')
const img1 = figmaAsset('df81eda3-82d9-4051-9deb-1bb90d7e07e4')
const img2 = figmaAsset('167141e6-89e3-4078-92b9-cde0c3f8c0d7')
const img3 = figmaAsset('3a5970cd-7e7b-4c3d-934f-a1f8c6eccd5f')
const img4 = figmaAsset('18ef88af-4ba1-49fc-ae6c-3665ee70f9d4')
const img5 = figmaAsset('fe4a7646-de1e-467b-a04b-66594d6ffb90')
const img6 = figmaAsset('ff694385-acef-47be-ae61-a040b61936a1')

export const photos = [img0, img1, img2, img3, img4, img5, img6]

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
  </svg>
)

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
  </svg>
)

export default function FilteredScreen({ onBack, excluded, onToggle, onPreview }) {
  const [chips, setChips] = useState(['Screenshot', 'QR-Code', 'Document', 'Map', 'Menu'])
  const [showSheet, setShowSheet] = useState(false)
  const [filterInput, setFilterInput] = useState('')

  const removeChip = (label) => setChips(prev => prev.filter(c => c !== label))

  const addFilter = () => {
    const val = filterInput.trim()
    if (val && !chips.includes(val)) {
      setChips(prev => [...prev, val])
    }
    setFilterInput('')
  }

  return (
    <div className="fi-screen">
      <div className="fi-navbar">
        <button className="fi-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="fi-title">Gefilterte Bilder</span>
        <div className="fi-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="fi-scroll">
        <div className="fi-header">
          <h1 className="fi-heading">Gefilterte Bilder</h1>
          <p className="fi-desc">
            Hier werden Fotos rausgefiltert, wie Dokumente, Screenshots, QR-Codes etc. Suche nach Begriffen, um weitere Fotos zu finden, die nicht ins Fotobuch sollen.
          </p>
        </div>

        <div className="fi-chips">
          {chips.map((label) => (
            <div key={label} className="fi-chip">
              <span>{label}</span>
              <button className="fi-chip-close" onClick={() => removeChip(label)} aria-label={`Remove ${label}`}>
                <CloseIcon />
              </button>
            </div>
          ))}
          <button className="fi-add-filter" onClick={() => setShowSheet(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
            </svg>
            Add filter
          </button>
        </div>

        <div className="fi-grid">
          {photos.map((src, i) => {
            const isExcluded = excluded.has(i)
            return (
              <button key={i} className={`fi-photo${isExcluded ? ' fi-photo--excluded' : ''}`} onClick={() => onToggle(i)}>
                <img src={src} alt="" className="fi-photo-img" />
                {isExcluded && <div className="fi-overlay" />}
                {isExcluded && (
                  <div className="fi-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#E53935"/>
                      <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                    </svg>
                    <span>is exluded</span>
                  </div>
                )}
                <div className="fi-loupe" onClick={(e) => { e.stopPropagation(); onPreview(i, photos) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {showSheet && (
        <div className="fi-sheet-overlay" onClick={() => setShowSheet(false)}>
          <div className="fi-sheet" onClick={e => e.stopPropagation()}>
            <div className="fi-sheet-handle" />
            <div className="fi-sheet-content">
              <p className="fi-sheet-title">Add filter</p>
              <div className="fi-sheet-field">
                <input
                  className="fi-sheet-input"
                  type="text"
                  inputMode="text"
                  placeholder="Create filter"
                  value={filterInput}
                  onChange={e => setFilterInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addFilter() }}
                  autoFocus
                />
                <button className="fi-sheet-add-btn" onClick={addFilter} aria-label="Add filter">
                  <PlusIcon />
                </button>
              </div>
              <div className="fi-chips">
                {chips.map((label) => (
                  <div key={label} className="fi-chip">
                    <span>{label}</span>
                    <button className="fi-chip-close" onClick={() => removeChip(label)} aria-label={`Remove ${label}`}>
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
