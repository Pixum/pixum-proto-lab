// Small inline icons for the text style control (no icon library in the project).
import type { ReactNode } from 'react'

const A = 'M5.5 11L8 5l2.5 6M6.3 9.2h3.4' // the letter "A", shared by two icons

function Icon({ d }: { d: string }): ReactNode {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const LineHeightIcon = () => <Icon d={`M3 2.5h10M3 13.5h10${A}`} />
export const LetterSpacingIcon = () => <Icon d={`M2.5 3v10M13.5 3v10${A}`} />
export const AlignLeftIcon = () => <Icon d="M2 3.5h12M2 6.5h7M2 9.5h12M2 12.5h7" />
export const AlignCenterIcon = () => <Icon d="M2 3.5h12M4.5 6.5h7M2 9.5h12M4.5 12.5h7" />
export const AlignRightIcon = () => <Icon d="M2 3.5h12M7 6.5h7M2 9.5h12M7 12.5h7" />
export const AlignTopIcon = () => <Icon d="M2.5 2.5h11M6 6h4v7.5H6z" />
export const AlignMiddleIcon = () => <Icon d="M2.5 8h11M6 3.5h4v9H6z" />
export const AlignBottomIcon = () => <Icon d="M2.5 13.5h11M6 2.5h4V10H6z" />
