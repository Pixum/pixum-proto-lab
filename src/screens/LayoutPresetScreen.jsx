import { useState } from 'react'
import './LayoutPresetScreen.css'
import { figmaAsset } from '../figmaAssets'

const options = [
  {
    title: 'Weniger Bilder',
    desc: 'Fotos werden größer Dargestellt, in der Regel 1-4 Bilder pro Seite.',
    preview: figmaAsset('c6e3d01a-6ffc-45b2-8df4-b077f095177d'),
  },
  {
    title: 'Mehr Bilder',
    desc: 'Wenn du viele Fotos hast, macht es Sinn 4-9 Bilder pro Seite zu platzieren.',
    preview: figmaAsset('82302c13-e928-404d-ab65-0cef4009f45d'),
  },
  {
    title: 'Ein Foto pro Seite',
    desc: 'Wenn die Fotos scheinen sollen und jeder Moment eine Bühne bekommen soll.',
    preview: figmaAsset('047bf385-2224-4c38-a545-58a4d1a92833'),
  },
]

export default function LayoutPresetScreen({ onBack, onNext }) {
  const [selected, setSelected] = useState(0)

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
        <div className="lp-placeholder">
          <img
            className="lp-placeholder-img"
            src={options[selected].preview}
            alt=""
            draggable={false}
          />
        </div>

        <div className="lp-content">
          <p className="lp-heading">Wähle eine Layout-Voreinstellung</p>
          <div className="lp-items">
            {options.map((option, i) => (
              <button
                key={i}
                className={`lp-item${selected === i ? ' lp-item--selected' : ''}`}
                onClick={() => setSelected(i)}
              >
                <span className="lp-item-title">{option.title}</span>
                <span className="lp-item-desc">{option.desc}</span>
              </button>
            ))}
          </div>
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
