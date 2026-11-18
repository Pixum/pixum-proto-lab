import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Canvas.module.css'

// Scales its content to fit the free area (the canvas minus the sidebar), centered.
// Replaced by real pan/zoom in Phase 5.
export default function FitToView({ children, maxWidth }: { children: ReactNode; maxWidth: number }) {
  const stage = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useLayoutEffect(() => {
    const s = stage.current!
    const c = content.current!
    const update = () => {
      // offsetWidth/Height ignore transforms, so this is the book's natural (unscaled) size.
      const next = Math.min(s.clientWidth / c.offsetWidth, s.clientHeight / c.offsetHeight, maxWidth / c.offsetWidth)
      if (Number.isFinite(next) && next > 0) setScale(next)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(s)
    observer.observe(c)
    return () => observer.disconnect()
  }, [maxWidth])

  return (
    <div className={styles.stage} ref={stage}>
      <div
        ref={content}
        className={styles.content}
        style={{
          transform: `translate(-50%, -50%) scale(${scale ?? 1})`,
          visibility: scale === null ? 'hidden' : 'visible', // no flash before the first fit
          '--scale': scale ?? 1,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
