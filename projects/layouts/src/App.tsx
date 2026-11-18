import { useEffect, useState } from 'react'
import Book from './book/Book'
import Canvas from './canvas/Canvas'
import LayoutOverview from './overview/LayoutOverview'
import OverviewToggle from './overview/OverviewToggle'
import Sidebar from './sidebar/Sidebar'
import { useCssVariables } from './variables/useCssVariables'

export default function App() {
  useCssVariables()
  const [overviewOpen, setOverviewOpen] = useState(false)

  // Escape closes the overview.
  useEffect(() => {
    if (!overviewOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOverviewOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overviewOpen])

  return (
    <main className="app">
      <Canvas>
        <Book />
      </Canvas>
      {overviewOpen && <LayoutOverview />}
      <OverviewToggle open={overviewOpen} onToggle={() => setOverviewOpen((o) => !o)} />
      <Sidebar />
    </main>
  )
}
