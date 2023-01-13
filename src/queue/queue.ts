interface IQueue<T> {
  enqueue: (element: T) => number;
  dequeue: () => T | null;
  peek: () => T | null;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private readonly elements: T[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: T) {
    return this.elements.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements.shift() as T;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements[0];
  }

  isEmpty() {
    return !this.elements.length;
  }
}
