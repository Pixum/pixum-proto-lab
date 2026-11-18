import './LowQualityScreen.css'
import { figmaAsset } from '../figmaAssets'

const img0 = figmaAsset('1bca8cd6-c87d-431d-a258-5674f714228c')
const img1 = figmaAsset('17ca2f9e-601a-4b96-bfba-7581b15d837a')
const img2 = figmaAsset('7173983a-2023-49c6-9951-4db2410ed1a8')
const img3 = figmaAsset('00d9a9be-97fa-46e1-becd-3f41ee6eab44')
const img4 = figmaAsset('ca8acfcf-4049-4e57-bff6-8a746d0c3cdd')
const img5 = figmaAsset('a35711fe-d2e9-4ba0-9e54-9ae97df3fbd9')
const img6 = figmaAsset('22520f22-2dfd-47f1-a6bb-1ce4666ff021')
const img7 = figmaAsset('00cf96f2-1921-4cdd-9ae9-d18231709dfa')
const img8 = figmaAsset('349b9119-73b7-4afa-9573-8980ac3f62e6')
const img9 = figmaAsset('e4e9c9e1-fd36-4548-9809-f5281332e95e')
const img10 = figmaAsset('a57a6673-25da-4b3f-aa16-d5be6cc18cce')
const img11 = figmaAsset('34cf5a8a-02ce-4803-971e-2a0c4bb34fb9')
const img12 = figmaAsset('cbe4be0f-5aff-46f9-9b5f-325e53eb24a9')

export const photos = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]

export default function LowQualityScreen({ onBack, excluded, onToggle, onPreview }) {
  return (
    <div className="lq-screen">
      <div className="lq-navbar">
        <button className="lq-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="lq-title">Niedrige Qualität</span>
        <div className="lq-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="lq-scroll">
        <div className="lq-header">
          <h1 className="lq-heading">Niedrige Qualität</h1>
          <p className="lq-desc">
            Überprüfen Sie Bilder mit niedriger Qualität und wählen Sie aus, welche Sie aus Ihrem Fotobuch ausschließen möchten.
          </p>
        </div>

        <div className="lq-grid">
          {photos.map((src, i) => {
            const isExcluded = excluded.has(i)
            return (
              <button key={i} className={`lq-photo${isExcluded ? ' lq-photo--excluded' : ''}`} onClick={() => onToggle(i)}>
                <img src={src} alt="" className="lq-photo-img" />
                {isExcluded && <div className="lq-overlay" />}
                {isExcluded && (
                  <div className="lq-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#E53935"/>
                      <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                    </svg>
                    <span>ausgeschlossen</span>
                  </div>
                )}
                <div className="lq-loupe" onClick={(e) => { e.stopPropagation(); onPreview(i, photos) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
