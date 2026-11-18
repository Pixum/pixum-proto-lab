import './FinalOverviewScreen3.css'
import { figmaAsset, figmaThumb } from '../figmaAssets'

const img0 = figmaAsset('65314103-48b6-439e-ae1f-2c2066501db3')
const img1 = figmaAsset('0416bb41-5ab4-46e9-bae0-c854a9beecb3')
const img2 = figmaAsset('e676bee6-87dc-4da1-9ba9-7fa0ed1b311d')
const img3 = figmaAsset('737b50c0-52c9-44d4-862d-8b0d8025a42b')
const img4 = figmaAsset('e512a67e-7c92-4715-8fdb-f6c4cceafde2')
const img5 = figmaAsset('39dd1c8e-8aef-437b-b98f-27d36355c756')
const img6 = figmaAsset('9ca468e8-aede-46f8-8714-35592eb8ece3')
const img7 = figmaAsset('4c57ab97-1ee4-4fb8-848f-9f225234628b')
const img8 = figmaAsset('222165bc-9465-4b0b-a079-aa777f915d11')
const img9 = figmaAsset('142318d0-147e-48fa-9c1c-1725be52d0ac')
const img10 = figmaAsset('2fb31ce0-6137-4dbc-8320-4df947f32855')
const img11 = figmaAsset('8497c743-f56f-496b-9d5f-299368f57c4c')
const img12 = figmaAsset('eb8ba65c-a728-4921-8412-b1a66e3c32f1')
const img13 = figmaAsset('ea1d9914-94f5-4ec6-ab42-1db9a59ddb06')
const img14 = figmaAsset('f5dc8b3b-79bd-4991-8ac5-6ce16af501e0')
const img15 = figmaAsset('0e411daf-20d9-4744-b07f-c5adf36b6196')
const img16 = figmaAsset('966fb089-6049-4295-a088-cd6512fc1269')
const img17 = figmaAsset('1e4d2c2b-6f85-449c-babf-6abc32cccef4')
const img18 = figmaAsset('043ebd4d-7704-435a-805d-a650c83f4822')
const img19 = figmaAsset('b2b56c3e-5805-4a00-8ebc-8f8d41c456de')
const img20 = figmaAsset('9ec80d46-d7a4-4749-83b2-bec41b92dcdf')
const img21 = figmaAsset('aeb18eb7-4e91-405d-89bd-5fb2a2eb6491')
const img22 = figmaAsset('5be35682-fcda-4955-b193-57a5b9831d61')
const img23 = figmaAsset('0a499495-c146-4992-9581-ed28a366b009')
const img24 = figmaAsset('95b8d610-4d55-449a-a246-277b4e18f98e')
const img25 = figmaAsset('a5b9f1c3-5921-44a9-93f1-21c9ef03be97')
const img26 = figmaAsset('1393f4be-c5c1-48a6-927f-e7683ca005c0')
const img27 = figmaAsset('0650e68b-7c90-467f-bb5e-8cb54a8594cc')
const img28 = figmaAsset('30f3f584-f64e-4130-a60c-9caaa533dede')
const img29 = figmaAsset('c22593cc-57ae-4110-8aa0-231ec93be100')

const photos = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29]

