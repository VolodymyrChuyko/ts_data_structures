interface IHeap {
  insert: (key: number) => void;
  delete: () => number | null;
  peek: () => number | null;
}

const HeapType = {
  MIN: 0,
  MAX: 1,
} as const;

type HeapType = typeof HeapType[keyof typeof HeapType];

export class Heap implements IHeap {
  private readonly keys: number[];
  private readonly type: HeapType;

  constructor(type: HeapType = HeapType.MIN) {
    this.keys = new Array<number>();
    this.type = type;
  }

  peek() {
    return this.keys[0] || null;
  }

  insert(key: number) {
    this.keys.push(key);
    let currentIndex = this.keys.length - 1;
    let prevIndex: number;

    do {
      prevIndex = currentIndex;
      currentIndex = this.swapWithParent(currentIndex);
    } while (prevIndex !== currentIndex);
  }

  delete() {
    if (!this.keys.length) {
      return null;
    }

    const root = this.keys[0];
    this.keys[0] = this.keys[this.keys.length - 1];
    this.keys.pop();

    let currentIndex = 0;
    let prevIndex: number;

    do {
      prevIndex = currentIndex;
      currentIndex = this.swapWithChild(currentIndex);
    } while (prevIndex !== currentIndex);

    return root;
  }

  private swapWithParent(childIndex: number) {
    if (!childIndex) {
      return childIndex;
    }

    const parentIndex = Math.floor((childIndex - 1) / 2);
    const child = this.keys[childIndex];
    const parent = this.keys[parentIndex];

    if (this.compare(child, parent)) {
      this.keys[parentIndex] = child;
      this.keys[childIndex] = parent;

      return parentIndex;
    }

    return childIndex;
  }

  private swapWithChild(parentIndex: number) {
    const childIndex = this.getChildIndex(parentIndex);

    if (childIndex < 0) {
      return parentIndex;
    }

    const parent = this.keys[parentIndex];
    const child = this.keys[childIndex];

    if (this.compare(child, parent)) {
      this.keys[parentIndex] = child;
      this.keys[childIndex] = parent;

      return childIndex;
    }

    return parentIndex;
  }

  private getChildIndex(parentIndex: number) {
    const leftChildIndex = 2 * parentIndex + 1;
    const rightChildIndex = 2 * parentIndex + 2;

    if (leftChildIndex > this.keys.length - 1) {
      return -1;
    }

    if (leftChildIndex === this.keys.length - 1) {
      return leftChildIndex;
    }

    if (this.compare(this.keys[leftChildIndex], this.keys[rightChildIndex])) {
      return leftChildIndex;
    }

    return rightChildIndex;
  }

  private compare(valueA: number, valueB: number) {
    if (this.type === HeapType.MIN) {
      return valueA < valueB;
    }

    return valueA > valueB;
  }
}
