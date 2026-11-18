import { useEffect } from 'react'
import Lottie from 'lottie-react'
import loadingJson from '../../rsc/loading-animation.json'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete, duration = 4000 }) {
  useEffect(() => {
    const id = setTimeout(onComplete, duration)
    return () => clearTimeout(id)
  }, [onComplete, duration])

  return (
    <div className="loading-screen">
      <Lottie className="loading-animation" animationData={loadingJson} loop />
      <p className="loading-text">Fotos werden gescannt</p>
    </div>
  )
}
