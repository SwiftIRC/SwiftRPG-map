import './style.css'

import { GameCanvas } from './GameCanvas'

import axios, { Axios } from 'axios'
import { Tile } from './types'

const appContainer = document.querySelector<HTMLDivElement>('#app')!
appContainer.innerHTML = `
  <h1>SwiftRPG Map</h1>
  <a href="https://rpg.swiftirc.net/" target="_blank">Home</a>
  <a href="https://rpg.swiftirc.net/hiscores" target="_blank">HiScores</a>
`

const tileDataRequest = await axios.get('http://localhost:8000/api/tiles')
const tileData = tileDataRequest.data as Tile[]

export class App {
  canvas: GameCanvas
  document: Document
  container: HTMLElement
  constructor(container: HTMLElement, document: Document, Tiles: Tile[]) {
    this.container = container
    this.document = document
    this.canvas = new GameCanvas(this, Tiles)
  }
}

const app = new App(appContainer, document, tileData)
app.canvas.draw()
