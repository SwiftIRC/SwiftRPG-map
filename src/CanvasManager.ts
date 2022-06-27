import { InputManager } from "./InputManager";
import { Tile } from "./Tile";
import {
  Coordinate,
  GridOptions,
  TileAPIResponse,
  TileEdge,
  TileEdgeDirection,
  TileEdgeDirectionMap,
} from "./types";

export class CanvasManager {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _background: string;
  private _inputManager: InputManager;
  private _tiles: Tile[] = [];
  public gridOptions: GridOptions = {
    tileSize: 100,
    borderSize: 10,
  };
  private _frameRate: number = 60;
  private _lastFrameTime: number = performance.now() - 1000;
  public _isplaying: boolean = true;
  public _frameCount: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    background: string,

    tileData: TileAPIResponse[]
  ) {
    this._canvas = canvas;
    this._ctx = ctx;
    this._background = background;
    tileData.forEach((tile) => {
      const tileEdgeMap = new Map<TileEdgeDirection, TileEdge>();
      tile.edges.forEach((edge) => {
        tileEdgeMap.set(edge.pivot.direction, {
          name: edge.name,
          is_road: edge.pivot.is_road,
          direction: edge.pivot.direction,
          _roadCoord: TileEdgeDirectionMap[edge.pivot.direction],
        });
      });
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
          tileEdgeMap.get("north") as TileEdge,
          tileEdgeMap.get("east") as TileEdge,
          tileEdgeMap.get("south") as TileEdge,
          tileEdgeMap.get("west") as TileEdge,
          tile.terrain,
          this.gridOptions
        )
      );
    });

    //this.cameraPan = this.centerPoint;
    this._inputManager = new InputManager(this.centerPoint);
    this._canvas.addEventListener("wheel", (e: WheelEvent) =>
      this._inputManager.onWheel(e)
    );
    this._canvas.addEventListener("mousemove", (e: MouseEvent) =>
      this._inputManager.onMouseMove(e)
    );
    this._canvas.addEventListener("mousedown", (e: MouseEvent) =>
      this._inputManager.onMouseDown(e)
    );
    this._canvas.addEventListener("mouseup", (e: MouseEvent) =>
      this._inputManager.onMouseUp(e)
    );
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      this._inputManager.onKeyDown(e),
      true
    );
  }

  draw(deltaTime: number = 0): void {
    const newDeltaTime = performance.now() - this._lastFrameTime;
    if (this._isplaying && deltaTime >= 1000 / this._frameRate) {
      this.clear();
      this._ctx.translate(this.cameraPan().x, this.cameraPan().y);
      this._ctx.scale(this._inputManager.scale, this._inputManager.scale);
      this._lastFrameTime = performance.now();
      this._tiles.forEach((tile) => {
        tile.draw();
        tile.drawRoads();
      });
      this._tiles.forEach((tile) => {
        tile.drawTrees();
      });
      //this.drawFPS(1000 / newDeltaTime);
      this._frameCount++;
    }
    window.requestAnimationFrame(() => this.draw(newDeltaTime));
  }

  get centerPoint(): Coordinate {
    const coord = {
      x: this._canvas.width / 2,
      y: this._canvas.height / 2,
    };
    return coord;
  }

  // Draw a dot on the center of the canvas
  private _drawCenterPoint(size: number, color: string): void {
    this._ctx.fillStyle = color;
    this._ctx.fillRect(this.centerPoint.x, this.centerPoint.y, size, size);
    this._ctx.fill();
  }

  clear(): void {
    this._ctx.resetTransform();
    this.drawBackground();
    this._ctx.resetTransform();
  }

  drawFPS(fps: number): void {
    this._ctx.resetTransform();
    this._ctx.font = "8px Arial";
    this._ctx.fillStyle = "purple";
    this._ctx.fillText(`FPS: ${Math.round(fps)}`, 10, 10);
    this._ctx.restore();
  }

  private _drawDebug(): void {
    this._ctx.strokeStyle = "purple";
    this._ctx.strokeRect(0, 0, this._canvas.width, this._canvas.height);
  }

  drawBackground(): void {
    this._ctx.fillStyle = this._background;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  private cameraPan(): Coordinate {
    const mappedX = this._inputManager.offset.x - this._canvas.width / 2;
    const mappedY = this._inputManager.offset.y - this._canvas.height / 2;
    return {
      x: this.centerPoint.x + mappedX,
      y: this.centerPoint.y + mappedY,
    };
  }
}
