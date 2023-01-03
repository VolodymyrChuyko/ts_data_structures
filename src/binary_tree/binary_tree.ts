export interface IBinaryNode<T> {
  key: T;
  height: number;
  left: IBinaryNode<T> | null;
  right: IBinaryNode<T> | null;
}

export interface ITraverseCallback<T> {
  (node: IBinaryNode<T>): void;
}

export interface ITraverseMethod<T> {
  (node: IBinaryNode<T> | null, callback: ITraverseCallback<T>): void;
}

export interface IBinaryTreeTraversals<T> {
  traverseInOrder: ITraverseMethod<T>;
  traversePreOrder: ITraverseMethod<T>;
  traversePostOrder: ITraverseMethod<T>;
  traverseLevelOrder: ITraverseMethod<T>;
}

export interface IBinaryTree<T> extends IBinaryTreeTraversals<T>{
  insert: (key: T) => IBinaryNode<T>;
  search: (key: T) => IBinaryNode<T> | null;
  delete: (key: T) => boolean;
}

export class BinaryNode<T> implements IBinaryNode<T> {
  key: T;
  height: number;
  left: IBinaryNode<T> | null;
  right: IBinaryNode<T> | null;

  constructor(key: T) {
    this.key = key;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTreeTraversals<T> implements IBinaryTreeTraversals<T> {
  root: IBinaryNode<T> | null;

  constructor() {
    this.root = null;
  }

  traversePreOrder(node: IBinaryNode<T> | null, callback: ITraverseCallback<T>) {
    if (!node) {
      return;
    }

    callback(node);
    this.traversePreOrder(node.left, callback);
    this.traversePreOrder(node.right, callback);
  }

  traverseInOrder(node: IBinaryNode<T> | null, callback: ITraverseCallback<T>) {
    const stack = new Array<IBinaryNode<T>>();
    let currentNode = node;

    while (stack.length > 0 || currentNode) {
      if (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = stack[stack.length - 1];
        stack.pop();
        callback(currentNode);
        currentNode = currentNode.right;
      }
    }
  }

  traversePostOrder(node: IBinaryNode<T> | null, callback: ITraverseCallback<T>) {
    const stack = new Array<IBinaryNode<T>>();
    let currentNode = node;
    let prevNode: IBinaryNode<T> | null = null;

    while (stack.length > 0 || currentNode) {
      if (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = stack[stack.length - 1];

        if (currentNode.right === null || currentNode.right === prevNode) {
          stack.pop();
          callback(currentNode);
          prevNode = currentNode;
          currentNode = null;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  traverseLevelOrder(node: IBinaryNode<T> | null, callback: ITraverseCallback<T>) {
    const queue = new Array<IBinaryNode<T> | null>();
    queue.push(node);

    while (queue.length) {
      const currentNode = queue[0];
      queue.shift();

      if (currentNode) {
        callback(currentNode);
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }
  }
}

export class BinaryTree<T> extends BinaryTreeTraversals<T> implements IBinaryTree<T> {
  root: IBinaryNode<T> | null;

  constructor() {
    super();
    this.root = null;
  }

  insert(key: T) {
    const newNode = new BinaryNode(key);

    if (!this.root) {
      this.root = newNode;

      return newNode;
    }

    const queue = new Array<IBinaryNode<T>>();
    let currentNode = this.root;

    while (currentNode.left && currentNode.right) {
      queue.push(currentNode.left);
      queue.push(currentNode.right);
      currentNode = queue[0];
      queue.shift();
    }

    if (!currentNode.left) {
      currentNode.left = newNode;
    } else {
      currentNode.right = newNode;
    }

    return newNode;
  }

  search(key: T) {
    let foundNode: IBinaryNode<T> | null = null;
    const findNodeByKey = (node: IBinaryNode<T>) => {
      if (node.key === key) {
        foundNode = node;
      }
    };

    // use `foundNode` in the closure to get the node while traversing a tree
    // is it an OK solution?
    this.traversePreOrder(this.root, findNodeByKey);

    return foundNode;
  }

  private findParentNode(node: IBinaryNode<T>) {
    const stack = new Array<IBinaryNode<T> | null>();
    stack.push(this.root);

    while (stack.length > 0) {
      const currentNode = stack[stack.length - 1];
      stack.pop();

      if (currentNode) {
        if (currentNode.left === node || currentNode.right === node) {
          return currentNode;
        }
        stack.push(currentNode.right);
        stack.push(currentNode.left);
      }
    }

    return null;
  }

  delete(key: T) {
    if (!this.root) {
      return false;
    }

    if (this.root.key === key && !this.root.left && !this.root.right ) {
      this.root = null;
      return true;
    }

    let lastNode: IBinaryNode<T> | null = null;
    let nodeToDelete: IBinaryNode<T> | null = null;
    const queue = new Array<IBinaryNode<T> | null>();
    queue.push(this.root);

    while (queue.length) {
      const currentNode = queue[0];
      queue.shift();

      if (currentNode) {
        lastNode = currentNode;
        if (currentNode.key === key) {
          nodeToDelete = currentNode;
        }
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }

    if (!nodeToDelete || !lastNode) {
      return false;
    }

    const parentOfLastNode = this.findParentNode(lastNode);

    if (!parentOfLastNode) {
      return false;
    }

    nodeToDelete.key = lastNode.key;

    if (parentOfLastNode.left === lastNode ) {
      parentOfLastNode.left = null;
    } else {
      parentOfLastNode.right = null;
    }

    return true;
  }
}
