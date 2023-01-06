type Key = number | string

interface IItem<T> {
  key: Key;
  value: T;
}

interface IHashmap<T> {
  search: (key: Key) => T | null;
  insert: (key: Key, value: T) => T;
  delete: (key: Key) => T | null;
  clear: () => void;
  getSize: () => number;
  isEmpty: () => boolean;
}

export class Hashmap<T> implements IHashmap<T> {
  private static readonly primeNumbers = [
    5, 11, 23, 53, 97, 193, 389, 769, 1543, 3079, 6151, 12289,
    24593, 49157, 98317, 196613, 393241, 786433, 1572869,
    3145739, 6291469, 12582917, 25165843, 50331653, 100663319,
    201326611, 402653189, 805306457, 1610612741
  ];

  private readonly maxLoadFactor: number;
  private map: (IItem<T> | null)[];
  private maxSize: number;
  private size: number;

  constructor(maxSize = 52) {
    this.maxLoadFactor = 0.75;
    this.maxSize = this.chooseNextPrimeNumber(maxSize);
    this.map = new Array<IItem<T> | null>(this.maxSize).fill(null);
    this.size = 0;
  }

  private resize() {
    const currentMap = this.map;

    this.maxSize = this.chooseNextPrimeNumber(this.maxSize);
    this.map = new Array<IItem<T> | null>(this.maxSize).fill(null);
    this.size = 0;

    for (const item of currentMap) {
      if (item) {
        this.insert(item.key, item.value);
      }
    }
  }

  private chooseNextPrimeNumber(number: number) {
    let currentIndex = 0;

    if (number >= Hashmap.primeNumbers[Hashmap.primeNumbers.length - 1]) {
      throw new Error('The hashmap max size was exceeded');
    }

    while (Hashmap.primeNumbers[currentIndex] <= number) {
      currentIndex++;
    }

    return Hashmap.primeNumbers[currentIndex];
  }

  private generateHash(key: Key) {
    let hash = 0;
    const keyStr = `${key}`;

    for(let i = 0; i < keyStr.length; i++) {
      hash += Math.pow(31, keyStr.length - i) * keyStr.charCodeAt(i);
    }

    return hash % this.maxSize;
  }

  insert(key: Key, value: T) {
    let currentIndex = this.generateHash(key);
    let slotContent = this.map[currentIndex];

    while (slotContent) {
      if (slotContent.key === key) {
        slotContent.value = value;

        return value;
      }

      currentIndex = (currentIndex + 1) % this.maxSize;
      slotContent = this.map[currentIndex];
    }

    this.map[currentIndex] = { key, value };
    this.size++;

    if (this.size > Math.floor(this.maxSize * this.maxLoadFactor)) {
      this.resize();
    }

    return value;
  }

  search(key: Key) {
    let currentIndex = this.generateHash(key);
    let slotContent = this.map[currentIndex];

    while (slotContent) {
      if (slotContent.key === key) {
        return slotContent.value;
      }

      currentIndex = (currentIndex + 1) % this.maxSize;
      slotContent = this.map[currentIndex];
    }

    return null;
  }

  delete(key: Key) {
    let currentIndex = this.generateHash(key);
    let slotContent = this.map[currentIndex];
    let deletedValue = null;

    while (slotContent) {
      if (slotContent.key === key) {
        deletedValue = slotContent.value;
        this.map[currentIndex] = null;
        this.size--;

        currentIndex = (currentIndex + 1) % this.maxSize;
        slotContent = this.map[currentIndex];
        break;
      }

      currentIndex = (currentIndex + 1) % this.maxSize;
      slotContent = this.map[currentIndex];
    }

    while (slotContent) {
      const key = slotContent.key;
      const value = slotContent.value;

      this.map[currentIndex] = null;
      this.size--;
      this.insert(key, value);

      currentIndex = (currentIndex + 1) % this.maxSize;
      slotContent = this.map[currentIndex];
    }

    return deletedValue;
  }

  clear() {
    this.size = 0;

    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = null;
    }
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return !this.size;
  }
}
