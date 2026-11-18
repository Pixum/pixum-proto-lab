import './LayoutPresetScreen.css'

export default function LayoutPresetScreen2({ onBack, onNext }) {
  return (
    <div className="lp-screen">
      <div className="lp-navbar">
        <button className="lp-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="lp-navbar-label">Layout</span>
      </div>

      <div className="lp-scroll">
        <div className="lp-content" style={{ paddingTop: 40 }}>
          <p className="lp-heading">Layout-Voreinstellung – Platzhalter</p>
          <p style={{ color: '#888', fontSize: 15, textAlign: 'center', marginTop: 16 }}>
            Prototype 2 – dieser Schritt wird individuell gestaltet.
          </p>
        </div>
      </div>

      <div className="lp-bottombar">
        <div className="lp-bottombar-inner">
          <button className="lp-cta" onClick={onNext}>Fotobuch erstellen</button>
        </div>
        <div className="lp-home-indicator" />
      </div>
    </div>
  )
}
