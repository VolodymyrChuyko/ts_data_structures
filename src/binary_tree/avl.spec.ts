import {expect, test, describe, beforeEach} from '@jest/globals';
import { AVL } from './avl';
import { ITraverseCallback } from './binary_tree';

function populateTree(tree: AVL, keys: number[]) {
  for (const key of keys) {
    tree.insert(key);
  }
}

let traversalOrder: number[] = [];
const traverseCallback: ITraverseCallback<number> = node => {
  traversalOrder.push(node.key);
};

beforeEach(() => {
  traversalOrder = [];
});

describe('AVL tree', () => {
  describe('insert', () => {
    test(
      'should return the inserted node',
      () => {
        const key = 10;
        const sut = new AVL();

        const newNode = sut.insert(key);

        expect(newNode.key).toBe(key);
      }
    );

    test(
      'should correctly perform left rotation',
      () => {
        const insertOrder = [10, 20, 30];
        const expectedOrder = [20, 10, 30];
        const sut = new AVL();

        populateTree(sut, insertOrder);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform right rotation',
      () => {
        const insertOrder = [30, 20, 10];
        const expectedOrder = [20, 10, 30];
        const sut = new AVL();

        populateTree(sut, insertOrder);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform left-right rotation',
      () => {
        const insertOrder = [30, 20, 25];
        const expectedOrder = [25, 20, 30];
        const sut = new AVL();

        populateTree(sut, insertOrder);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform right-left rotation',
      () => {
        const insertOrder = [10, 20, 15];
        const expectedOrder = [15, 10, 20];
        const sut = new AVL();

        populateTree(sut, insertOrder);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should return the inserted node after left rotation',
      () => {
        const existingKeys = [10, 20];
        const newKey = 30;
        const sut = new AVL();
        populateTree(sut, existingKeys);

        const newNode = sut.insert(newKey);

        expect(newNode.key).toBe(newKey);
      }
    );

    test(
      'should return the inserted node after right rotation',
      () => {
        const existingKeys = [30, 20];
        const newKey = 10;
        const sut = new AVL();
        populateTree(sut, existingKeys);

        const newNode = sut.insert(newKey);

        expect(newNode.key).toBe(newKey);
      }
    );

    test(
      'should return the inserted node after left-right rotation',
      () => {
        const existingKeys = [30, 20];
        const newKey = 25;
        const sut = new AVL();
        populateTree(sut, existingKeys);

        const newNode = sut.insert(newKey);

        expect(newNode.key).toBe(newKey);
      }
    );

    test(
      'should return the inserted node after right-left rotation',
      () => {
        const existingKeys = [10, 20];
        const newKey = 15;
        const sut = new AVL();
        populateTree(sut, existingKeys);

        const newNode = sut.insert(newKey);

        expect(newNode.key).toBe(newKey);
      }
    );
  });

  describe('search', () => {
    test(
      'should return a node with the given "searchKey"',
      () => {
        const key = 10;
        const sut = new AVL();
        sut.insert(key);

        const foundKey = sut.search(key)?.key;

        expect(foundKey).toBe(key);
      }
    );

    test(
      'should return "null" if there is no a node with the given "searchKey"',
      () => {
        const key = 10;
        const sut = new AVL();

        const foundNode = sut.search(key);

        expect(foundNode).toBeNull();
      }
    );
  });

  describe('delete', () => {
    test(
      'should remove the node with the given key',
      () => {
        const key = 10;
        const sut = new AVL();
        sut.insert(key);

        sut.delete(key);

        expect(sut.search(key)).toBeNull();
      }
    );

    test(
      'should return "true" if the node was removed',
      () => {
        const key = 10;
        const sut = new AVL();
        sut.insert(key);

        const deleteSucceed = sut.delete(key);

        expect(deleteSucceed).toBe(true);
      }
    );

    test(
      'should return "false" if the node was not removed',
      () => {
        const key = 10;
        const sut = new AVL();

        const deleteSucceed = sut.delete(key);

        expect(deleteSucceed).toBe(false);
      }
    );

    test(
      'should correctly perform left rotation',
      () => {
        const insertOrder = [10, 5, 20, 30];
        const keyToDelete = 5;
        const expectedOrder = [20, 10, 30];
        const sut = new AVL();
        populateTree(sut, insertOrder);

        sut.delete(keyToDelete);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform right rotation',
      () => {
        const insertOrder = [30, 20, 40, 10];
        const keyToDelete = 40;
        const expectedOrder = [20, 10, 30];
        const sut = new AVL();
        populateTree(sut, insertOrder);

        sut.delete(keyToDelete);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform left-right rotation',
      () => {
        const insertOrder = [30, 20, 40, 25];
        const keyToDelete = 40;
        const expectedOrder = [25, 20, 30];
        const sut = new AVL();
        populateTree(sut, insertOrder);

        sut.delete(keyToDelete);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );

    test(
      'should correctly perform right-left rotation',
      () => {
        const insertOrder = [10, 5, 20, 15];
        const keyToDelete = 5;
        const expectedOrder = [15, 10, 20];
        const sut = new AVL();
        populateTree(sut, insertOrder);

        sut.delete(keyToDelete);

        sut.traverseLevelOrder(sut.root, traverseCallback);
        expect(traversalOrder).toEqual(expectedOrder);
      }
    );
  });

  describe('traversals', () => {
    describe('traversePreOrder()', () => {
      test(
        'should traverse the tree in a pre-order manner',
        () => {
          const expectedOrder = [20, 10, 30];
          const sut = new AVL();
          populateTree(sut, expectedOrder);

          sut.traversePreOrder(sut.root, traverseCallback);

          expect(traversalOrder).toEqual(expectedOrder);
        }
      );
    });

    describe('traverseInOrder()', () => {
      test(
        'should travers the tree in an in-order manner',
        () => {
          const expectedOrder = [10, 20, 30];
          const sut = new AVL();
          populateTree(sut, expectedOrder);

          sut.traverseInOrder(sut.root, traverseCallback);

          expect(traversalOrder).toEqual(expectedOrder);
        }
      );
    });

    describe('traversePostOrder()', () => {
      test(
        'should travers the tree in a post-order manner',
        () => {
          const expectedOrder = [10, 30, 20];
          const sut = new AVL();
          populateTree(sut, expectedOrder);

          sut.traversePostOrder(sut.root, traverseCallback);

          expect(traversalOrder).toEqual(expectedOrder);
        }
      );
    });

    describe('traverseLevelOrder()', () => {
      test(
        'should travers the tree in a level-order manner',
        () => {
          const expectedOrder = [20, 10, 30];
          const sut = new AVL();
          populateTree(sut, expectedOrder);

          sut.traverseLevelOrder(sut.root, traverseCallback);

          expect(traversalOrder).toEqual(expectedOrder);
        }
      );
    });
  });
});
