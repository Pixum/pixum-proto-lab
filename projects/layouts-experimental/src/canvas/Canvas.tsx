import type { ReactNode } from 'react'
import FitToView from './FitToView'
import styles from './Canvas.module.css'

// The book never displays wider than this (px), however large the window is.
const BOOK_MAX_WIDTH = 1600

// View-only surface: shows its children, never edits them.
export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className={styles.canvas}>
      <FitToView maxWidth={BOOK_MAX_WIDTH}>{children}</FitToView>
    </div>
  )
}
