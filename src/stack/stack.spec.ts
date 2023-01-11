import {expect, test, describe} from '@jest/globals';
import { Stack } from './stack';

describe('stack', () => {
  describe('push()', () => {
    test(
      'should return the actual size upon adding a new item',
      () => {
        const newItem = 'Apple';
        const expectedSize = 1;
        const sut = new Stack();

        const actualSize = sut.push(newItem);

        expect(actualSize).toBe(expectedSize);
      }
    );
  });

  describe('pop()', () => {
    test(
      'should return removed item',
      () => {
        const lastItem = 'Apple';
        const sut = new Stack();
        sut.push(lastItem);

        const removedItem = sut.pop();

        expect(removedItem).toStrictEqual(lastItem);
      }
    );

    test(
      'should removed last item',
      () => {
        const lastItem = 'Apple';
        const sut = new Stack();
        sut.push(lastItem);

        sut.pop();

        expect(sut.peek()).not.toStrictEqual(lastItem);
      }
    );

    test(
      'should return null if there is no item to remove',
      () => {
        const sut = new Stack();

        const removedItem = sut.pop();

        expect(removedItem).toBeNull();
      }
    );
  });

  describe('isEmpty()', () => {
    test(
      'should return true if the stack is empty',
      () => {
        const sut = new Stack();

        const actual = sut.isEmpty();

        expect(actual).toBe(true);
      }
    );
    test(
      'should return false if the stack is not empty',
      () => {
        const sut = new Stack();
        sut.push('Any item');

        const actual = sut.isEmpty();

        expect(actual).toBe(false);
      }
    );
  });

  describe('peek()', () => {
    test(
      'should get the the last item',
      () => {
        const lastItem = 'Apple';
        const sut = new Stack();
        sut.push(lastItem);

        const actualItem = sut.peek();

        expect(actualItem).toStrictEqual(lastItem);
      }
    );

    test(
      'should return null if stack is empty',
      () => {
        const sut = new Stack();

        const actualItem = sut.peek();

        expect(actualItem).toBeNull();
      }
    );
  });
});
