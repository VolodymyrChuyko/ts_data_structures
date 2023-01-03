import { BinaryNode, BinaryTreeTraversals, IBinaryNode, IBinaryTree } from "./binary_tree";

export class AVL extends BinaryTreeTraversals<number> implements IBinaryTree<number> {
  root: IBinaryNode<number> | null;

  constructor() {
    super();
    this.root = null;
  }

  search(key: number) {
    let foundNode = this.root;

    while (foundNode) {
      if (key === foundNode.key) {
        return foundNode;
      }

      if (key < foundNode.key) {
        foundNode = foundNode.left;
      } else {
        foundNode = foundNode.right;
      }
    }

    return foundNode;
  }

  insert(key: number) {
    const newNode = new BinaryNode(key);

    if (!this.root) {
      this.root = newNode;

      return newNode;
    }

    let currentNode = this.root;
    const stackOfNodes = new Array<IBinaryNode<number>>();

    while (currentNode !== newNode) {
      stackOfNodes.push(currentNode);
      if (key < currentNode.key) {
        if (!currentNode.left) {
          currentNode.left = newNode;
        }
        currentNode = currentNode.left;

      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
        }
        currentNode = currentNode.right;
      }
    }

    while (stackOfNodes.length) {
      currentNode = stackOfNodes[stackOfNodes.length - 1];
      stackOfNodes.pop();

      const parentNode = stackOfNodes.length ? stackOfNodes[stackOfNodes.length -1] : null;
      if (!parentNode) {
        this.root = this.balanceNode(currentNode);
        continue;
      }

      if (currentNode.key < parentNode.key) {
        parentNode.left = this.balanceNode(currentNode);
      } else {
        parentNode.right = this.balanceNode(currentNode);
      }
    }

    return newNode;
  }

  delete(key: number) {
    if (!this.search(key)) {
      return false;
    }

    this.root = (this.deleteNode(this.root, key));

    return true;
  }

  private deleteNode(node: IBinaryNode<number> | null, key: number) {
    if (!node) {
      return null;
    }

    if (key < node.key) {
      node.left = this.deleteNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.deleteNode(node.right, key);
    } else {
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      const successor = this.findInOrderSuccessor(node.right);
      node.key = successor.key;
      node.right = this.deleteNode(node.right, successor.key);
    }

    return this.balanceNode(node);
  }

  private findInOrderSuccessor(node: IBinaryNode<number>) {
    let currentNode = node;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  private balanceNode(node: IBinaryNode<number>) {
    node.height = this.calculateNodeHight(node);
    const balanceFactorOfNode = this.calculateBalanceFactor(node);

    if (balanceFactorOfNode > 1) {
      if (node.left && this.calculateBalanceFactor(node.left) < 0) {
        node.left = this.rotateLeft(node.left);
      }

      return this.rotateRight(node);
    }

    if (balanceFactorOfNode < -1) {
      if (node.right && this.calculateBalanceFactor(node.right) > 0) {
        node.right = this.rotateRight(node.right);
      }

      return this.rotateLeft(node);
    }

    return node;
  }

  private calculateNodeHight(node: IBinaryNode<number>) {
    const leftHight = node.left ? node.left.height : -1;
    const rightHight = node.right ? node.right.height : -1;
    return Math.max(leftHight, rightHight) + 1;
  }

  private calculateBalanceFactor (node: IBinaryNode<number> | null): number {
    if (!node) {
      return 0;
    }

    const leftHight = node.left ? node.left.height : -1;
    const rightHight = node.right ? node.right.height : -1;

    return leftHight - rightHight;
  }

  private rotateRight(nodeA: IBinaryNode<number>) {
    if (!nodeA.left) {
      return nodeA;
    }

    const nodeB = nodeA.left;
    nodeA.left = nodeB.right;
    nodeB.right = nodeA;

    nodeA.height = this.calculateNodeHight(nodeA);
    nodeB.height = this.calculateNodeHight(nodeB);

    return nodeB;
  }

  private rotateLeft(nodeA: IBinaryNode<number>) {
    if (!nodeA.right) {
      return nodeA;
    }

    const nodeB = nodeA.right;
    nodeA.right = nodeB.left;
    nodeB.left = nodeA;

    nodeA.height = this.calculateNodeHight(nodeA);
    nodeB.height = this.calculateNodeHight(nodeB);

    return nodeB;
  }
}
