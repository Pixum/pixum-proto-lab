import styles from './OverviewToggle.module.css'

// Button in the top-right corner of the canvas. Opens the layout overview;
// while the overview is open it becomes a "Back" button.
export default function OverviewToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={open ? 'Back to the book' : 'Open the layout overview'}
      onClick={onToggle}
    >
      {open && (
        <svg className={styles.arrow} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M11 6H1M5 2L1 6l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {open ? 'Back' : 'Check layoutgrids'}
    </button>
  )
}
