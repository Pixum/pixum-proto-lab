import './DuplicatesScreen.css'
import { figmaAsset } from '../figmaAssets'

const img0 = figmaAsset('4aee280a-66e2-4a89-8ade-1abe1821283a')
const img1 = figmaAsset('1085af41-fbbd-4dc3-9d46-656aae9e2aff')
const img2 = figmaAsset('d1782826-1004-4f77-beec-bfc1eb04f878')
const img3 = figmaAsset('06ba8079-f6a7-4fb9-b6c4-5f7f58ac4da5')
const img4 = figmaAsset('6f1e6d79-2a08-45be-bac4-ac0f83255ab1')
const img5 = figmaAsset('4b593b1d-b431-4183-a558-604da4c32aad')
const img6 = figmaAsset('8021513b-5cfb-49de-b884-16889824b7fc')
const img7 = figmaAsset('c172f041-3642-4a3d-8234-799ac1e2603e')
const img8 = figmaAsset('b6016f91-edb1-43fa-b9f8-3e3bf4fa7933')
const img9 = figmaAsset('b0e3eb49-37f9-4865-afc4-d83966fea9a0')
const img10 = figmaAsset('69fe3560-1717-417c-9fbc-37e736bc25ee')
const img11 = figmaAsset('bf3c0b61-5eb1-4990-8c32-4a0f46acb85b')
const img12 = figmaAsset('0139fc09-bb9c-4d54-a193-5fd9deacda3c')
const img13 = figmaAsset('1eb5eb8c-e72b-4c0a-bbd6-227f40432438')
const img14 = figmaAsset('f175f185-fb87-4fef-a9a7-dc76fa2d19cd')
const img15 = figmaAsset('e1d10733-8496-407e-ad5c-f691d8195200')
const img16 = figmaAsset('ae452654-aa48-48b0-951a-98f747e7c947')

export const groups = [
  {
    date: '2 März 2026, 16:04',
    photos: [
      { src: img0, excluded: true },
      { src: img1, excluded: true },
      { src: img2, excluded: true },
      { src: img3, excluded: true },
      { src: img4, excluded: false },
    ],
  },
  {
    date: '2 März 2026, 18:25',
    photos: [
      { src: img5, excluded: false },
      { src: img6, excluded: true },
      { src: img7, excluded: true },
    ],
  },
  {
    date: '2 März 2026, 18:58',
    photos: [
      { src: img8, excluded: true },
      { src: img9, excluded: false },
      { src: img10, excluded: true },
    ],
  },
  {
    date: '2 März 2026, 19:12',
    photos: [
      { src: img11, excluded: true },
      { src: img12, excluded: true },
      { src: img13, excluded: false },
      { src: img14, excluded: true },
    ],
  },
  {
    date: '3 März 2026, 21:04',
    photos: [
      { src: img15, excluded: false },
      { src: img16, excluded: true },
    ],
  },
]

export default function DuplicatesScreen({ onBack, excluded, onToggle, onPreview }) {
  const allImages = groups.flatMap(g => g.photos.map(p => p.src))

  return (
    <div className="du-screen">
      <div className="du-navbar">
        <button className="du-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="du-title">Duplikate</span>
        <div className="du-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="du-scroll">
        <div className="du-header">
          <h1 className="du-heading">Duplikate</h1>
          <p className="du-desc">
            Sie können ähnliche Fotos überprüfen und auswählen, welche Sie in Ihr Fotobuch aufnehmen möchten.
          </p>
        </div>

        <div className="du-tip">
          <svg className="du-tip-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
          </svg>
          <p className="du-tip-text">Tippen Sie auf ein Foto, um es aus Ihrer Auswahl zu entfernen oder hinzuzufügen.</p>
        </div>

        {groups.map((group, gi) => {
          const offset = groups.slice(0, gi).reduce((acc, g) => acc + g.photos.length, 0)
          return (
            <div key={group.date} className="du-group">
              <p className="du-date">{group.date}</p>
              <div className="du-grid">
                {group.photos.map((photo, pi) => {
                  const isExcluded = excluded.has(`${gi}-${pi}`)
                  const flatIndex = offset + pi
                  return (
                    <button key={pi} className={`du-photo${isExcluded ? ' du-photo--excluded' : ''}`} onClick={() => onToggle(gi, pi)}>
                      <img src={photo.src} alt="" className="du-photo-img" />
                      {isExcluded && <div className="du-overlay" />}
                      {isExcluded && (
                        <div className="du-badge">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#E53935"/>
                            <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                          </svg>
                          <span>ausgeschlossen</span>
                        </div>
                      )}
                      <div className="du-loupe" onClick={(e) => { e.stopPropagation(); onPreview(flatIndex, allImages) }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                        </svg>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
