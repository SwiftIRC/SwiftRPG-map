import './style.css'

import { GameCanvas } from './GameCanvas'

import axios from 'axios'
import { Tile } from './types'

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

async function main(): Promise<void> {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!
  appContainer.innerHTML = `
  <h1>SwiftRPG Map</h1>
  <a href="https://rpg.swiftirc.net/" target="_blank">Home</a>
  <a href="https://rpg.swiftirc.net/hiscores" target="_blank">HiScores</a>
`

  const tileDataRequest = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/tiles`)
  const tileData = tileDataRequest.data as Tile[]

  const app = new App(appContainer, document, tileData)
  app.canvas.draw()
}

main();