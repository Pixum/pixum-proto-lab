import { useEffect, useState } from 'react'
import Book from './book/Book'
import Canvas from './canvas/Canvas'
import LayoutOverview from './overview/LayoutOverview'
import OverviewToggle from './overview/OverviewToggle'
import Sidebar from './sidebar/Sidebar'
import { useCssVariables } from './variables/useCssVariables'

// Publishes the variables as CSS properties. Its own component, so a slider change re-renders only this
// (it renders nothing) and not the whole app.
function CssVariables() {
  useCssVariables()
  return null
}

export default function App() {
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
      <CssVariables />
      <Canvas>
        <Book />
      </Canvas>
      {overviewOpen && <LayoutOverview />}
      <OverviewToggle open={overviewOpen} onToggle={() => setOverviewOpen((o) => !o)} />
      <Sidebar />
    </main>
  )
}
