import previewImg from '../../rsc/preview.png'
import './OverviewScreen.css'

const items = [
  {
    title: '14 Duplikate identifiziert',
    description: 'Duplikate sind Bilder, die ähnlich aussehen und zur gleichen Zeit aufgenommen wurden',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: '13 Bilder mit geringer Qualität gefunden',
    description: 'Bilder von geringer Qualität basieren auf Qualität, Schärfe und Dunkelheit',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-16v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: '7 weitere Bilder gefiltert',
    description: 'Darüber hinaus filtern wir Bilder wie Quittungen, Screenshots, Menüs usw.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.81 2.81L1.5 4.13 3 5.63V19c0 1.1.9 2 2 2h13.37l1.5 1.5 1.32-1.32L2.81 2.81zM5 19V7.63L16.37 19H5zm2.92-15L5.92 2H19c1.1 0 2 .9 2 2v13.08l-2-2V4H7.92z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function OverviewScreen({ onBack, onDuplicates, onLowQuality, onFiltered, onNext }) {
  const handlers = [onDuplicates, onLowQuality, onFiltered]
  return (
    <div className="ov-screen">
      <div className="ov-navbar">
        <button className="ov-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="ov-title">Übersicht</span>
        <div className="ov-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="ov-scroll">
        <img src={previewImg} alt="" className="ov-preview-img" />

        <div className="ov-badge">Von 91 Bildern</div>

        <h1 className="ov-heading">Wir haben Ihre 71 besten Fotos ausgewählt</h1>

        <div className="ov-list">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="ov-divider" />}
              <div className="ov-list-item ov-list-item--clickable" onClick={handlers[i]} role="button" tabIndex={0}>
                <div className="ov-icon-wrap">
                  {item.icon}
                </div>
                <div className="ov-item-content">
                  <p className="ov-item-title">{item.title}</p>
                  <p className="ov-item-desc">{item.description}</p>
                </div>
                <div className="ov-chevron">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ov-bottombar">
        <div className="ov-bottombar-inner">
          <button className="ov-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="ov-home-indicator" />
      </div>
    </div>
  )
}
