import {
  TileEdge,
  TileNPCResponse,
  TileTerrainType,
  TileTerrainTypeMap,
  TileUser,
  TileUserResponse,
  Tree,
} from "../types/index.types";

export class Tile extends Phaser.GameObjects.Image {
  private _available_trees: number;
  private readonly _max_trees: number;
  public readonly gridPos: Phaser.Math.Vector2;
  public readonly mapPos: Phaser.Math.Vector2;
  public readonly buildings: number;
  public readonly discovered_by: string;
  public readonly npcs: TileNPCResponse[];
  public readonly users: TileUser[];
  public readonly terrain: TileTerrainType;
  public readonly treeMap: Tree[];
  public readonly size: number;
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
    npcs: TileNPCResponse[],
    users: TileUserResponse[],
    terrain: TileTerrainType,
    north: TileEdge,
    east: TileEdge,
    south: TileEdge,
    west: TileEdge
  ) {
    console.log(
      terrain,
      TileTerrainTypeMap[terrain],
      TileTerrainTypeMap[terrain].texture
    );
    super(scene, mapPos.x, mapPos.y, TileTerrainTypeMap[terrain].texture);
    this.setOrigin(0.25, 0.25);
    this.size = size;
    this.displayHeight = size;
    this.displayWidth = size;
    this.gridPos = gridPos;
    this.mapPos = mapPos;
    this._available_trees = available_trees;
    this._max_trees = max_trees;
    this.buildings = buildings;
    this.discovered_by = discovered_by;
    this.npcs = npcs;
    this.users = this._generateUserMap(users);
    this.terrain = terrain;
    this.treeMap = this._gerateTreeMap();
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
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
  private _generateUserMap(users: TileUserResponse[]): TileUser[] {
    return users.map((user) => {
      return {
        name: user.name,
        hitpoints: user.hitpoints,
        x: Math.floor(Math.random() * this.size),
        y: Math.floor(Math.random() * this.size),
      };
    });
  }
}
