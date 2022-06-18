import { InputManager } from "./InputManager";
import { Tile } from "./Tile";
import { Coordinate, GridOptions, TileAPIResponse } from "./types";

export class CanvasManager {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _background: string;
  private _inputManager: InputManager;
  private _tiles: Tile[] = [];
  public gridOptions: GridOptions = {
    tileSize: 100,
    borderSize: 10,
    center: {x: 0 , y:0}
  };
  private _frameRate: number = 60;
  private _lastFrameTime: number = performance.now() - 1000;
  public _isplaying: boolean = true;
  public cameraZoom = 1;
  public cameraPan: Coordinate = { x: 0, y: 0 };

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    background: string,
    tileData: TileAPIResponse[]
  ) {
    this._canvas = canvas;
    this._ctx = ctx;
    this._background = background;
    this.gridOptions.center = this.centerPoint
    tileData.forEach((tile) => {
      this._tiles.push(
        new Tile(
          this._ctx,
          tile.discovered_by,
          tile.x,
          tile.y,
          tile.max_trees,
          tile.available_trees,
          tile.npcs,
          tile.buildings,
          {
            direction: tile.edges[0].pivot.direction,
            is_road: tile.edges[0].pivot.is_road,
            name: tile.edges[0].name,
          },
          {
            direction: tile.edges[1].pivot.direction,
            is_road: tile.edges[1].pivot.is_road,
            name: tile.edges[1].name,
          },
          {
            direction: tile.edges[2].pivot.direction,
            is_road: tile.edges[2].pivot.is_road,
            name: tile.edges[2].name,
          },
          {
            direction: tile.edges[3].pivot.direction,
            is_road: tile.edges[3].pivot.is_road,
            name: tile.edges[3].name,
          },
          this.gridOptions
        )
      );
    });
    this._inputManager = new InputManager(this);
  }

  draw(deltaTime: number = 0): void {
    this._ctx.resetTransform();
    this._ctx.scale(this.cameraZoom, this.cameraZoom)
    const newDeltaTime = performance.now() - this._lastFrameTime;
    if (this._isplaying && deltaTime >= 1000 / this._frameRate) {
      this._lastFrameTime = performance.now();
      console.log("I Am Drawing");
      this.clear();
      this.drawBackground();
      this._tiles.forEach((tile) => {
        tile.draw();
      })
      this._drawCenterPoint(5, "purple");
      this.drawFPS(1000 / newDeltaTime);
    }
    window.requestAnimationFrame(() => this.draw(newDeltaTime));
  }

  get centerPoint(): Coordinate {
    return {
      x: this._canvas.width / 2,
      y: this._canvas.height / 2,
    };
  }

  // Draw a dot on the center of the canvas
  private _drawCenterPoint(size: number, color: string): void {
    this._ctx.fillStyle = color;
    this._ctx.arc(this.centerPoint.x, this.centerPoint.y, size / 2, 0, 2 * Math.PI);
    this._ctx.fill();
  }

  clear(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  drawFPS(fps: number): void {
    this._ctx.font = "8px Arial";
    this._ctx.fillStyle = "purple";
    this._ctx.fillText(`FPS: ${Math.round(fps)}`, 10, 10);
  }

  drawBackground(): void {
     this._ctx.fillStyle = this._background;
     this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}
