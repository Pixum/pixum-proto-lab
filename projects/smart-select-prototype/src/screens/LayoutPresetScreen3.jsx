import { useRef } from 'react'
import './LayoutPresetScreen.css'
import { figmaAsset } from '../figmaAssets'

const designs = [
  {
    name: 'Simple Moments',
    images: [
      figmaAsset('d97c473f-4644-48c0-b303-ec9e08149ae7'),
      figmaAsset('9b2a40f7-2983-4091-b6c8-8dafac97b850'),
      figmaAsset('b3629eab-bc2f-4537-83a8-33ecd786d529'),
      figmaAsset('215db9fd-e979-4ea3-8372-d1528e3e998b'),
    ],
  },
  {
    name: 'Summer Vibes',
    images: [
      figmaAsset('461d1c52-d4e0-482b-9e40-d40e3aac8580'),
      figmaAsset('0abc0d77-57a3-4f49-a3f8-db62b24aa863'),
      figmaAsset('bcfcaae7-5f71-4459-b79b-ee06c3c79cfc'),
      figmaAsset('09cc8584-f97e-40cc-8f10-d3994f10a489'),
    ],
  },
  {
    name: 'Our memories',
    images: [
      figmaAsset('a6496748-4fd7-42cb-964b-be8942ee1919'),
      figmaAsset('738cf927-33c0-48f7-b2f8-763513376f7c'),
      figmaAsset('419664e0-ad39-413e-869c-34552bb7149d'),
      figmaAsset('5f4b16db-1317-4d5a-8174-61350040f815'),
    ],
  },
]

function useDragScroll() {
  const ref = useRef(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)

  const onMouseDown = (e) => {
    dragging.current = true
    startX.current = e.pageX
    startScroll.current = ref.current.scrollLeft
    ref.current.style.cursor = 'grabbing'
    ref.current.style.userSelect = 'none'
  }
  const stop = () => {
    dragging.current = false
    if (ref.current) {
      ref.current.style.cursor = 'grab'
      ref.current.style.userSelect = ''
    }
  }
  const onMouseMove = (e) => {
    if (!dragging.current) return
    e.preventDefault()
    ref.current.scrollLeft = startScroll.current - (e.pageX - startX.current)
  }

  return { ref, onMouseDown, onMouseMove, onMouseUp: stop, onMouseLeave: stop }
}

function DesignCard({ design, onNext }) {
  const drag = useDragScroll()
  return (
    <div className="lp3-card">
      <div className="lp3-card-header">
        <span className="lp3-card-name">{design.name}</span>
        <button className="lp3-waehlen" onClick={onNext}>Wählen</button>
      </div>
      <div
        className="lp3-strip"
        ref={drag.ref}
        onMouseDown={drag.onMouseDown}
        onMouseMove={drag.onMouseMove}
        onMouseUp={drag.onMouseUp}
        onMouseLeave={drag.onMouseLeave}
      >
        {design.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={i === 0 ? 'lp3-cover' : 'lp3-page'}
            draggable={false}
          />
        ))}
      </div>
    </div>
  )
}

export default function LayoutPresetScreen3({ onBack, onNext }) {
  return (
    <div className="lp-screen">
      <div className="lp-navbar">
        <button className="lp-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="lp-navbar-label">Design</span>
      </div>

      <div className="lp-scroll">
        <div className="lp3-content">
          <div className="lp3-header">
            <p className="lp3-title">Wähle ein passendes Design</p>
            <p className="lp3-subtitle">Im nächsten Schritt kannst du dein Fotobuch bearbeiten und individualisieren.</p>
          </div>

          <div className="lp3-cards">
            {designs.map((design) => (
              <DesignCard key={design.name} design={design} onNext={onNext} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
