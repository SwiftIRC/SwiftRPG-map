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

  preload() {
  }

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
    this._drawTrees();
  }

  private _drawTrees(): void {
    console.log("Drawing Trees");
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
      }
      );
    })
  }
}
