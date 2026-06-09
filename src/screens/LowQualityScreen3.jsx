import './LowQualityScreen3.css'
import { figmaAsset, figmaThumb } from '../figmaAssets'

const img0 = figmaAsset('6bfa169c-4eab-47e3-a943-e393f32740eb')
const img1 = figmaAsset('55779aed-d239-4d81-9911-90f57640968f')
const img2 = figmaAsset('166c5131-7d35-41b5-92d1-be358deac518')
const img3 = figmaAsset('3ba8619e-abf9-4c5b-9f46-14c82d2eb43f')
const img4 = figmaAsset('65ffd0fc-f22b-4c6d-8731-3dd5ce5759c9')
const img5 = figmaAsset('0a4f6e39-effb-4692-9d82-69af84e2ab7f')
const img6 = figmaAsset('c6aaffbc-1017-4070-8d6b-698c9e6cc9a6')
const img7 = figmaAsset('e51eb82a-c847-492a-8845-ede55dcd947f')
const img8 = figmaAsset('668f0866-0190-4744-a0fe-bdcfc86d0b0a')
const img9 = figmaAsset('c0589298-df53-4b0e-b145-06b51f78a076')
const img10 = figmaAsset('a93dd589-144a-4c6c-8b6a-c3bcaa08393b')
const img11 = figmaAsset('dfca99aa-b901-47d5-b851-5753faed7f59')
const img12 = figmaAsset('ae2f183f-b524-4038-b21c-a04dddaa4a7b')

export const photos = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]

const thumbs = [
  figmaThumb('6bfa169c-4eab-47e3-a943-e393f32740eb'),
  figmaThumb('55779aed-d239-4d81-9911-90f57640968f'),
  figmaThumb('166c5131-7d35-41b5-92d1-be358deac518'),
  figmaThumb('3ba8619e-abf9-4c5b-9f46-14c82d2eb43f'),
  figmaThumb('65ffd0fc-f22b-4c6d-8731-3dd5ce5759c9'),
  figmaThumb('0a4f6e39-effb-4692-9d82-69af84e2ab7f'),
  figmaThumb('c6aaffbc-1017-4070-8d6b-698c9e6cc9a6'),
  figmaThumb('e51eb82a-c847-492a-8845-ede55dcd947f'),
  figmaThumb('668f0866-0190-4744-a0fe-bdcfc86d0b0a'),
  figmaThumb('c0589298-df53-4b0e-b145-06b51f78a076'),
  figmaThumb('a93dd589-144a-4c6c-8b6a-c3bcaa08393b'),
  figmaThumb('dfca99aa-b901-47d5-b851-5753faed7f59'),
  figmaThumb('ae2f183f-b524-4038-b21c-a04dddaa4a7b'),
]

export default function LowQualityScreen3({ onBack, onNext, excluded, onToggle, onPreview }) {
  return (
    <div className="lq3-screen">
      <div className="lq3-navbar">
        <button className="lq3-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="lq3-title">Low Quality</span>
        <div className="lq3-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="lq3-scroll">
        <div className="lq3-header">
          <div className="lq3-step-badge">Schritt 2 von 3</div>
          <h1 className="lq3-heading">Niedrige Qualität</h1>
          <p className="lq3-desc">
           Prüfe Fotos mit niedriger Qualität und entferne unerwünschte aus deinem Fotobuch.
          </p>
        </div>

        <div className="lq3-grid">
          {photos.map((src, i) => {
            const isExcluded = excluded.has(i)
            return (
              <button key={i} className={`lq3-photo${isExcluded ? ' lq3-photo--excluded' : ''}`} onClick={() => onToggle(i)}>
                <img src={thumbs[i]} alt="" className="lq3-photo-img" />
                {isExcluded && <div className="lq3-overlay" />}
                {isExcluded && (
                  <div className="lq3-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#E53935"/>
                      <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                    </svg>
                    <span>ausgeschlossen</span>
                  </div>
                )}
                <div className="lq3-loupe" onClick={(e) => { e.stopPropagation(); onPreview(i, photos) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="lq3-bottombar">
        <div className="lq3-bottombar-inner">
          <button className="lq3-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="lq3-home-indicator" />
      </div>
    </div>
  )
}
