import { useState, useEffect } from 'react'

const AudioController = () => {
  const [audioEnabled, setAudioEnabled] = useState(false)

  const playSound = (type) => {
    if (!audioEnabled) return
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case 'keypress':
        oscillator.frequency.value = 800
        gainNode.gain.value = 0.1
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.05)
        break
      case 'notification':
        oscillator.frequency.value = 1200
        gainNode.gain.value = 0.2
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.1)
        break
      case 'error':
        oscillator.frequency.value = 400
        gainNode.gain.value = 0.15
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.2)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.playSystemSound = playSound
    return () => {
      delete window.playSystemSound
    }
  }, [audioEnabled])

  return (
    <button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className="fixed bottom-4 right-4 z-50 p-3 bg-cyber-dark/80 border border-cyber-cyan/30 rounded-lg hover:bg-cyber-cyan/10 transition-colors"
      title={audioEnabled ? 'Audio ON' : 'Audio OFF'}
    >
      {audioEnabled ? (
        <svg className="w-5 h-5 text-cyber-cyan" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}

export default AudioController
