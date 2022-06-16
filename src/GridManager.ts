import { MappedTile, Tile } from "./types";
import { Coordinate } from "./types";


export class GridManager {
    private _tiles: Tile[] = [];
    public tileSize: number;
    public center: Coordinate
    public borderSize: number;

    constructor(center: Coordinate, tileSize: number, borderSize: number) {
        this.tileSize = tileSize;
        this.center = center
        this.borderSize = borderSize
    }

    setTiles(tiles: Tile[]) {
        this._tiles = tiles
    }

    get tileGrid() {
        const mappedTiles: MappedTile[] = []
        for (const tile of this._tiles) {
            const newX = (this.tileSize * tile.x) + (this.center.x - (this.tileSize / 2)) + (tile.x * (this.borderSize / 2))
            let newY = (this.tileSize * (tile.y * -1)) + (this.center.y - (this.tileSize / 2)) - (tile.y * (this.borderSize / 2))
            mappedTiles.push({x: newX, y: newY, tile: tile})
        }
        return mappedTiles
    }
}