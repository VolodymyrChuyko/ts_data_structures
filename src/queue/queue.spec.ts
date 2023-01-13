import {expect, test, describe} from '@jest/globals';
import { Queue } from './queue';

describe('queue', () => {
  describe('enqueue()', () => {
    test(
      'should return the actual size upon adding a new item',
      () => {
        const newItem = 'Apple';
        const expectedSize = 1;
        const sut = new Queue();

        const actualSize = sut.enqueue(newItem);

        expect(actualSize).toBe(expectedSize);
      }
    );
  });

  describe('dequeue()', () => {
    test(
      'should remove an item from the front',
      () => {
        const firstItem = 'Apple';
        const sut = new Queue();
        sut.enqueue(firstItem);

        sut.dequeue();

        expect(sut.peek()).not.toStrictEqual(firstItem);
      }
    );

    test(
      'should return the removed item',
      () => {
        const firstItem = 'Apple';
        const sut = new Queue();
        sut.enqueue(firstItem);

        const removedItem = sut.dequeue();

        expect(removedItem).toStrictEqual(firstItem);
      }
    );

    test(
      'should return "null" if the queue is empty',
      () => {
        const sut = new Queue();

        const removedItem = sut.dequeue();

        expect(removedItem).toBeNull();
      }
    );
  });

  describe('peek()', () => {
    test(
      'should get the value of the first item',
      () => {
        const firstItem = 'Apple';
        const secondtItem = 'Pear';
        const sut = new Queue();
        sut.enqueue(firstItem);
        sut.enqueue(secondtItem);

        const actualItem = sut.peek();

        expect(actualItem).toStrictEqual(firstItem);
      }
    );

    test(
      'should return "null" if the queue is empty',
      () => {
        const sut = new Queue();

        const actualItem = sut.peek();

        expect(actualItem).toBeNull();
      }
    );
  });

  describe('isEmpty()', () => {
    test(
      'should return "true" if the queue is empty',
      () => {
        const sut = new Queue();

        const actual = sut.isEmpty();

        expect(actual).toBe(true);
      }
    );
    test(
      'should return "false" if the queue is not empty',
      () => {
        const sut = new Queue();
        const firstItem = 'Apple';
        sut.enqueue(firstItem);

        const actual = sut.isEmpty();

        expect(actual).toBe(false);
      }
    );
  });
});
