import './PageBuilderScreen.css'
import { figmaAsset } from '../figmaAssets'

const SURROUND_COVER  = figmaAsset('2f6d38b6-0b50-474f-ae29-2050bd31b182')
const SURROUND_DOUBLE = figmaAsset('9a42fab5-1c5e-42bc-918f-5c1fd00b51d5')

function Spread({ surround, children, cornerTR, cornerBR, cornerTL, cornerBL, centerBtn }) {
  return (
    <div className="pb-spread">
      <img className="pb-surround" src={surround} alt="" draggable={false} />
      {children}
      {cornerTL && <div className="pb-corner pb-corner--tl pb-corner--del"><XIcon /></div>}
      {cornerTR && <div className="pb-corner pb-corner--tr pb-corner--del"><XIcon /></div>}
      {cornerBL && <div className="pb-corner pb-corner--bl pb-corner--add"><PlusSmIcon /></div>}
      {cornerBR && <div className="pb-corner pb-corner--br pb-corner--add"><PlusSmIcon /></div>}
      {centerBtn && <div className="pb-corner pb-corner--center pb-corner--add"><SwapIcon /></div>}
    </div>
  )
}

function SpreadLabels({ left, right }) {
  return (
    <div className="pb-labels">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  )
}

function AddBetween() {
  return (
    <div className="pb-add-between">
      <div className="pb-add-between-circle"><PlusSmIcon /></div>
    </div>
  )
}

export default function PageBuilderScreen({ onBack, onHome, photos }) {
  const p = (i) => photos[i % photos.length]
  let idx = 0
  const next = () => p(idx++)

  return (
    <div className="pb-screen">

      {/* ── Top bar ── */}
      <div className="pb-topbar">
        <div className="pb-navbar">
          <button className="pb-icon-btn" onClick={onBack} aria-label="Zurück">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
          </button>
          <div className="pb-navbar-right">
            <button className="pb-icon-btn" aria-label="Wiederholen">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" fill="currentColor"/>
              </svg>
            </button>
            <button className="pb-icon-btn" aria-label="Rückgängig">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" fill="currentColor"/>
              </svg>
            </button>
            <button className="pb-icon-btn" aria-label="Einstellungen">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.15 7.15 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.477.477 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="pb-toolbar">
          <div className="pb-tool">
            <div className="pb-tool-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" fill="currentColor"/>
              </svg>
            </div>
            <span className="pb-tool-label">Add photos</span>
          </div>
          <div className="pb-tool">
            <div className="pb-tool-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" fill="currentColor"/>
              </svg>
            </div>
            <span className="pb-tool-label">Templates</span>
          </div>
          <div className="pb-tool">
            <div className="pb-tool-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
              </svg>
            </div>
            <span className="pb-tool-label">Preview</span>
          </div>
          <div className="pb-tool">
            <div className="pb-tool-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{transform:'rotate(-90deg)'}}>
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
              </svg>
            </div>
            <span className="pb-tool-label">More</span>
          </div>
        </div>
      </div>

      {/* ── Scrollable book pages ── */}
      <div className="pb-scroll">

        {/* Cover page */}
        <div className="pb-section">
          <Spread surround={SURROUND_COVER} cornerTR cornerBR>
            <div className="pb-area pb-area--cover-right">
              <img src={next()} className="pb-photo" alt="" />
            </div>
          </Spread>
          <SpreadLabels left="" right="Cover page" />
        </div>

        <AddBetween />

        {/* Spread 1 – Empty page / Page 1 */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTR cornerBR>
            <div className="pb-area pb-area--right-full">
              <img src={next()} className="pb-photo" alt="" />
            </div>
          </Spread>
          <SpreadLabels left="Empty page" right="Page 1" />
        </div>

        <AddBetween />

        {/* Spread 2 – Pages 2–3 (1 large + 2 small per page) */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTL cornerTR cornerBL cornerBR centerBtn>
            {/* Left page */}
            <div className="pb-area pb-area--left-page">
              <div className="pb-split">
                <div className="pb-split-main"><img src={next()} className="pb-photo" alt="" /></div>
                <div className="pb-split-stack">
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                </div>
              </div>
            </div>
            {/* Right page */}
            <div className="pb-area pb-area--right-page">
              <div className="pb-split">
                <div className="pb-split-main"><img src={next()} className="pb-photo" alt="" /></div>
                <div className="pb-split-stack">
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                </div>
              </div>
            </div>
          </Spread>
          <SpreadLabels left="Page 2" right="Page 3" />
        </div>

        <AddBetween />

        {/* Spread 3 – Pages 4–5 (full-bleed single photo) */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTR cornerBR>
            <div className="pb-area pb-area--full-spread">
              <img src={next()} className="pb-photo" alt="" />
            </div>
          </Spread>
          <SpreadLabels left="Page 4" right="Page 5" />
        </div>

        <AddBetween />

        {/* Spread 4 – Pages 6–7 (1 large + 2 small per page) */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTL cornerTR cornerBL cornerBR centerBtn>
            <div className="pb-area pb-area--left-page">
              <div className="pb-split">
                <div className="pb-split-main"><img src={next()} className="pb-photo" alt="" /></div>
                <div className="pb-split-stack">
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="pb-area pb-area--right-page">
              <div className="pb-split">
                <div className="pb-split-main"><img src={next()} className="pb-photo" alt="" /></div>
                <div className="pb-split-stack">
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                  <div className="pb-split-item"><img src={next()} className="pb-photo" alt="" /></div>
                </div>
              </div>
            </div>
          </Spread>
          <SpreadLabels left="Page 6" right="Page 7" />
        </div>

        <AddBetween />

        {/* Spread 5 – Pages 8–9 (one photo per page) */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTL cornerTR cornerBL cornerBR>
            <div className="pb-area pb-area--left-page">
              <img src={next()} className="pb-photo" alt="" />
            </div>
            <div className="pb-area pb-area--right-page">
              <img src={next()} className="pb-photo" alt="" />
            </div>
          </Spread>
          <SpreadLabels left="Page 8" right="Page 9" />
        </div>

        <AddBetween />

        {/* Final spread – Page 20 / Empty page */}
        <div className="pb-section">
          <Spread surround={SURROUND_DOUBLE} cornerTL cornerBL>
            <div className="pb-area pb-area--left-full">
              <img src={next()} className="pb-photo" alt="" />
            </div>
          </Spread>
          <SpreadLabels left="Page 20" right="Empty page" />
        </div>

        {/* Add 4 pages button */}
        <button className="pb-add-pages-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
          Add 4 pages
        </button>

      </div>

      {/* ── Bottom bar ── */}
      <div className="pb-bottombar">
        <div className="pb-bottombar-inner">
          <div className="pb-product-info">
            <span className="pb-product-title">Photobook</span>
            <span className="pb-product-size">ca. 21x27cm</span>
          </div>
          <button className="pb-cart-btn" onClick={onHome}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.47 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
            </svg>
            Add to cart
          </button>
        </div>
        <div className="pb-home-indicator" />
      </div>

    </div>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
    </svg>
  )
}

function PlusSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" fill="currentColor"/>
    </svg>
  )
}
