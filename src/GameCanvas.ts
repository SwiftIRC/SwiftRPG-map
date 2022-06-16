import { GridManager } from './GridManager'
import { App } from './main'
import { MappedTile, Tile, Tree } from './types'

export class GameCanvas {
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  background: string
  gridManager: GridManager

  constructor(App: App, tiles: Tile[]) {
    this.element = App.document.createElement('canvas')
    App.container.appendChild(this.element)
    this.element.width = App.container.getBoundingClientRect().width
    this.element.height = App.container.getBoundingClientRect().height
    this.background = "#8f7f67"
    this.ctx = this.element.getContext('2d')!
    this.gridManager = new GridManager(this.center, 250, 20)
    this.gridManager.setTiles(tiles)
    this.draw()
  }

  get width() {
    return this.element.getBoundingClientRect().width
  }

  get height() {
    return this.element.getBoundingClientRect().height
  }

  get center() {
    return {
      x: this.width / 2,
      y: this.height / 2
    }
  }

  draw(): void {
    this.ctx.fillStyle = this.background
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.gridManager.tileGrid.forEach(tile => {
      this.drawTile(tile)
    })

    // Mark the center for debugging
    this.ctx.fillStyle = "#ff0000"
    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, 5, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  drawTile(tile: MappedTile): void {
    this.ctx.fillStyle = "#8ab06d"
    this.ctx.fillRect(tile.x, tile.y, this.gridManager.tileSize, this.gridManager.tileSize)
    this.drawRoad(tile)
    const treeMap = this.generateTreeMap(tile, tile.tile.max_trees, (tile.tile.max_trees - tile.tile.available_trees))
    treeMap.forEach(tree => {
      this.drawTree(tree)
    })
    
  }

  generateTreeMap(tile: MappedTile, trees: number, cut: number): Tree[] {
    const treeMap: Tree[] = []
    for (let i = 0; i < trees; i++) {
      treeMap.push({
        x: Math.floor(Math.random() * this.gridManager.tileSize) + tile.x,
        y: Math.floor(Math.random() * this.gridManager.tileSize) + tile.y,
        is_cut: false
      })
    }
    for (let i = 0; i < cut; i++) {
      const tree = treeMap[Math.floor(Math.random() * treeMap.length)]
      tree.is_cut = true
    }
    return treeMap
  }

  drawTree(tree: Tree): void {
    this.ctx.fillStyle = "#3d2f1b"
    this.ctx.fillRect(tree.x - ((this.gridManager.tileSize / 40) / 2), tree.y, this.gridManager.tileSize / 40, this.gridManager.tileSize / 25)
    this.ctx.fillStyle = "#1b3d20"
    if (!tree.is_cut) {
      this.ctx.beginPath()
      this.ctx.moveTo(tree.x - 10, tree.y)
      this.ctx.lineTo(tree.x + 10, tree.y)
      this.ctx.lineTo(tree.x, tree.y - 10)
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(tree.x - 10, tree.y - 5)
      this.ctx.lineTo(tree.x + 10, tree.y - 5)
      this.ctx.lineTo(tree.x, tree.y - 20)
      this.ctx.fill()
    }
  }

  drawRoad(tile: MappedTile): void {
    this.ctx.strokeStyle = "#000000"
    this.ctx.lineWidth = 20
    tile.tile.edges.forEach(edge => {
      if (edge.pivot.is_road) {
        if (edge.pivot.direction === 'north') {
          this.ctx.beginPath()
          this.ctx.moveTo(tile.x + (this.gridManager.tileSize / 2), tile.y)
          this.ctx.lineTo(tile.x + (this.gridManager.tileSize / 2), tile.y + (this.gridManager.tileSize / 4))
          this.ctx.stroke()
        } else if (edge.pivot.direction === 'east') {
          this.ctx.beginPath()
          this.ctx.moveTo(tile.x + this.gridManager.tileSize, tile.y + (this.gridManager.tileSize / 2))
          this.ctx.lineTo(tile.x + this.gridManager.tileSize - (this.gridManager.tileSize / 4), tile.y + (this.gridManager.tileSize / 2))
          this.ctx.stroke()
        } else if (edge.pivot.direction === 'south') {
          this.ctx.beginPath()
          this.ctx.moveTo(tile.x + (this.gridManager.tileSize / 2), tile.y + this.gridManager.tileSize)
          this.ctx.lineTo(tile.x + (this.gridManager.tileSize / 2), tile.y + this.gridManager.tileSize - (this.gridManager.tileSize / 4))
          this.ctx.stroke()
        } else if (edge.pivot.direction === 'west') {
          this.ctx.beginPath()
          this.ctx.moveTo(tile.x, tile.y + (this.gridManager.tileSize / 2))
          this.ctx.lineTo(tile.x + (this.gridManager.tileSize / 4), tile.y + (this.gridManager.tileSize / 2))
          this.ctx.stroke()
        }
      }
    })
  }

}