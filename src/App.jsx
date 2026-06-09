import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import IntroductionScreen from './screens/IntroductionScreen'
import PhotoPickerScreen from './screens/PhotoPickerScreen'
import AlbumScreen from './screens/AlbumScreen'
import FullscreenPreview from './screens/FullscreenPreview'
import LoadingScreen from './screens/LoadingScreen'
import OverviewScreen from './screens/OverviewScreen'
import OverviewScreen2 from './screens/OverviewScreen2'
import OverviewScreen3 from './screens/OverviewScreen3'
import DuplicatesScreen, { groups } from './screens/DuplicatesScreen'
import LowQualityScreen, { photos as lowQualityPhotos } from './screens/LowQualityScreen'
import FilteredScreen, { photos as filteredPhotos } from './screens/FilteredScreen'
import ChaptersScreen from './screens/ChaptersScreen'
import LayoutPresetScreen from './screens/LayoutPresetScreen'
import LayoutPresetScreen2 from './screens/LayoutPresetScreen2'
import LayoutPresetScreen3 from './screens/LayoutPresetScreen3'
import PageBuilderScreen from './screens/PageBuilderScreen'
import { fotosetImages } from './images'

const toggleSet = (prev, key) => {
  const next = new Set(prev)
  next.has(key) ? next.delete(key) : next.add(key)
  return next
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [prototypeId, setPrototypeId] = useState(1)
  const [loadingTarget, setLoadingTarget] = useState('overview')
  const [loadingDuration, setLoadingDuration] = useState(4000)
  const [activeAlbum, setActiveAlbum] = useState(null)
  const [previewState, setPreviewState] = useState(null) // { images, index }

  const [duplicatesExcluded, setDuplicatesExcluded] = useState(() => {
    const set = new Set()
    groups.forEach((group, gi) =>
      group.photos.forEach((photo, pi) => { if (photo.excluded) set.add(`${gi}-${pi}`) })
    )
    return set
  })
  const [filteredExcluded, setFilteredExcluded] = useState(() => new Set(filteredPhotos.map((_, i) => i)))
  const [lowQualityExcluded, setLowQualityExcluded] = useState(() => new Set(lowQualityPhotos.map((_, i) => i)))

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen onStartPrototype={(id) => { setPrototypeId(id); setScreen('intro'); }} />
      )}
      {screen === 'intro' && (
        <IntroductionScreen onBack={() => setScreen('home')} onComplete={() => setScreen('photopicker')} />
      )}
      {screen === 'photopicker' && (
        <PhotoPickerScreen
          onBack={() => setScreen('intro')}
          onOpenAlbum={(album) => { setActiveAlbum(album); setScreen('album') }}
        />
      )}
      {(screen === 'album' || (screen === 'fullscreen' && previewState?.origin === 'album')) && activeAlbum && (
        <div style={{ display: screen === 'album' ? '' : 'none' }}>
          <AlbumScreen
            album={activeAlbum}
            onBack={() => setScreen('photopicker')}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'album' }); setScreen('fullscreen') }}
            onNext={() => { setLoadingTarget('overview'); setScreen('loading'); }}
          />
        </div>
      )}
      {screen === 'loading' && <LoadingScreen onComplete={() => setScreen(loadingTarget)} duration={loadingDuration} />}
      {screen === 'overview' && prototypeId === 1 && (
        <OverviewScreen
          onBack={() => setScreen('album')}
          onDuplicates={() => setScreen('duplicates')}
          onLowQuality={() => setScreen('lowquality')}
          onFiltered={() => setScreen('filtered')}
          onNext={() => { setLoadingTarget('chapters'); setScreen('loading'); }}
        />
      )}
      {(screen === 'overview' || (screen === 'fullscreen' && previewState?.origin === 'overview')) && prototypeId === 2 && (
        <div style={{ display: screen === 'overview' ? '' : 'none' }}>
          <OverviewScreen2
            onBack={() => setScreen('album')}
            onNext={() => { setLoadingTarget('chapters'); setScreen('loading'); }}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'overview' }); setScreen('fullscreen') }}
          />
        </div>
      )}
      {(screen === 'overview' || screen === 'fullscreen') && prototypeId === 3 && (
        <div style={{ display: screen === 'overview' ? '' : 'none' }}>
          <OverviewScreen3
            onBack={() => setScreen('album')}
            onNext={() => { setLoadingTarget('chapters'); setScreen('loading'); }}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'overview' }); setScreen('fullscreen') }}
          />
        </div>
      )}
      {screen === 'chapters' && (
        <ChaptersScreen
          onBack={() => setScreen('overview')}
          onNext={() => setScreen('layout-preset')}
        />
      )}
      {screen === 'layout-preset' && prototypeId === 1 && (
        <LayoutPresetScreen
          onBack={() => setScreen('chapters')}
          onNext={() => { setLoadingTarget('page-builder'); setLoadingDuration(3000); setScreen('loading'); }}
        />
      )}
      {screen === 'layout-preset' && prototypeId === 2 && (
        <LayoutPresetScreen2
          onBack={() => setScreen('chapters')}
          onNext={() => { setLoadingTarget('page-builder'); setLoadingDuration(3000); setScreen('loading'); }}
        />
      )}
      {screen === 'layout-preset' && prototypeId === 3 && (
        <LayoutPresetScreen3
          onBack={() => setScreen('chapters')}
          onNext={() => { setLoadingTarget('page-builder'); setLoadingDuration(3000); setScreen('loading'); }}
        />
      )}
      {screen === 'page-builder' && (
        <PageBuilderScreen
          onBack={() => setScreen('layout-preset')}
          onHome={() => setScreen('home')}
          photos={activeAlbum?.images ?? fotosetImages}
        />
      )}
      {(screen === 'duplicates' || (screen === 'fullscreen' && previewState?.origin === 'duplicates')) && (
        <div style={{ display: screen === 'duplicates' ? '' : 'none' }}>
          <DuplicatesScreen
            onBack={() => setScreen('overview')}
            excluded={duplicatesExcluded}
            onToggle={(gi, pi) => setDuplicatesExcluded(prev => toggleSet(prev, `${gi}-${pi}`))}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'duplicates' }); setScreen('fullscreen') }}
          />
        </div>
      )}
      {(screen === 'lowquality' || (screen === 'fullscreen' && previewState?.origin === 'lowquality')) && (
        <div style={{ display: screen === 'lowquality' ? '' : 'none' }}>
          <LowQualityScreen
            onBack={() => setScreen('overview')}
            excluded={lowQualityExcluded}
            onToggle={(i) => setLowQualityExcluded(prev => toggleSet(prev, i))}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'lowquality' }); setScreen('fullscreen') }}
          />
        </div>
      )}
      {(screen === 'filtered' || (screen === 'fullscreen' && previewState?.origin === 'filtered')) && (
        <div style={{ display: screen === 'filtered' ? '' : 'none' }}>
          <FilteredScreen
            onBack={() => setScreen('overview')}
            excluded={filteredExcluded}
            onToggle={(i) => setFilteredExcluded(prev => toggleSet(prev, i))}
            onPreview={(idx, images) => { setPreviewState({ images, index: idx, origin: 'filtered' }); setScreen('fullscreen') }}
          />
        </div>
      )}
      {screen === 'fullscreen' && previewState && (
        <FullscreenPreview
          images={previewState.images}
          initialIndex={previewState.index}
          onClose={() => setScreen(previewState.origin)}
        />
      )}
    </div>
  )
}
