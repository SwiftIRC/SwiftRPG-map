import { InputManager } from "../utils/InputManager";
import { GridManager } from "../utils/GridManager";
import { Tile } from "../gameObjects/tile";

export class MapScene extends Phaser.Scene {
  active = true;
  inputManager: InputManager;
  gridManager: GridManager;
  private _tiles: Tile[] = [];

  constructor() {
    super({ key: "MapScene" });
    this.inputManager = new InputManager();
    this.gridManager = new GridManager();
  }

  preload() {}

  init(tiles: Tile[]): void {
    console.log("Map Scene Init");
    tiles.forEach((tile) => {
      this.add.existing(tile);
    });
    this._tiles = tiles;
  }

  create() {
    this.cameras.main.centerOn(0, 0);
    this.input.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _gameObjects: Phaser.GameObjects.GameObject[],
        _x: number,
        y: number
      ) => this.inputManager.onMouseWheel(this.cameras.main, y)
    );
    this.input.on("pointerdown", (_pointer: Phaser.Input.Pointer) =>
      this.inputManager.onMouseDown(_pointer)
    );
    this.input.on("pointerup", () => this.inputManager.onMouseUp());
    this.input.on("pointermove", (_pointer: Phaser.Input.Pointer) =>
      this.inputManager.onMouseMove(this.cameras.main, _pointer)
    );
    this._drawRoads();
    this._drawTrees();
  }

  private _drawTrees(): void {
    this._tiles.forEach((tile) => {
      tile.treeMap.forEach((tree) => {
        this.add.sprite(
          tile.x + tree.x - tile.width / 2,
          tile.y + tree.y - tile.height / 2,
          "tree-trunk"
        );
        if (!tree.is_cut) {
          this.add.sprite(
            tile.x + tree.x - tile.width / 2,
            tile.y + tree.y - tile.height / 2,
            "tree-top"
          );
        }
      });
    });
  }

  private _drawRoads(): void {
    const roadColor = 0xa19784;
    const roadWidth = 12;
    this._tiles.forEach((tile) => {
      let hasRoad = false;
      if (tile.north.is_road) {
        this.add.rectangle(
          tile.x + tile.width / 2,
          tile.y,
          roadWidth,
          tile.height,
          roadColor
        );
        hasRoad = true;
      }
      if (tile.east.is_road) {
        this.add.rectangle(
          tile.x + tile.width,
          tile.y + tile.height / 2,
          tile.width,
          roadWidth,
          roadColor
        );
        hasRoad = true;
      }
      if (tile.south.is_road) {
        this.add.rectangle(
          tile.x + tile.width / 2,
          tile.y + tile.height,
          roadWidth,
          tile.height,
          roadColor
        );
        hasRoad = true;
      }
      if (tile.west.is_road) {
        this.add.rectangle(
          tile.x,
          tile.y + tile.height / 2,
          tile.width,
          roadWidth,
          roadColor
        );
        hasRoad = true;
      }
      if (hasRoad) {
        // creates a cleaner junction
        this.add.rectangle(
          tile.x + tile.width / 2,
          tile.y + tile.height / 2,
          roadWidth,
          roadWidth,
          roadColor
        );
      }
    });
  }
}

