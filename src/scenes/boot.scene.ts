import axios from "axios";
import { Tile } from "../gameObjects/tile";
import {
  TileAPIResponse,
  TileEdge,
  TileEdgeDirection,
  TileEdgeDirectionMap,
} from "../types/index.types";
import { GridManager } from "../utils/GridManager";
import treeTop from "/assets/images/tree-top.svg";
import treeTrunk from "/assets/images/tree-trunk.svg";
import grassTile from "/assets/images/grasstile.png";
import dirtTile from "/assets/images/dirttile.png";
import waterTile from "/assets/images/watertile.png";
import sandTile from "/assets/images/sandtile.png";
import mountainsTile from "/assets/images/mountaintile.png";
import forestTile from "/assets/images/foresttile.png";

export class BootScene extends Phaser.Scene {
  gridManager: GridManager;
  constructor() {
    super({ key: "BootScene" });
    this.gridManager = new GridManager();
  }

  create() {
    this.add.text(50, 50, "Creating Map Tiles...");
    const start = async () => {
      const tiles: Tile[] = [];
      const tileData = await this._fetchTileData();
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
        tiles.push(
          new Tile(
            this,
            new Phaser.Math.Vector2(tile.x, tile.y),
            this.gridManager.getMappedPosition(tile.x, tile.y),
            this.gridManager._cellSize,
            tile.available_trees,
            tile.buildings,
            tile.discovered_by,
            tile.max_trees,
            tile.npcs,
            tile.terrain.name,
            tileEdgeMap.get("north") as TileEdge,
            tileEdgeMap.get("east") as TileEdge,
            tileEdgeMap.get("south") as TileEdge,
            tileEdgeMap.get("west") as TileEdge
          )
        );
      });
      this.scene.start("MapScene", tiles);
    };
    start();
  }

  preload() {
    console.log("Boot Scene Loaded");
    const textObj = this.add.text(50, 50, "Loading Assets");

    this.load.svg({
      key: "tree-top",
      url: treeTop,
      svgConfig: {
        scale: 3,
      },
    });
    this.load.svg({
      key: "tree-trunk",
      url: treeTrunk,
      svgConfig: {
        scale: 3,
      },
    });
    this.textures.addBase64("grass", grassTile);
    this.textures.addBase64("dirt", dirtTile);
    this.textures.addBase64("water", waterTile);
    this.textures.addBase64("sand", sandTile);
    this.textures.addBase64("mountains", mountainsTile);
    this.textures.addBase64("forest", forestTile);
    textObj.destroy();
  }

  private async _fetchTileData(): Promise<TileAPIResponse[]> {
    const tileDataRequest = await axios.get(
      `${import.meta.env.VITE_APP_API_BASE_URL}/api/tiles`
    );
    return tileDataRequest.data as TileAPIResponse[];
  }
}
