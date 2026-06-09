import './HomeScreen.css'
import { figmaAsset } from '../figmaAssets'

const TILE1_IMG = figmaAsset('90ef1d40-0cff-489a-a356-16b7c477d709')
const TILE2_IMG = figmaAsset('c872422d-3efc-4e8d-9b57-cbf6ad0f63bb')
const TILE3_IMG = figmaAsset('a5854c11-8fbf-4b23-a7ac-dbfdea9fd987')

const tiles = [
  {
    badge: 'Prototype 1',
    title: 'Von tausenden Fotos zum Fotobuch in Minuten',
    description: 'Der Fotoauswahlassistent hilft bei der Auswahl und Sortierung fürs Fotobuch, während du jederzeit die Kontrolle behältst.',
    img: TILE1_IMG,
    clickable: true,
  },
  {
    badge: 'Prototype 2',
    title: 'Kein Tage langes Fotos sortieren mehr',
    description: 'In wenigen Schritten die besten Fotos aus deiner Auswahl finden und in ein Fotobuch packen.',
    img: TILE2_IMG,
    clickable: true,
  },
  {
    badge: 'Prototype 3',
    title: 'Zu viele Fotos? Wir helfen Ihnen bei der Auswahl.',
    description: 'Der Fotoauswahlassistent unterstütz Schritt für Schritt bei der Fotosauswahl.',
    img: TILE3_IMG,
    clickable: true,
  },
]

function PixumLogo() {
  return (
    <div className="hs-logo">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1v4M11 17v4M1 11h4M17 11h4M3.93 3.93l2.83 2.83M15.24 15.24l2.83 2.83M18.07 3.93l-2.83 2.83M6.76 15.24l-2.83 2.83" stroke="#0076c8" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      <span className="hs-logo-text">pixum</span>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59L5.24 14c-.16.28-.24.61-.24.96C5 16.1 5.9 17 7 17h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03L23.58 6c.08-.14.12-.29.12-.45C23.7 5.25 23.2 5 22.7 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
    </svg>
  )
}

export default function HomeScreen({ onStartPrototype }) {
  return (
    <div className="hs-shell">
      <div className="hs-topbar">
        <div className="hs-navbar">
          <PixumLogo />
          <div className="hs-nav-actions">
            <button className="hs-nav-btn" aria-label="E-Mail">
              <EmailIcon />
              <span className="hs-nav-badge" />
            </button>
            <button className="hs-nav-btn" aria-label="Warenkorb">
              <CartIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="hs-scroll">
        <div className="hs-tiles">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`hs-tile${tile.clickable ? ' hs-tile--clickable' : ''}`}
              onClick={tile.clickable ? () => onStartPrototype(i + 1) : undefined}
              role={tile.clickable ? 'button' : undefined}
              tabIndex={tile.clickable ? 0 : undefined}
              onKeyDown={tile.clickable ? (e) => e.key === 'Enter' && onStartPrototype(i + 1) : undefined}
            >
              <img className="hs-tile-bg" src={tile.img} alt="" />
              <div className="hs-tile-gradient" />
              <div className="hs-tile-content">
                <span className="hs-badge">{tile.badge}</span>
                <div className="hs-tile-text">
                  <p className="hs-tile-title">{tile.title}</p>
                  <p className="hs-tile-desc">{tile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
