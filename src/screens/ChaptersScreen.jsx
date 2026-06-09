import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import './ChaptersScreen.css'
import { figmaThumb } from '../figmaAssets'

const img = figmaThumb

const chapters = [
  {
    label: 'Ankunft in Trapani (15 Fotos)',
    images: [
      img('4a6e44e0-ce47-4633-842a-7f26a1a0c0f7'),
      img('fba557d4-e13b-4dae-81a3-eaf962696c08'),
      img('b9eb7324-d7eb-400b-97c1-4e58d1a58562'),
      img('c8986811-6057-4467-9400-65a1ca23de05'),
      img('ee6e5570-9533-4da7-b16b-48a400623a56'),
      img('f56e4394-51fb-4351-9b06-c94776763fdc'),
      img('cbab29fd-0ab0-46d9-b95e-1500325475e5'),
      img('97207fe5-f1e6-4496-b1cc-60d6548fd4e0'),
      img('f9953229-a654-4d6d-92c0-da792507f31b'),
      img('f87ac2a3-05cc-4cbb-8639-ed2dc60a156b'),
      img('c49d8ce6-5be6-422e-9bbe-6301d1db8356'),
      img('da9f48ae-b158-4943-ae57-e7a578d8ec11'),
      img('37e14701-0fc5-4c0d-83ac-51c2ee8ded89'),
      img('476591e6-af77-4620-ac25-e88d8d21965a'),
      img('1b7197f5-0070-4f43-80c9-93d8e36f1b35'),
    ],
    filler: 0,
  },
  {
    label: 'Monte Erice (26 Fotos)',
    images: [
      img('3027bffb-ff39-4790-8e3e-8d1667e2004d'),
      img('8a07ead4-341f-4812-9f56-ddeaae431749'),
      img('0ecd4f8c-0833-4e82-93ab-6c422a91d856'),
      img('f893401f-d2fb-43ea-9410-b83d5e89b095'),
      img('05c95966-52ef-44b3-94a5-437a52302b6c'),
      img('aa4a9d78-ba15-488f-a879-c26616c1bdaf'),
      img('81f87d26-6fb5-415f-82d2-b6f9508108cb'),
      img('3fc09ae6-175a-4aad-8040-eb2e8db7f333'),
      img('3906b47e-c603-4083-8256-890a56411b16'),
      img('1cb8f868-fb51-439b-be01-399fa35d48a2'),
      img('b4e6ed3b-9bd7-4ee6-b5b5-acd03b7b3d98'),
      img('53105496-7cbb-49fc-a0b4-8bdc722af5ce'),
      img('ce20fb57-37b5-4fab-9987-8bcd6f3b00be'),
      img('6e2ac46a-72d9-4db9-bd7d-73283afcf73c'),
      img('a99af186-cab0-4b7f-bf69-0983fa85df46'),
      img('b9eb7324-d7eb-400b-97c1-4e58d1a58562'),
      img('043fd660-c79b-4ed7-a626-a69d4524937c'),
      img('83abde5f-6664-473d-b122-0e8a550d9f00'),
      img('2846fe3d-c174-4a43-92e9-95889bc29217'),
      img('bea6c1ab-28bd-4a37-8373-3b6b27cc8f10'),
      img('5f116462-b4f6-4688-b734-5368a9b373e1'),
      img('e1f9c030-1aba-4b41-8c68-1ae19a9e2fc9'),
      img('ce1566bb-5807-4753-8e1a-ed8e36c54dd8'),
      img('096cef45-af3d-4ebe-9d0c-e26e1088b54f'),
      img('f5c9a0c7-551c-4dcb-b239-59c984e54fc8'),
      img('0083cd0d-25ea-4059-8bb8-0dff7d8fa4da'),
    ],
    filler: 0,
  },
  {
    label: 'Ein letzter Abend (7 Fotos)',
    images: [
      img('398d9298-45b8-4314-947d-2ff44a85bb05'),
      img('fccc84e0-b37f-4f00-b4ef-630200235f43'),
      img('be10131f-a260-4c2c-adb0-a6df04ee98fb'),
      img('7a690d6e-db23-46a5-b934-d6c9420c46cf'),
      img('0d563f5f-ccfa-4b04-a326-35b21ea150e8'),
      img('f753cecc-405d-4548-be06-74746bcb1d16'),
      img('78abc500-a33e-42ca-b48a-257aa645a127'),
    ],
    filler: 1,
  },
]

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor" />
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
  </svg>
)

const UndoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" fill="currentColor" />
  </svg>
)

const RedoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" fill="currentColor" />
  </svg>
)

const MoreVertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
  </svg>
)

const AddPhotoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 8c0-.55.45-1 1-1h1V5c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1H7v2c0 .55-.45 1-1 1s-1-.45-1-1V9H4c-.55 0-1-.45-1-1zm16 2V7h-8.42c.28.6.42 1.28.42 2 0 2.76-2.24 5-5 5-.72 0-1.4-.14-2-.42V19c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm-5 9l-3-4-2 2.5-1-1.31L6 19h8z" fill="currentColor" />
  </svg>
)

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="currentColor" />
  </svg>
)

const SplitIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4h-6zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5-5.01L14 4h-4z" fill="currentColor" />
  </svg>
)

const MergeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M17 20l4-4-4-4v3h-3.17l-2-2 2-2H17v3l4-4-4-4v3h-3.17l-5.59-5.59L7 4 4 7l1.41 1.41L7 6.83V13c0 1.1.9 2 2 2h5.17v3z" fill="currentColor" />
  </svg>
)

const RenameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" fill="currentColor" />
  </svg>
)

const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
  </svg>
)

export default function ChaptersScreen({ onBack, onNext }) {
  const [collapsed, setCollapsed] = useState(new Set())
  const [activeSheet, setActiveSheet] = useState(null)
  const [chapterImages, setChapterImages] = useState(() =>
    chapters.map(c => [...c.images])
  )

  // Drag refs — updated synchronously, never cause re-renders
  const dragRef = useRef(null)    // { chapterIdx, photoIdx, offsetX, offsetY, longPressReady }
  const dragOverRef = useRef(null) // { chapterIdx, photoIdx } — mirrors dragOver state
  const ghostRef = useRef(null)
  const ghostImgRef = useRef(null)
  const longPressTimerRef = useRef(null)
  const LONG_PRESS_MS = 500

  // Only these drive visual updates
  const [dragging, setDragging] = useState(null)         // { chapterIdx, photoIdx, src }
  const [dragOver, setDragOver] = useState(null)          // { chapterIdx, photoIdx }
  const [longPressActive, setLongPressActive] = useState(null) // { chapterIdx, photoIdx }

  const displayImages = useMemo(() => {
    if (!dragging || !dragOver) return chapterImages
    const { chapterIdx: srcCh, src: draggingSrc } = dragging
    const { chapterIdx: dstCh, photoIdx: dstIdx } = dragOver
    const next = chapterImages.map(arr => [...arr])
    const srcIdx = next[srcCh].indexOf(draggingSrc)
    if (srcIdx === -1) return chapterImages
    next[srcCh].splice(srcIdx, 1)
    next[dstCh].splice(dstIdx, 0, draggingSrc)
    return next
  }, [chapterImages, dragging, dragOver])

  const toggle = (i) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const reorder = useCallback((srcCh, srcIdx, dstCh, dstIdx) => {
    setChapterImages(prev => {
      const next = prev.map(arr => [...arr])
      const [photo] = next[srcCh].splice(srcIdx, 1)
      next[dstCh].splice(dstIdx, 0, photo)
      return next
    })
  }, [])

  // Stable move/up handlers — deps are all stable (state setters + reorder with [] deps)
  const handlePointerMove = useCallback((e) => {
    if (!dragRef.current) return
    const { offsetX, offsetY } = dragRef.current

    if (!dragRef.current.longPressReady) {
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      if (Math.hypot(dx, dy) > 8) {
        // Moved too far before long-press — treat as scroll, cancel
        clearTimeout(longPressTimerRef.current)
        dragRef.current = null
        window.removeEventListener('pointermove', handlePointerMove)
        // pointerup listener stays so it can clean itself up when finger lifts
      }
      return
    }

    if (!dragRef.current.active) {
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      if (Math.hypot(dx, dy) < 4) return
      dragRef.current.active = true
      e.preventDefault()
      document.body.style.userSelect = 'none'
      if (ghostRef.current) ghostRef.current.style.display = 'block'
      const { chapterIdx, photoIdx, src } = dragRef.current
      setDragging({ chapterIdx, photoIdx, src })
      setLongPressActive(null)
      return
    }

    const ghost = ghostRef.current
    if (ghost) {
      ghost.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`
    }

    // Hit-test through ghost (pointer-events: none on ghost lets this work)
    const el = document.elementFromPoint(e.clientX, e.clientY)
    const tile = el?.closest('[data-chapter][data-photo]')
    if (tile) {
      const ch = Number(tile.dataset.chapter)
      const ph = Number(tile.dataset.photo)
      const next = { chapterIdx: ch, photoIdx: ph }
      dragOverRef.current = next
      setDragOver(prev =>
        prev?.chapterIdx === ch && prev?.photoIdx === ph ? prev : next
      )
    } else {
      dragOverRef.current = null
      setDragOver(null)
    }
  }, [setDragging, setDragOver, setLongPressActive])

  const handlePointerUp = useCallback(() => {
    clearTimeout(longPressTimerRef.current)
    setLongPressActive(null)
    // Always remove listeners synchronously — no React timing dependency
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)

    if (!dragRef.current) return
    const { chapterIdx: srcCh, photoIdx: srcIdx, active } = dragRef.current
    const over = dragOverRef.current

    if (active && over && !(over.chapterIdx === srcCh && over.photoIdx === srcIdx)) {
      reorder(srcCh, srcIdx, over.chapterIdx, over.photoIdx)
    }

    dragRef.current = null
    dragOverRef.current = null

    document.body.style.userSelect = ''
    if (ghostRef.current) ghostRef.current.style.display = 'none'

    setDragging(null)
    setDragOver(null)
  }, [handlePointerMove, reorder, setDragging, setDragOver, setLongPressActive])

  const handlePointerDown = useCallback((chapterIdx, photoIdx, src, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    dragRef.current = { chapterIdx, photoIdx, offsetX, offsetY, src, startX: e.clientX, startY: e.clientY, active: false, longPressReady: false }
    dragOverRef.current = null

    if (ghostImgRef.current) ghostImgRef.current.src = src
    const ghost = ghostRef.current
    if (ghost) {
      ghost.style.width = `${rect.width}px`
      ghost.style.height = `${rect.height}px`
      ghost.style.transform = `translate(${rect.left}px, ${rect.top}px)`
    }

    longPressTimerRef.current = setTimeout(() => {
      if (dragRef.current) {
        dragRef.current.longPressReady = true
        setLongPressActive({ chapterIdx, photoIdx })
        navigator.vibrate?.(50)
      }
    }, LONG_PRESS_MS)

    // Add listeners synchronously so pointerup is always caught, even on fast taps
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }, [handlePointerMove, handlePointerUp])

  // Safety net: remove listeners and timer if component unmounts mid-drag
  useEffect(() => {
    return () => {
      clearTimeout(longPressTimerRef.current)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  return (
    <div className="ch-screen">
      <div className="ch-navbar">
        <button className="ch-back" onClick={onBack} aria-label="Zurück">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
        </button>
        <div className="ch-navbar-actions">
          <button className="ch-action-btn" aria-label="Rückgängig" disabled>
            <UndoIcon />
          </button>
          <button className="ch-action-btn" aria-label="Wiederholen" disabled>
            <RedoIcon />
          </button>
        </div>
      </div>

      <div className="ch-scroll">
        <p className="ch-heading">Fotos nach Kapiteln</p>
        <div className="ch-chapters">
          {chapters.map((chapter, i) => {
            const isCollapsed = collapsed.has(i)
            return (
              <div key={i} className="ch-chapter">
                <div className="ch-chapter-header">
                  <span className="ch-chapter-title">{chapter.label}</span>
                  <div className="ch-chapter-actions">
                    <button
                      className="ch-overflow-btn"
                      onClick={() => setActiveSheet(i)}
                      aria-label="Weitere Optionen"
                    >
                      <MoreVertIcon />
                    </button>
                    <button
                      className="ch-expand-btn"
                      onClick={() => toggle(i)}
                      aria-label={isCollapsed ? 'Aufklappen' : 'Zuklappen'}
                    >
                      <span className={`ch-expand-icon${isCollapsed ? '' : ' expanded'}`}>
                        <ChevronIcon />
                      </span>
                    </button>
                  </div>
                </div>
                {!isCollapsed && (
                  <div className="ch-photo-grid">
                    {displayImages[i].map((src, j) => {
                      const isDragging = dragging?.src === src
                      return (
                        <div
                          key={src}
                          className={`ch-photo-tile${isDragging ? ' ch-photo-tile--dragging' : ''}${longPressActive?.chapterIdx === i && longPressActive?.photoIdx === j ? ' ch-photo-tile--long-pressed' : ''}`}
                          data-chapter={i}
                          data-photo={j}
                          onPointerDown={(e) => handlePointerDown(i, j, src, e)}
                        >
                          <img src={src} alt="" draggable={false} loading="lazy" />
                        </div>
                      )
                    })}
                    <div className="ch-add-tile">
                      <span className="ch-add-icon">
                        <PlusIcon />
                      </span>
                    </div>
                    {Array.from({ length: chapter.filler }).map((_, j) => (
                      <div key={`filler-${j}`} className="ch-photo-tile ch-photo-tile--hidden" />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="ch-bottombar">
        <div className="ch-bottombar-inner">
          <button className="ch-cta" onClick={onNext}>Nächster Schritt</button>
        </div>
        <div className="ch-home-indicator" />
      </div>

      {/* Ghost always in DOM so ghostRef is available on first pointerDown */}
      <div className="ch-drag-ghost" ref={ghostRef} style={{ display: 'none' }}>
        <img ref={ghostImgRef} alt="" draggable={false} />
      </div>

      {activeSheet !== null && (
        <div className="ch-sheet-overlay" onClick={() => setActiveSheet(null)}>
          <div className="ch-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ch-sheet-handle" />
            <div className="ch-sheet-content">
              <p className="ch-sheet-title">{chapters[activeSheet].label}</p>
              <div className="ch-sheet-items">

                <div className="ch-item-card">
                  <div className="ch-item-row">
                    <span className="ch-item-icon"><AddPhotoIcon /></span>
                    <span className="ch-item-text">Fotos zu diesem Kapitel hinzufügen</span>
                  </div>
                </div>

                <div className="ch-item-card">
                  <div className="ch-item-row">
                    <span className="ch-item-icon"><ArrowDownIcon /></span>
                    <span className="ch-item-text">Kapitel nach unten verschieben</span>
                  </div>
                </div>

                <div className="ch-item-card">
                  <div className="ch-item-row">
                    <span className="ch-item-icon"><SplitIcon /></span>
                    <span className="ch-item-text">Kapitel teilen</span>
                  </div>
                  <div className="ch-item-divider" />
                  <div className="ch-item-row">
                    <span className="ch-item-icon"><MergeIcon /></span>
                    <span className="ch-item-text">Kapiteln zusammenführen</span>
                  </div>
                </div>

                <div className="ch-item-card">
                  <div className="ch-item-row">
                    <span className="ch-item-icon"><RenameIcon /></span>
                    <span className="ch-item-text">Kapitelname ändern</span>
                  </div>
                </div>

                <div className="ch-item-card ch-item-card--error">
                  <div className="ch-item-row">
                    <span className="ch-item-icon ch-item-icon--error"><TrashIcon /></span>
                    <span className="ch-item-text">Kapitel entfernen</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
