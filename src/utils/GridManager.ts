export class GridManager {
  public readonly _cellSize: number = 200;
  public readonly _boardSize: number = 10;

  getMappedPosition(x: number, y: number): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      x * this._cellSize + (this._boardSize / 2) * x,
      (y * this._cellSize + (this._boardSize / 2) * y) * -1
    );
  }
}
