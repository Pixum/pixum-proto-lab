import './PhotoPickerScreen.css'
import { fotosetImages } from '../images'

const topEvents = [
  { name: 'Italien', date: 'März 2026', cover: fotosetImages[0] },
  { name: 'Bali', date: 'Sommer 2024', cover: fotosetImages[5] },
  { name: 'Weihnachten', date: 'Dez. 2023', cover: fotosetImages[10] },
  { name: 'Düsseldorf', date: 'Juni 2023', cover: fotosetImages[15] },
  { name: 'New York', date: 'Frühjahr 2023', cover: fotosetImages[20] },
  { name: '+21', date: '', cover: fotosetImages[25] },
]

const placeholderFolders = [
  { name: 'Favoriten', count: 123, cover: fotosetImages[30] },
  { name: 'Albumname', count: 200, cover: fotosetImages[28]  },
  { name: 'Albumname', count: 200, cover: fotosetImages[17]  },
]

export default function PhotoPickerScreen({ onBack, onOpenAlbum }) {
  return (
    <div className="pp-screen">
      <div className="pp-navbar">
        <button className="pp-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="pp-title">Fotos auswählen</span>
        <div className="pp-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="pp-tabs">
        <button className="pp-tab pp-tab--active">Galerie</button>
        <button className="pp-tab">Quellen</button>
      </div>

      <div className="pp-scroll">
        <div className="pp-banner">
          <svg className="pp-banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
          </svg>
          <div className="pp-banner-text">
            <span className="pp-banner-primary">Wähle alle Bilder ohne Sortierung aus</span>
            <span className="pp-banner-secondary">Wir helfen dir, im nächsten Schritt diese zu sortieren.</span>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Top Events</h2>
          <div className="pp-events-row">
            {topEvents.map((event, i) => (
              <button
                key={i}
                className="pp-event-card"
                onClick={() => onOpenAlbum({ name: 'Kamerarolle', images: fotosetImages })}
              >
                <div className="pp-event-thumb">
                  {event.cover
                    ? <img src={event.cover} alt={event.name} />
                    : <div className="pp-event-placeholder" />}
                </div>
                <span className="pp-event-name">{event.name}</span>
                {event.date && <span className="pp-event-date">{event.date}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Ihre Ordner</h2>
          <div className="pp-folders-grid">
            <button
              className="pp-folder-card"
              onClick={() => onOpenAlbum({ name: 'Kamerarolle', images: fotosetImages })}
            >
              <div className="pp-folder-thumb">
                <img src={fotosetImages[0]} alt="Kamerarolle" />
              </div>
              <span className="pp-folder-name">Kamerarolle</span>
              <span className="pp-folder-count">{fotosetImages.length} Fotos</span>
            </button>

            {placeholderFolders.map((folder, i) => (
              <button key={i} className="pp-folder-card">
                <div className="pp-folder-thumb pp-folder-thumb--placeholder">
                  {folder.cover && <img src={folder.cover} alt={folder.name} />}
                </div>
                <span className="pp-folder-name">{folder.name}</span>
                <span className="pp-folder-count">{folder.count} Fotos</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
