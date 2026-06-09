import { useState, useRef } from 'react'
import './IntroductionScreen.css'

import img1 from '../../rsc/Introduciton_01.jpg'
import img2 from '../../rsc/Introduciton_02.jpg'
import img3 from '../../rsc/Introduciton_03.jpg'

const slides = [
  {
    image: img1,
    title: 'Zu viele Fotos? Wir helfen dir bei der Auswahl.',
    body: 'Alle Fotos ungefiltert auswählen und mithilfe des Assistenten die besten Momente rausfiltern.',
    button: 'Weiter',
  },
  {
    image: img2,
    title: 'Von tausenden Fotos zum Fotobuch in Minuten',
    body: 'Gut beleuchtet, schöne Motive, echte Emotionen – wir sortieren sie vor, du entscheidest.',
    button: 'Weiter',
  },
  {
    image: img3,
    title: 'Du entscheidest, wie es aussehen soll.',
    body: 'Übernehmen, anpassen oder austauschen – Dein Fotobuch, Dein Gefühl.',
    button: 'Starten',
  },
]

export default function IntroductionScreen({ onComplete, onBack }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)

  const goTo = (index) => {
    if (index >= 0 && index < slides.length) setCurrent(index)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) goTo(current + 1)
    else if (delta < -50) goTo(current - 1)
    touchStartX.current = null
  }

  const handleButton = () => {
    if (current < slides.length - 1) goTo(current + 1)
    else onComplete?.()
  }

  return (
    <div
      className="intro-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="intro-track"
        style={{ transform: `translateX(calc(-${100 / slides.length}% * ${current}))` }}
      >
        {slides.map((slide, i) => (
          <div className="intro-slide" key={i}>
            <img className="intro-bg" src={slide.image} alt="" />
            <div className="intro-gradient" />

            <div className="intro-topbar">
              <div className="intro-navbar">
                {(current > 0 || onBack) && (
                  <button
                    className="intro-back"
                    onClick={() => current > 0 ? goTo(current - 1) : onBack?.()}
                    aria-label="Zurück"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="intro-content">
              <div className="intro-text">
                <h1 className="intro-title">{slide.title}</h1>
                <p className="intro-body">{slide.body}</p>
              </div>
              <div className="intro-dots">
                {slides.map((_, j) => (
                  <button
                    key={j}
                    className={`intro-dot${j === current ? ' intro-dot--active' : ''}`}
                    onClick={() => goTo(j)}
                    aria-label={`Slide ${j + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="intro-bottombar">
              <div className="intro-tabbar">
                <button className="intro-cta" onClick={handleButton}>
                  {slide.button}
                </button>
              </div>
              <div className="intro-home-indicator" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
