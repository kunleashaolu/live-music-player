import { data } from './data.js'

const audioElement = document.getElementById('audio_element')
const coverImage = document.getElementById('cover_img')
const songTitle = document.getElementById('song_title')
const songArtist = document.getElementById('song_artist')
const overlay = document.getElementById('overlay')

let trackNum = 0

function nextTrack() {
  if (trackNum < data.length) trackNum += 1

  const track = data[trackNum]

  coverImage.src = track.cover
  songArtist.innerText = track.artist
  songTitle.innerText = track.title
  audioElement.src = track.song
  audioElement.setAttribute('autoplay', true)

  console.log(trackNum)
}

overlay.addEventListener('click', () => {
  audioElement.paused ? audioElement.play() : audioElement.pause()
})

overlay.addEventListener('dblclick', () => console.log('double clicked'))

audioElement.addEventListener('ended', () => nextTrack())

// const audioContext = new AudioContext()
// const analyser = audioContext.createAnalyser()
// const source = audioContext.createMediaElementSource(audioElement)

// analyser.fftSize = 2048

// const bufferLength = analyser.frequencyBinCount
// const dataArray = new Uint8Array(bufferLength)

// source.connect(analyser)
// analyser.connect(audioContext.destination)

// console.log(bufferLength)
// console.log(dataArray)

// const canvas = document.getElementById('oscilloscope')
// const canvasContext = canvas.getContext('2d')

// function draw() {
//   requestAnimationFrame(draw)

//   analyser.getByteTimeDomainData(dataArray)

//   canvasContext.fillStyle = '#0d0f12'
//   canvasContext.fillRect(0, 0, canvas.width, canvas.height)

//   canvasContext.lineWidth = 2
//   canvasContext.strokeStyle = '#ffffff'

//   canvasContext.beginPath()

//   const sliceWidth = (canvas.width * 1.0) / bufferLength
//   let x = 0

//   for (let i = 0; i < bufferLength; i++) {
//     const v = dataArray[i] / 128.0
//     const y = (v * canvas.height) / 2

//     console.log(v)
//     console.log(y)

//     if (i === 0) {
//       canvasContext.moveTo(x, y)
//     } else {
//       canvasContext.lineTo(x, y)
//     }

//     x += sliceWidth
//   }

//   canvasContext.lineTo(canvas.width, canvas.height / 2)
//   canvasContext.stroke()
// }

// draw()
