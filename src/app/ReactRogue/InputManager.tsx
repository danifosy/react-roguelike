export type InputHandlerAction = string;
export type InputHandlerData = { x: number; y: number };
export type InputHandlerFunction = (
  action: InputHandlerAction,
  data: InputHandlerData
) => void;

export class InputManager {
  observer: InputHandlerFunction[] = [];

  subscribe(fn: InputHandlerFunction): void {
    this.observer.push(fn);
  }
  unsubscribe(fn: InputHandlerFunction): void {
    this.observer = this.observer.filter((subscriber) => subscriber !== fn);
  }

  broadcast(action: InputHandlerAction, data: InputHandlerData): void {
    this.observer.forEach((subscriber) => subscriber(action, data));
  }

  handleKeys(e: KeyboardEvent): void {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        this.broadcast('move', { x: -1, y: 0 });
        break;
      case 38:
        this.broadcast('move', { x: 0, y: -1 });
        break;
      case 39:
        this.broadcast('move', { x: 1, y: 0 });
        break;
      case 40:
        this.broadcast('move', { x: 0, y: 1 });
        break;
      default:
        break;
    }
  }

  bindKeys(): void {
    document.addEventListener('keydown', this.handleKeys.bind(this));
  }
  unbindKeys(): void {
    document.removeEventListener('keydown', this.handleKeys.bind(this));
  }
}
