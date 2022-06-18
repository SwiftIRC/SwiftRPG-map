import { CanvasManager } from "./CanvasManager";

export class InputManager {
  public zoomSpeed = 0.1;
  private _canvasManager: CanvasManager;

  constructor(canvasManager: CanvasManager) {
    this._canvasManager = canvasManager;
  }

}
