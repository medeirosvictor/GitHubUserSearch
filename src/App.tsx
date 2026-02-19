import { useState, type FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import GridScan from './components/GridScan'
import PillNav from './components/PillNav'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

const App: FC = () => {
  const [bgEnabled, setBgEnabled] = useState(true)

  return (
    <div className='app bg-gray-20 font-bold flex flex-col'>
        {bgEnabled && (
            <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <GridScan
                    sensitivity={0.55}
                    lineThickness={1}
                    linesColor="#24292f"
                    gridScale={0.1}
                    scanColor="#8b5cf6"
                    scanOpacity={0.3}
                    enablePost
                    bloomIntensity={0.4}
                    chromaticAberration={0.001}
                    noiseIntensity={0.005}
                    scanDuration={4}
                    scanDelay={3}
                    scanGlow={0.4}
                    scanSoftness={2.5}
                    scanPhaseTaper={0.9}
                />
            </div>
        )}

        <div className='relative z-10 flex flex-col flex-1'>
            <div className='flex justify-center pt-3'>
                <PillNav
                    items={['Background ON', 'Background OFF']}
                    activeIndex={bgEnabled ? 0 : 1}
                    onChange={(i) => setBgEnabled(i === 0)}
                />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:username" element={<UserProfile />} />
            </Routes>
        </div>
    </div>
  )
}

export default App
