import './DuplicatesScreen3.css'
import { figmaAsset, figmaThumb } from '../figmaAssets'

const img0 = figmaAsset('f55b26bf-6b33-49f6-bdb6-cf205135ea83')
const img1 = figmaAsset('4ac068f7-3476-457a-9eae-a856f0630a0b')
const img2 = figmaAsset('441ed1d8-aa56-4c5b-ad98-b4f8feccc1d3')
const img3 = figmaAsset('3e49585e-2d9f-4c26-b665-5196631aac69')
const img4 = figmaAsset('90a39b25-f163-4e3e-ade2-8ffa3f87e21c')
const img5 = figmaAsset('68f875ed-4d31-48ed-a82d-48135a463cf4')
const img6 = figmaAsset('1c4c0418-a16d-4381-b995-0301a9a40b0b')
const img7 = figmaAsset('a68a18f1-a824-4c02-b1cb-f71ffecc9882')
const img8 = figmaAsset('31530bc5-43dc-4f68-ab03-041e570b3514')
const img9 = figmaAsset('7846f887-bfb7-4453-8578-f713e0788254')
const img10 = figmaAsset('00c62f32-b0ec-449c-87af-1e43521db43c')
const img11 = figmaAsset('0a869882-4629-45c8-800b-5bb33c7d75f9')
const img12 = figmaAsset('adf1cc0c-e6e8-461d-b07f-7875f72f9478')
const img13 = figmaAsset('c4554ca5-25c6-4b7e-a4c6-57d2aa72b97f')
const img14 = figmaAsset('f6d5675f-c24e-4598-8d24-f729a6b4eb93')
const img15 = figmaAsset('dbb6d2aa-e3b9-49a5-8539-8e2af280c610')
const img16 = figmaAsset('93e68fa9-49ce-440b-90a9-7a9d2a13f9ea')

const thumb0 = figmaThumb('f55b26bf-6b33-49f6-bdb6-cf205135ea83')
const thumb1 = figmaThumb('4ac068f7-3476-457a-9eae-a856f0630a0b')
const thumb2 = figmaThumb('441ed1d8-aa56-4c5b-ad98-b4f8feccc1d3')
const thumb3 = figmaThumb('3e49585e-2d9f-4c26-b665-5196631aac69')
const thumb4 = figmaThumb('90a39b25-f163-4e3e-ade2-8ffa3f87e21c')
const thumb5 = figmaThumb('68f875ed-4d31-48ed-a82d-48135a463cf4')
const thumb6 = figmaThumb('1c4c0418-a16d-4381-b995-0301a9a40b0b')
const thumb7 = figmaThumb('a68a18f1-a824-4c02-b1cb-f71ffecc9882')
const thumb8 = figmaThumb('31530bc5-43dc-4f68-ab03-041e570b3514')
const thumb9 = figmaThumb('7846f887-bfb7-4453-8578-f713e0788254')
const thumb10 = figmaThumb('00c62f32-b0ec-449c-87af-1e43521db43c')
const thumb11 = figmaThumb('0a869882-4629-45c8-800b-5bb33c7d75f9')
const thumb12 = figmaThumb('adf1cc0c-e6e8-461d-b07f-7875f72f9478')
const thumb13 = figmaThumb('c4554ca5-25c6-4b7e-a4c6-57d2aa72b97f')
const thumb14 = figmaThumb('f6d5675f-c24e-4598-8d24-f729a6b4eb93')
const thumb15 = figmaThumb('dbb6d2aa-e3b9-49a5-8539-8e2af280c610')
const thumb16 = figmaThumb('93e68fa9-49ce-440b-90a9-7a9d2a13f9ea')

export const groups = [
  {
    date: '2 März 2026, 16:04',
    photos: [
      { src: img0, thumb: thumb0, excluded: true },
      { src: img1, thumb: thumb1, excluded: true },
      { src: img2, thumb: thumb2, excluded: true },
      { src: img3, thumb: thumb3, excluded: true },
      { src: img4, thumb: thumb4, excluded: false },
    ],
  },
  {
    date: '2 März 2026, 18:25',
    photos: [
      { src: img5, thumb: thumb5, excluded: false },
      { src: img6, thumb: thumb6, excluded: true },
      { src: img7, thumb: thumb7, excluded: true },
    ],
  },
  {
    date: '2 März 2026, 18:58',
    photos: [
      { src: img8, thumb: thumb8, excluded: true },
      { src: img9, thumb: thumb9, excluded: false },
      { src: img10, thumb: thumb10, excluded: true },
    ],
  },
  {
    date: '2 März 2026, 19:12',
    photos: [
      { src: img11, thumb: thumb11, excluded: true },
      { src: img12, thumb: thumb12, excluded: true },
      { src: img13, thumb: thumb13, excluded: false },
      { src: img14, thumb: thumb14, excluded: true },
    ],
  },
  {
    date: '3 März 2026, 21:04',
    photos: [
      { src: img15, thumb: thumb15, excluded: false },
      { src: img16, thumb: thumb16, excluded: true },
    ],
  },
]

export default function DuplicatesScreen3({ onBack, onNext, excluded, onToggle, onPreview }) {
  const allImages = groups.flatMap(g => g.photos.map(p => p.src))

  return (
    <div className="du3-screen">
      <div className="du3-navbar">
        <button className="du3-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="du3-title">Duplikate</span>
        <div className="du3-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="du3-scroll">
        <div className="du3-header">
          <div className="du3-step-badge">Schritt 1 von 3</div>
          <div className="du3-header-text">
            <h1 className="du3-heading">Duplikate</h1>
            <p className="du3-desc">
              Vergleiche ähnliche Fotos und wähle deine Favoriten für dein Fotobuch aus.
            </p>
          </div>
          <div className="du3-tip">
            <svg className="du3-tip-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
            </svg>
            <p className="du3-tip-text">Tippe auf ein Foto, um es ein- oder auszuschließen.</p>
          </div>
        </div>

        {groups.map((group, gi) => {
          const offset = groups.slice(0, gi).reduce((acc, g) => acc + g.photos.length, 0)
          return (
            <div key={group.date} className="du3-group">
              <p className="du3-date">{group.date}</p>
              <div className="du3-grid">
                {group.photos.map((photo, pi) => {
                  const isExcluded = excluded.has(`${gi}-${pi}`)
                  const flatIndex = offset + pi
                  return (
                    <button key={pi} className={`du3-photo${isExcluded ? ' du3-photo--excluded' : ''}`} onClick={() => onToggle(gi, pi)}>
                      <img src={photo.thumb} alt="" className="du3-photo-img" />
                      {isExcluded && <div className="du3-overlay" />}
                      {isExcluded && (
                        <div className="du3-badge">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#E53935"/>
                            <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                          </svg>
                          <span>ausgeschlossen</span>
                        </div>
                      )}
                      <div className="du3-loupe" onClick={(e) => { e.stopPropagation(); onPreview(flatIndex, allImages) }}>
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

      <div className="du3-bottombar">
        <div className="du3-bottombar-inner">
          <button className="du3-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="du3-home-indicator" />
      </div>
    </div>
  )
}
