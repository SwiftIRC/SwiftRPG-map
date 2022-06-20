import { SVGTree } from "./SVG";
import { Coordinate, GridOptions, TileEdge, Tree } from "./types";

export class Tile {
  private _ctx: CanvasRenderingContext2D;
  public discovered_by: string;
  public x: number;
  public y: number;
  private _max_trees: number;
  private _available_trees: number;
  public readonly treeMap: Tree[];
  public readonly npcs: number;
  public readonly _buildings: number;
  public readonly north: TileEdge;
  public readonly east: TileEdge;
  public readonly south: TileEdge;
  public readonly west: TileEdge;
  private _gridOptions: GridOptions;

  constructor(
    ctx: CanvasRenderingContext2D,
    discovered_by: string,
    x: number,
    y: number,
    max_trees: number,
    available_trees: number,
    npcs: number,
    buildings: number,
    north: TileEdge,
    east: TileEdge,
    south: TileEdge,
    west: TileEdge,
    gridOptions: GridOptions
  ) {
    this._ctx = ctx;
    this.discovered_by = discovered_by;
    this.x = x;
    this.y = y;
    this._max_trees = max_trees;
    this._available_trees = available_trees;
    this.npcs = npcs;
    this._buildings = buildings;
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
    this._gridOptions = gridOptions;
    this.treeMap = this._gerateTreeMap();
  }

  private _gerateTreeMap(): Tree[] {
    const treeMap: Tree[] = [];
    for (let i = 0; i < this._max_trees; i++) {
      treeMap.push({
        x: Math.floor(Math.random() * this._gridOptions.tileSize),
        y: Math.floor(Math.random() * this._gridOptions.tileSize),
        is_cut: false,
      });
    }
    for (let i = 0; i < this._available_trees; i++) {
      treeMap[i].is_cut = true;
    }
    return treeMap;
  }

  public draw(): void {
    this._ctx.fillStyle = "#72ad51";
    this._ctx.fillRect(
      this._getMappedPosition().x,
      this._getMappedPosition().y,
      this._gridOptions.tileSize,
      this._gridOptions.tileSize
    );
    this._drawTrees();
  }

  private _getMappedPosition(): Coordinate {
    return {
      x:
        this.x * this._gridOptions.tileSize -
        this._gridOptions.tileSize / 2 +
        (this._gridOptions.borderSize * this.x) / 2,
      y:
        this.y * this._gridOptions.tileSize -
        this._gridOptions.tileSize / 2 +
        (this._gridOptions.borderSize * this.y) / 2,
    };
  }

  private _drawTrees(): void {
    this.treeMap.forEach((tree) => {
      this._ctx.save();
      this._ctx.translate(
        this._getMappedPosition().x + tree.x + SVGTree.top.offset.x,
        this._getMappedPosition().y + tree.y + SVGTree.top.offset.y
      );
      this._ctx.fillStyle = SVGTree.top.fill;
      this._ctx.fill(SVGTree.top.path);
      this._ctx.fillStyle = SVGTree.trunk.fill;
      this._ctx.fill(SVGTree.trunk.path);
      this._ctx.restore();
    });
  }
}
