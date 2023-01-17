import { expect, test, describe } from '@jest/globals';
import { Hashmap } from './hashmap';

describe('Hashmap', () => {
  describe('insert()', () => {
    test(
      'should add a value to the hasmap by the given key',
      () => {
        const key = 1;
        const value = 'a';
        const sut = new Hashmap();

        sut.insert(key, value);

        expect(sut.search(key)).toBe(value);
      }
    );

    test(
      'should return value of item on adding it',
      () => {
        const key = 1;
        const value = 'a';
        const sut = new Hashmap();

        const insertResult = sut.insert(key, value);

        expect(insertResult).toBe(value);
      }
    );

    test(
      'should replace the value if adding with the same key',
      () => {
        const key = 1;
        const value1 = 'a';
        const value2 = 'b';
        const sut = new Hashmap();
        sut.insert(key, value1);
        sut.insert(key, value2);

        const actualValue = sut.search(key);

        expect(actualValue).toBe(value2);
      }
    );

    test(
      'should correctly add a value when there is a collision',
      () => {
        const key1 = 1;
        const key2 = '1';
        const value1 = 'a';
        const value2 = 'b';
        const sut = new Hashmap();
        sut.insert(key1, value1);

        sut.insert(key2, value2);

        expect(sut.search(key1)).toBe(value1);
        expect(sut.search(key2)).toBe(value2);
      }
    );

    test(
      'should resize on exceeding the initial map size',
      () => {
        const numberOfItems = 4;
        const mapSize = numberOfItems / 2;
        const sut = new Hashmap(mapSize);

        for (let i = 0; i < numberOfItems; i++) {
          sut.insert(i, i);
        }

        expect(sut.getSize()).toBe(numberOfItems);
      }
    );
  });

  describe('search()', () => {
    test(
      'should return a value respective to the given key',
      () => {
        const key = 1;
        const value = 'a';
        const sut = new Hashmap();
        sut.insert(key, value);

        const foundValue = sut.search(key);

        expect(foundValue).toBe(value);
      }
    );

    test(
      'should return "null" if there is no such key in the hashmap',
      () => {
        const key = 1;
        const sut = new Hashmap();

        const foundValue = sut.search(key);

        expect(foundValue).toBeNull();
      }
    );
  });

  describe('delete()', () => {
    test(
      'should delete an item by the given key',
      () => {
        const key = 1;
        const value = 'a';
        const sut = new Hashmap();
        sut.insert(key, value);

        sut.delete(key);

        expect(sut.search(key)).toBeNull();
      }
    );

    test(
      'should return the value of deleted item',
      () => {
      const key = 1;
      const value = 'a';
      const sut = new Hashmap();
      sut.insert(key, value);

      const deletedValue = sut.delete(key);

      expect(deletedValue).toBe(value);
    }
    );

    test(
      'should return "null" if there is no an item respective to the given key',
      () => {
        const key = 1;
        const sut = new Hashmap();

        const deletedValue = sut.delete(key);

        expect(deletedValue).toBeNull();
      }
    );
  });

  describe('clear()', () => {
    test(
      'should delete all items',
      () => {
        const numberOfItems = 4;
        const sut = new Hashmap();
        for (let i = 0; i < numberOfItems; i++) {
          sut.insert(i, i);
        }

        sut.clear();

        expect(sut.isEmpty()).toBe(true);
      }
    );
  });

  describe('isEmpty()', () => {
    test(
      'should return "true" if there is no elements in the map',
      () => {
        const sut = new Hashmap();

        const isEmpty = sut.isEmpty();

        expect(isEmpty).toBe(true);
      }
    );

    test(
      'should return "false" if there are any elements in the map',
      () => {
        const key = 1;
        const value = 'a';
        const sut = new Hashmap();
        sut.insert(key, value);

        const isEmpty = sut.isEmpty();

        expect(isEmpty).toBe(false);
      }
    );
  });
});