const thumbs = [
  figmaThumb('65314103-48b6-439e-ae1f-2c2066501db3'),
  figmaThumb('0416bb41-5ab4-46e9-bae0-c854a9beecb3'),
  figmaThumb('e676bee6-87dc-4da1-9ba9-7fa0ed1b311d'),
  figmaThumb('737b50c0-52c9-44d4-862d-8b0d8025a42b'),
  figmaThumb('e512a67e-7c92-4715-8fdb-f6c4cceafde2'),
  figmaThumb('39dd1c8e-8aef-437b-b98f-27d36355c756'),
  figmaThumb('9ca468e8-aede-46f8-8714-35592eb8ece3'),
  figmaThumb('4c57ab97-1ee4-4fb8-848f-9f225234628b'),
  figmaThumb('222165bc-9465-4b0b-a079-aa777f915d11'),
  figmaThumb('142318d0-147e-48fa-9c1c-1725be52d0ac'),
  figmaThumb('2fb31ce0-6137-4dbc-8320-4df947f32855'),
  figmaThumb('8497c743-f56f-496b-9d5f-299368f57c4c'),
  figmaThumb('eb8ba65c-a728-4921-8412-b1a66e3c32f1'),
  figmaThumb('ea1d9914-94f5-4ec6-ab42-1db9a59ddb06'),
  figmaThumb('f5dc8b3b-79bd-4991-8ac5-6ce16af501e0'),
  figmaThumb('0e411daf-20d9-4744-b07f-c5adf36b6196'),
  figmaThumb('966fb089-6049-4295-a088-cd6512fc1269'),
  figmaThumb('1e4d2c2b-6f85-449c-babf-6abc32cccef4'),
  figmaThumb('043ebd4d-7704-435a-805d-a650c83f4822'),
  figmaThumb('b2b56c3e-5805-4a00-8ebc-8f8d41c456de'),
  figmaThumb('9ec80d46-d7a4-4749-83b2-bec41b92dcdf'),
  figmaThumb('aeb18eb7-4e91-405d-89bd-5fb2a2eb6491'),
  figmaThumb('5be35682-fcda-4955-b193-57a5b9831d61'),
  figmaThumb('0a499495-c146-4992-9581-ed28a366b009'),
  figmaThumb('95b8d610-4d55-449a-a246-277b4e18f98e'),
  figmaThumb('a5b9f1c3-5921-44a9-93f1-21c9ef03be97'),
  figmaThumb('1393f4be-c5c1-48a6-927f-e7683ca005c0'),
  figmaThumb('0650e68b-7c90-467f-bb5e-8cb54a8594cc'),
  figmaThumb('30f3f584-f64e-4130-a60c-9caaa533dede'),
  figmaThumb('c22593cc-57ae-4110-8aa0-231ec93be100'),
]

export default function FinalOverviewScreen3({ onBack, onNext, excluded, onToggle, onPreview }) {
  return (
    <div className="fo3-screen">
      <div className="fo3-navbar">
        <button className="fo3-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <span className="fo3-title">Finale Auswahl</span>
        <div className="fo3-back" style={{ visibility: 'hidden' }} />
      </div>

      <div className="fo3-scroll">
        <div className="fo3-header">
          <h1 className="fo3-heading">Finale Auswahl</h1>
          <p className="fo3-desc">
            Das ist deine finale Auswahl. Als Nächstes erstellen wir Kapitel für dein Fotobuch. Die Bilderauswahl lässt sich jederzeit anpassen.
          </p>
        </div>

        <div className="fo3-grid">
          {photos.map((src, i) => {
            const isExcluded = excluded.has(i)
            return (
              <button key={i} className={`fo3-photo${isExcluded ? ' fo3-photo--excluded' : ''}`} onClick={() => onToggle(i)}>
                <img src={thumbs[i]} alt="" className="fo3-photo-img" />
                {isExcluded && <div className="fo3-overlay" />}
                {isExcluded && (
                  <div className="fo3-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#E53935"/>
                      <path d="M11.5 5.5L10.5 4.5 8 7 5.5 4.5 4.5 5.5 7 8 4.5 10.5 5.5 11.5 8 9 10.5 11.5 11.5 10.5 9 8z" fill="white"/>
                    </svg>
                    <span>ausgeschlossen</span>
                  </div>
                )}
                <div className="fo3-loupe" onClick={(e) => { e.stopPropagation(); onPreview(i, photos) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="fo3-bottombar">
        <div className="fo3-bottombar-inner">
          <button className="fo3-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="fo3-home-indicator" />
      </div>
    </div>
  )
}
