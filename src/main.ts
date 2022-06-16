import './style.css'

import { GameCanvas } from './GameCanvas'

import axios, { Axios } from 'axios'
import { Tile } from './types'

const appContainer = document.querySelector<HTMLDivElement>('#app')!
appContainer.innerHTML = `
  <h1>SwiftRPG Map</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

const tileDataRequest = await axios.get('http://127.0.0.1:8000/api/tiles')
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
