import { useState } from 'react'
import './FilteredScreen3.css'
import { figmaAsset, figmaThumb } from '../figmaAssets'

const img0 = figmaAsset('e0eb548a-aae9-42af-896b-90be075b4118')
const img1 = figmaAsset('97048698-c762-4fd6-b86c-ec28b1d8b507')
const img2 = figmaAsset('05fe6c44-fe75-4bb0-bf0b-9ef93f740c0e')
const img3 = figmaAsset('272152f0-df11-4a9a-aa4c-c4bd74d8bae7')
const img4 = figmaAsset('8b1290db-4627-42bd-8d6c-5292e8eb26ac')
const img5 = figmaAsset('2c2649a2-0d67-4e8e-8fbc-6a4285e39448')
const img6 = figmaAsset('ff2f31bd-33c5-44a0-afb8-8c6ddc020990')
const img7 = figmaAsset('865d7f7f-bc11-409a-8fdc-121f9394dab0')
const img8 = figmaAsset('8d553ae3-fb9a-477a-bf9e-7a84176db51c')
const img9 = figmaAsset('65908f8c-1bac-4dc3-b82b-3f1a1329037b')
const img10 = figmaAsset('298751a5-769a-4c55-ad86-9f8651ea32ae')
const img11 = figmaAsset('19d45a82-b017-41ec-8ccf-b07676517b92')
const img12 = figmaAsset('f09d1057-a1f7-42da-b0a2-cd996b98fd73')
const img13 = figmaAsset('54987433-f975-4a57-8b1f-b1463666ccb0')
const img14 = figmaAsset('8dbe9c6f-13e2-485d-8d22-e61e78d2fe63')
const img15 = figmaAsset('699f5bf7-f99c-4baf-810d-6ad4eee4f3d2')
const img16 = figmaAsset('eefea27d-ef57-43fd-816f-7e996b99352d')
const img17 = figmaAsset('a7b9027f-346c-43e8-aeb7-e32351eff741')
const img18 = figmaAsset('caf644f5-c461-4eda-8e17-cd7a3eac6068')
const img19 = figmaAsset('03932e43-121a-43a9-aa59-e5d3a5e0a7d0')
const img20 = figmaAsset('4bc0ce7f-6b2b-4ed0-b628-5a1ac614624a')
const img21 = figmaAsset('e7fc8c90-338c-4f8b-9f4e-a8589a487797')
const img22 = figmaAsset('03cbc325-cd61-4d09-92bb-65e9b85d60e9')
const img23 = figmaAsset('b254f294-4a68-4bc2-ac72-59cb42c93644')
const img24 = figmaAsset('52baf4e7-3cba-4301-9688-03e4eeee88a2')

export const photos = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24]

const thumbs = [
  figmaThumb('e0eb548a-aae9-42af-896b-90be075b4118'),
  figmaThumb('97048698-c762-4fd6-b86c-ec28b1d8b507'),
  figmaThumb('05fe6c44-fe75-4bb0-bf0b-9ef93f740c0e'),
  figmaThumb('272152f0-df11-4a9a-aa4c-c4bd74d8bae7'),
  figmaThumb('8b1290db-4627-42bd-8d6c-5292e8eb26ac'),
  figmaThumb('2c2649a2-0d67-4e8e-8fbc-6a4285e39448'),
  figmaThumb('ff2f31bd-33c5-44a0-afb8-8c6ddc020990'),
  figmaThumb('865d7f7f-bc11-409a-8fdc-121f9394dab0'),
  figmaThumb('8d553ae3-fb9a-477a-bf9e-7a84176db51c'),
  figmaThumb('65908f8c-1bac-4dc3-b82b-3f1a1329037b'),
  figmaThumb('298751a5-769a-4c55-ad86-9f8651ea32ae'),
  figmaThumb('19d45a82-b017-41ec-8ccf-b07676517b92'),
  figmaThumb('f09d1057-a1f7-42da-b0a2-cd996b98fd73'),
  figmaThumb('54987433-f975-4a57-8b1f-b1463666ccb0'),
  figmaThumb('8dbe9c6f-13e2-485d-8d22-e61e78d2fe63'),
  figmaThumb('699f5bf7-f99c-4baf-810d-6ad4eee4f3d2'),
  figmaThumb('eefea27d-ef57-43fd-816f-7e996b99352d'),
  figmaThumb('a7b9027f-346c-43e8-aeb7-e32351eff741'),
  figmaThumb('caf644f5-c461-4eda-8e17-cd7a3eac6068'),
  figmaThumb('03932e43-121a-43a9-aa59-e5d3a5e0a7d0'),
  figmaThumb('4bc0ce7f-6b2b-4ed0-b628-5a1ac614624a'),
  figmaThumb('e7fc8c90-338c-4f8b-9f4e-a8589a487797'),
  figmaThumb('03cbc325-cd61-4d09-92bb-65e9b85d60e9'),
  figmaThumb('b254f294-4a68-4bc2-ac72-59cb42c93644'),
  figmaThumb('52baf4e7-3cba-4301-9688-03e4eeee88a2'),
]

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

