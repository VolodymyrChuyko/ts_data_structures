interface INode<T> {
  data: T;
  next: INode<T> | null;
}

export class Node<T> implements INode<T> {
  data: T;
  next: INode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

interface ILinkedList<T> {
  addFirst: (data: T) => void;
  addLast: (data: T) => void;
  getFirst: () => T | null;
  getLast: () => T | null;
  removeFirst: () => T | null;
  removeLast: () => T | null;
  size: () => number;
  clear: () => void;
  toArray: () => T[];
  contains: (data: T) => boolean;
  find: (data: T) => INode<T> | null;
  remove: (data: T) => boolean;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: INode<T> | null;

  constructor() {
    this.head = null;
  }

  addFirst(data: T) {
    const newNode = new Node(data);

    newNode.next = this.head;
    this.head = newNode;
  }

  addLast(data: T) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;

      return;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
  }

  getFirst() {
    if (!this.head) {
      return null;
    }

    return this.head.data;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    return currentNode.data;
  }

  removeFirst() {
    if (!this.head) {
      return null;
    }

    const data = this.head.data;
    this.head = this.head.next;

    return data;
  }

  removeLast() {
    if (!this.head || !this.head.next) {
      return this.removeFirst();
    }

    let prevNode = this.head;
    let currentNode = this.head.next;

    while (currentNode.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    prevNode.next = null;

    return currentNode.data;
  }

  size() {
    let size = 0;
    let currentNode = this.head;

    while (currentNode) {
      size++;
      currentNode = currentNode.next;
    }

    return size;
  }

  clear() {
    this.head = null;
  }

  toArray() {
    const listElements: T[] = [];
    let currentNode = this.head;

    while (currentNode) {
      listElements.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return listElements;
  }

  contains(data: T) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  find(data: T) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  remove(data: T) {
    if (!this.head) {
      return false;
    }

    if(this.head.data === data) {
      this.removeFirst();

      return true;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (currentNode.next.data === data) {
        currentNode.next = currentNode.next.next;

        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }
}
