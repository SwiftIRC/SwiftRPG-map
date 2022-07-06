import './style.css'



import axios from 'axios'
import { TileAPIResponse } from './types'
import { CanvasManager } from './CanvasManager'


export class App {
  document: Document
  container: HTMLElement
  _canvas: HTMLCanvasElement
  _canvasManager: CanvasManager
  private constructor(container: HTMLElement, document: Document, tileData: TileAPIResponse[]) {
    this.container = container
    this.document = document
    this._canvas = document.createElement('canvas')
    this.container.appendChild(this._canvas)
    this._canvas.width = this.container.getBoundingClientRect().width;
    this._canvas.height = this.container.getBoundingClientRect().height;
    this._canvasManager = new CanvasManager(this._canvas, this._canvas.getContext('2d')!, "#8f7f67", tileData)
  }

  static async start(container: HTMLElement, document: Document): Promise<App> {
    const tileDataRequest = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/tiles`)
    const tileData = tileDataRequest.data as TileAPIResponse[]
    const app = new App(container, document, tileData)
    app._canvasManager.draw()
    return app
  }


}


async function main(): Promise<void> {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!
  await App.start(appContainer, document)
  console.log("App Loaded")

}

main();