import { BinaryNode, BinaryTreeTraversals, IBinaryNode, IBinaryTree } from "./binary_tree";

export class BST extends BinaryTreeTraversals<number> implements IBinaryTree<number> {
  root: IBinaryNode<number> | null;

  constructor() {
    super();
    this.root = null;
  }

  insert(key: number) {
    const newNode = new BinaryNode(key);

    if (!this.root) {
      this.root = newNode;

      return newNode;
    }

    let currentNode = this.root;

    while (currentNode !== newNode) {
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

    return newNode;
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

  private findInOrderSuccessor(node: IBinaryNode<number>) {
    let currentNode = node;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
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

    return node;
  }

  delete(key: number) {
    if (!this.search(key)) {
      return false;
    }

    this.root = (this.deleteNode(this.root, key));

    return true;
  }
}