export default function FilteredScreen3({ onBack, onNext, excluded, onToggle, onPreview }) {
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
    <div className="fi3-screen">
      <div className="fi3-navbar">
        <button className="fi3-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="fi3-title">Unwanted images</span>
        <div className="fi3-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="fi3-scroll">
        <div className="fi3-header">
          <div className="fi3-step-badge">Schritt 3 von 3</div>
          <h1 className="fi3-heading">Auszusortierende Bilder </h1>
          <p className="fi3-desc">
            Filtere nach bestimmten Objekten oder Orten. Dokumente, Screenshots, QR-Codes usw. haben wir bereits herausgefiltert.
          </p>
        </div>

        <div className="fi3-chips">
          {chips.map((label) => (
            <div key={label} className="fi3-chip">
              <span>{label}</span>
              <button className="fi3-chip-close" onClick={() => removeChip(label)} aria-label={`Remove ${label}`}>
                <CloseIcon />
              </button>
            </div>
          ))}
          <button className="fi3-add-filter" onClick={() => setShowSheet(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
            </svg>
            Add filter
          </button>
        </div>

        <div className="fi3-grid">
          {photos.map((src, i) => {
            const isExcluded = excluded.has(i)
            return (
              <button key={i} className={`fi3-photo${isExcluded ? ' fi3-photo--excluded' : ''}`} onClick={() => onToggle(i)}>
                <img src={thumbs[i]} alt="" className="fi3-photo-img" />
                {isExcluded && <div className="fi3-overlay" />}
                {isExcluded && (
                  <div className="fi3-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#E53935"/>
                      <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                    </svg>
                    <span>ausgeschlossen</span>
                  </div>
                )}
                <div className="fi3-loupe" onClick={(e) => { e.stopPropagation(); onPreview(i, photos) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="fi3-bottombar">
        <div className="fi3-bottombar-inner">
          <button className="fi3-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="fi3-home-indicator" />
      </div>

      {showSheet && (
        <div className="fi3-sheet-overlay" onClick={() => setShowSheet(false)}>
          <div className="fi3-sheet" onClick={e => e.stopPropagation()}>
            <div className="fi3-sheet-handle" />
            <div className="fi3-sheet-content">
              <p className="fi3-sheet-title">Add filter</p>
              <div className="fi3-sheet-field">
                <input
                  className="fi3-sheet-input"
                  type="text"
                  inputMode="text"
                  placeholder="Create filter"
                  value={filterInput}
                  onChange={e => setFilterInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addFilter() }}
                  autoFocus
                />
                <button className="fi3-sheet-add-btn" onClick={addFilter} aria-label="Add filter">
                  <PlusIcon />
                </button>
              </div>
              <div className="fi3-chips">
                {chips.map((label) => (
                  <div key={label} className="fi3-chip">
                    <span>{label}</span>
                    <button className="fi3-chip-close" onClick={() => removeChip(label)} aria-label={`Remove ${label}`}>
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
