export class InputManager {
  private _minScale = 0.003;
  private _wheelSensitivity = 0.0004;
  private _isMouseDown: boolean = false;


  onMouseWheel(camera: Phaser.Cameras.Scene2D.Camera, zoomDelta: number) {;
    const deltaY = zoomDelta * this._wheelSensitivity;
    if (camera.zoom - deltaY > this._minScale) {
      camera.zoom -= deltaY;
    }
  }

  onMouseDown(_pointer: Phaser.Input.Pointer) {
    this._isMouseDown = true;
  }

  onMouseUp() {
    this._isMouseDown = false;
  }

  onMouseMove(
    camera: Phaser.Cameras.Scene2D.Camera,
    pointer: Phaser.Input.Pointer
  ) {
    if (this._isMouseDown) {
        camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
        camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;
    }
  }
}
