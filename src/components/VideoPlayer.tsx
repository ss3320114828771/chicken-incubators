'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, 
  FiMaximize, FiMinimize, FiSettings, FiDownload,
  FiShare2, FiHeart, FiBookmark, FiAlertCircle
} from 'react-icons/fi'
import { BsSpeedometer2 } from 'react-icons/bs'
import { MdSubtitles, MdPictureInPicture } from 'react-icons/md'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  onEnded?: () => void
  onTimeUpdate?: (time: number) => void
  onPlay?: () => void
  onPause?: () => void
}

export default function VideoPlayer({
  src,
  poster,
  title = "Nutritional Benefits Video",
  autoplay = false,
  loop = false,
  muted = false,
  onEnded,
  onTimeUpdate,
  onPlay,
  onPause,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState('Auto')
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  // Video qualities (simulated)
  const qualities = ['Auto', '1080p', '720p', '480p', '360p']
  
  // Playback speeds
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  // Effects
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
      if (onTimeUpdate) onTimeUpdate(video.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      if (onPlay) onPlay()
    }

    const handlePause = () => {
      setIsPlaying(false)
      if (onPause) onPause()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        setBuffered((bufferedEnd / video.duration) * 100)
      }
    }

    const handleError = () => {
      setError('Error loading video')
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('progress', handleProgress)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('error', handleError)
    }
  }, [onEnded, onTimeUpdate, onPlay, onPause])

  // Auto hide controls
  useEffect(() => {
    if (isPlaying && !showSettings) {
      const timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      setControlsTimeout(timeout)
    } else {
      if (controlsTimeout) clearTimeout(controlsTimeout)
    }
  }, [isPlaying, showControls, showSettings])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Controls
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (!videoRef.current) return
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * videoRef.current.duration
    videoRef.current.currentTime = newTime
    setProgress(pos * 100)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const handleQualityChange = (q: string) => {
    setQuality(q)
    setShowSettings(false)
    // In a real app, you would change the video source here
  }

  const handlePictureInPicture = async () => {
    if (!videoRef.current) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error)
    }
  }

  const handleDownload = () => {
    // Create a temporary anchor element
    const a = document.createElement('a')
    a.href = src
    a.download = `video-${Date.now()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Check out this video about nutritional benefits!',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Share error:', error)
      }
    } else {
      // Fallback - show share menu
      setShowShareMenu(!showShareMenu)
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (error) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-black/50 backdrop-blur-lg p-8 text-center">
        <FiAlertCircle className="text-4xl text-red-500 mx-auto mb-4" />
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative group rounded-xl overflow-hidden bg-black glow-border"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      {/* Buffered Progress */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white/40 transition-all duration-100"
          style={{ width: `${buffered}%` }}
        />
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg truncate max-w-[70%]">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked ? 'text-red-500' : 'text-white hover:text-red-500'
              }`}
            >
              <FiHeart className="text-xl" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isSaved ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
              }`}
            >
              <FiBookmark className="text-xl" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-white hover:text-purple-400 transition-all duration-300"
            >
              <FiShare2 className="text-xl" />
            </button>
          </div>
        </div>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-16 right-4 p-4 rounded-xl bg-black/90 backdrop-blur-lg border border-white/10 z-50">
            <p className="text-white font-bold mb-2">Share via</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white">f</button>
              <button className="w-10 h-10 rounded-full bg-sky-500 text-white">X</button>
              <button className="w-10 h-10 rounded-full bg-green-500 text-white">W</button>
              <button className="w-10 h-10 rounded-full bg-red-600 text-white">P</button>
            </div>
          </div>
        )}

        {/* Center Play Button */}
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl"
        >
          {isPlaying ? (
            <FiPause className="text-3xl text-white" />
          ) : (
            <FiPlay className="text-3xl text-white ml-1" />
          )}
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="relative h-2 bg-white/30 rounded-full mb-4 cursor-pointer group/progress"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                {isPlaying ? <FiPause className="text-2xl" /> : <FiPlay className="text-2xl" />}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  {isMuted || volume === 0 ? (
                    <FiVolumeX className="text-2xl" />
                  ) : (
                    <FiVolume2 className="text-2xl" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-yellow-400 opacity-0 group-hover/volume:opacity-100 transition-opacity"
                />
              </div>

              {/* Time */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-full text-white hover:text-yellow-400 transition-all duration-300"
                >
                  <FiSettings className="text-xl" />
                </button>

                {/* Settings Menu */}
                {showSettings && (
                  <div className="absolute bottom-12 right-0 p-4 rounded-xl bg-black/90 backdrop-blur-lg border border-white/10 min-w-[200px] z-50">
                    <p className="text-white font-bold mb-3">Playback Speed</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {speeds.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handlePlaybackRateChange(speed)}
                          className={`px-2 py-1 rounded text-sm transition-all duration-300 ${
                            playbackRate === speed
                              ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    <p className="text-white font-bold mb-3">Quality</p>
                    <div className="grid grid-cols-2 gap-2">
                      {qualities.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleQualityChange(q)}
                          className={`px-2 py-1 rounded text-sm transition-all duration-300 ${
                            quality === q
                              ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Subtitles */}
              <button className="p-2 rounded-full text-white hover:text-yellow-400 transition-all duration-300">
                <MdSubtitles className="text-xl" />
              </button>

              {/* Picture in Picture */}
              <button
                onClick={handlePictureInPicture}
                className="p-2 rounded-full text-white hover:text-yellow-400 transition-all duration-300"
              >
                <MdPictureInPicture className="text-xl" />
              </button>

              {/* Download */}
              <button
                onClick={handleDownload}
                className="p-2 rounded-full text-white hover:text-yellow-400 transition-all duration-300"
              >
                <FiDownload className="text-xl" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full text-white hover:text-yellow-400 transition-all duration-300"
              >
                {isFullscreen ? <FiMinimize className="text-xl" /> : <FiMaximize className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}