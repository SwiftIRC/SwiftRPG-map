import { TileEdge, TileTerrainType, TileTerrainTypeMap, Tree } from "../types/index.types";

export class Tile extends Phaser.GameObjects.Rectangle {
  private _available_trees: number;
  private readonly _max_trees: number;
  public readonly gridPos: Phaser.Math.Vector2;
  public readonly mapPos: Phaser.Math.Vector2;
  public readonly buildings: number;
  public readonly discovered_by: string;
  public readonly npcs: number;
  public readonly terrain: TileTerrainType;
  public readonly treeMap: Tree[];
  public readonly size: number
  public readonly north: TileEdge;
  public readonly east: TileEdge;
  public readonly south: TileEdge;
  public readonly west: TileEdge;

  constructor(
    scene: Phaser.Scene,
    gridPos: Phaser.Math.Vector2,
    mapPos: Phaser.Math.Vector2,
    size: number,
    available_trees: number,
    buildings: number,
    discovered_by: string,
    max_trees: number,
    npcs: number,
    terrain: TileTerrainType,
    north: TileEdge,
    east: TileEdge,
    south: TileEdge,
    west: TileEdge,

  ) {
    super(scene, mapPos.x, mapPos.y, size, size, TileTerrainTypeMap[terrain].color);
    this.size = size;
    this.gridPos = gridPos;
    this.mapPos = mapPos;
    this._available_trees = available_trees;
    this._max_trees = max_trees;
    this.buildings = buildings;
    this.discovered_by = discovered_by;
    this.npcs = npcs;
    this.terrain = terrain;
    this.treeMap = this._gerateTreeMap();
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
    console.log(this.treeMap);
  }
  private _gerateTreeMap(): Tree[] {
    const treeMap: Tree[] = [];
    for (let i = 0; i < this._max_trees; i++) {
      treeMap.push({
        x: Math.floor(Math.random() * this.size),
        y: Math.floor(Math.random() * this.size),
        is_cut: true,
      });
    }
    for (let i = 0; i < this._available_trees; i++) {
      treeMap[i].is_cut = false;
    }
    return treeMap;
  }

}