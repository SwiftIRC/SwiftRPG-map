import { CanvasManager } from "./CanvasManager";
import { Coordinate } from "./types";

export class InputManager {
  public zoomSpeed = 0.1;
  private _canvasManager: CanvasManager;
  private _isMouseDown: boolean = false;
  public inputTartget: Coordinate = { x: 0, y: 0 };
  public inputScale = 1;

  constructor(canvasManager: CanvasManager) {
    this._canvasManager = canvasManager;
  }

  onWheel(event: WheelEvent) {
    console.log("wheel", event.deltaY);
    this.inputScale += 0.0005 * event.deltaY;
    this.inputTartget = { x: event.clientX, y: event.clientY };
  }

  get isMouseDown() {
    return this._isMouseDown;
  }

  onMouseDown(event: MouseEvent) {
    this._isMouseDown = true;
    this.inputTartget = { x: event.clientX, y: event.clientY };
  }

  onMouseUp(event: MouseEvent) {
    this._isMouseDown = false;
    this.inputTartget = { x: event.clientX, y: event.clientY };
  }

  onMouseMove(event: MouseEvent) {
    if (this._isMouseDown) {
      this.inputTartget = { x: event.clientX, y: event.clientY };
    }
  }
}
