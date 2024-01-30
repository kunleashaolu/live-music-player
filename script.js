import { data } from './data.js'

const audioElement = document.getElementById('audio_element')
const coverImage = document.getElementById('cover_img')
const songTitle = document.getElementById('song_title')
const songArtist = document.getElementById('song_artist')
const overlay = document.getElementById('overlay')
const canvas = document.getElementById('oscilloscope')
const canvasContext = canvas.getContext('2d')

let audioContext
let analyser
let dataArray
let bufferLength
let trackNum = 0

function initAudio() {
  audioContext = new AudioContext()
  analyser = audioContext.createAnalyser()

  const source = audioContext.createMediaElementSource(audioElement)

  analyser.fftSize = 2 ** 12

  bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)

  console.log(bufferLength)

  source.connect(analyser)
  analyser.connect(audioContext.destination)
}

initAudio()

function draw() {
  requestAnimationFrame(draw)
  analyser.getByteTimeDomainData(dataArray)

  canvasContext.clearRect(0, 0, canvas.width, canvas.height)

  canvasContext.fillStyle = '#0d0f12'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)

  canvasContext.lineWidth = 2
  canvasContext.strokeStyle = '#ffffff'

  canvasContext.beginPath()

  const sliceWidth = (canvas.width * 1.0) / bufferLength
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0
    const y = v * (canvas.height / 2)

    if (i === 0) {
      canvasContext.moveTo(x, y)
    } else {
      canvasContext.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasContext.lineTo(canvas.width, canvas.height / 2)
  canvasContext.stroke()
}

draw()

function nextTrack() {
  if (trackNum < data.length) trackNum += 1

  const track = data[trackNum]
  coverImage.src = track.cover
  songArtist.innerText = track.artist
  songTitle.innerText = track.title
  audioElement.src = track.song
  audioElement.setAttribute('autoplay', true)
}

function mousePressed() {
  if (audioElement.paused) {
    audioContext.resume()
    audioElement.play()
  } else {
    audioContext.suspend()
    audioElement.pause()
  }
}

overlay.addEventListener('click', () => mousePressed())
overlay.addEventListener('dblclick', () => nextTrack())
audioElement.addEventListener('ended', () => nextTrack())
