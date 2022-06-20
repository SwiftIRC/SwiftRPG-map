import { Coordinate } from "./types";

export class InputManager {
  public zoomSpeed = 0.1;
  private _isMouseDown: boolean = false;
  public offset: Coordinate = { x: 0, y: 0 };
  // For some reason the click event seems to be about 87 px off.
  // This is likely a bug that differs between different screens and devices.
  // This is a workaround to get the correct click position temporarily
  private _fixY = -87

  public scale = 1;

  constructor(center: Coordinate) {
    this.offset = center;
  }

  onWheel(event: WheelEvent) {
    this.scale += 0.0005 * event.deltaY;
  }

  get isMouseDown() {
    return this._isMouseDown;
  }

  onMouseDown(event: MouseEvent) {
    console.log("Clicked: " + event.clientX + "," + (event.clientY + this._fixY));
    this.offset = { x: event.clientX, y: event.clientY + this._fixY };
    this._isMouseDown = true;
  }

  onMouseUp(event: MouseEvent) {
    this._isMouseDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (this._isMouseDown) {
      this.offset = { x: event.clientX, y: event.clientY + this._fixY };
    }
  }
}
