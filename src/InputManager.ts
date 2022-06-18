import { CanvasManager } from "./CanvasManager";

export class InputManager {
  public zoomSpeed = 0.1;
  private _canvasManager: CanvasManager;

  constructor(canvasManager: CanvasManager) {
    this._canvasManager = canvasManager;
  }

  onWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this._canvasManager.cameraZoom += this.zoomSpeed;
    } else {
      this._canvasManager.cameraZoom -= this.zoomSpeed;
    }
  }

}
