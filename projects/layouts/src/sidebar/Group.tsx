import { useState, type ReactNode } from 'react'
import styles from './Sidebar.module.css'

// Collapsible group of controls.
export default function Group({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <section className={styles.group}>
      <button
        type="button"
        className={styles.groupHeader}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.chevron} data-open={open}>
          ›
        </span>
        {title}
      </button>
      {open && <div className={styles.groupBody}>{children}</div>}
    </section>
  )
}
