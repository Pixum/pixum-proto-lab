import { useState } from 'react'
import DuplicatesScreen3, { groups as dupGroups } from './DuplicatesScreen3'
import LowQualityScreen3, { photos as lqPhotos } from './LowQualityScreen3'
import FilteredScreen3, { photos as filtPhotos } from './FilteredScreen3'
import FinalOverviewScreen3 from './FinalOverviewScreen3'

const toggleSet = (prev, key) => {
  const next = new Set(prev)
  next.has(key) ? next.delete(key) : next.add(key)
  return next
}

function initDupExcluded() {
  const set = new Set()
  dupGroups.forEach((group, gi) =>
    group.photos.forEach((photo, pi) => { if (photo.excluded) set.add(`${gi}-${pi}`) })
  )
  return set
}

export default function OverviewScreen3({ onBack, onNext, onPreview }) {
  const [step, setStep] = useState(1)
  const [dupExcluded, setDupExcluded] = useState(initDupExcluded)
  const [lqExcluded, setLqExcluded] = useState(() => new Set(lqPhotos.map((_, i) => i)))
  const [filtExcluded, setFiltExcluded] = useState(() => new Set(filtPhotos.map((_, i) => i)))

  if (step === 1) {
    return (
      <DuplicatesScreen3
        onBack={onBack}
        onNext={() => setStep(2)}
        excluded={dupExcluded}
        onToggle={(gi, pi) => setDupExcluded(prev => toggleSet(prev, `${gi}-${pi}`))}
        onPreview={onPreview}
      />
    )
  }

  if (step === 2) {
    return (
      <LowQualityScreen3
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
        excluded={lqExcluded}
        onToggle={(i) => setLqExcluded(prev => toggleSet(prev, i))}
        onPreview={onPreview}
      />
    )
  }

  if (step === 3) {
    return (
      <FilteredScreen3
        onBack={() => setStep(2)}
        onNext={() => setStep(4)}
        excluded={filtExcluded}
        onToggle={(i) => setFiltExcluded(prev => toggleSet(prev, i))}
        onPreview={onPreview}
      />
    )
  }

  return (
    <FinalOverviewScreen3
      onBack={() => setStep(3)}
      onNext={onNext}
      onPreview={onPreview}
    />
  )
}
