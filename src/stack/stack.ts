interface IStack<T> {
  push: (element: T) => number;
  pop: () => T | null;
  peek: () => T | null;
  isEmpty: () => boolean;
}

export class Stack<T> implements IStack<T> {
  private readonly elements: T[];

  constructor() {
    this.elements = new Array<T>();
  }

  push(element: T) {
    return this.elements.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements.pop() as T;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements[this.elements.length - 1];
  }

  isEmpty() {
    return !this.elements.length;
  }
}
