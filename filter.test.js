// @ts-check

import filter from '../filter';

describe('Filter', () => {
  it('should return items in proper order 1', () => {
    const coll = [5, 4, 1, 2, 6, 7, 8, 3];
    const randomTimeout = () => Math.ceil(Math.random() * 10);
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        setTimeout(() => callback(null, item % 2 === 0), randomTimeout());
      }, (err, result) => {
        expect(result).toEqual([4, 2, 6, 8]);
        done();
      });
    });
  });

  it('should return items in proper order 2', () => {
    const coll = [5, 4, 1, 2, 6, 7, 3, 8];
    const randomTimeout = () => Math.ceil(Math.random() * 10);
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        setTimeout(() => callback(null, item % 2 === 1), randomTimeout());
      }, (err, result) => {
        expect(result).toEqual([5, 1, 7, 3]);
        done();
      });
    });
  });

  it('should return items in proper order 3', () => {
    const coll = [2, 8, 2, 1, 1, 3, 7, 10, 1, 4];
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        setTimeout(() => callback(null, item % 2 === 0), item);
      }, (err, result) => {
        expect(result).toEqual([2, 8, 2, 10, 4]);
        done();
      });
    });
  });

  it('should work with empty array', () => {
    const coll = [];
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        callback(null, item % 2 === 0);
      }, (err, result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  it('should work without providing callback', () => {
    const coll = [];
    let callCount = 0;
    filter(coll, (item, callback) => {
      callCount += 1;
      callback(null, item % 2 === 0);
    });
    expect(callCount).toEqual(0);
  });

  it('should work with falsy', () => {
    const coll = [0, -1, -2, 3, -4];
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        callback(null, item <= 0);
      }, (err, result) => {
        expect(result).toEqual([0, -1, -2, -4]);
        done();
      });
    });
  });

  it('should call callback only once in case of error', () => {
    const coll = [0, 1, 2, 3, 4];
    let errorsCount = 0;
    filter(coll, (item, callback) => {
      callback(1);
    }, (err) => {
      errorsCount += err;
    });
    expect(errorsCount).toEqual(1);
  });

  it('should undefined filtered', () => {
    const coll = [undefined, 1, 2, undefined, 4];
    const randomTimeout = () => Math.ceil(Math.random() * 10);
    return new Promise((done) => {
      filter(coll, (item, callback) => {
        setTimeout(() => callback(null, item === undefined), randomTimeout());
      }, (err, result) => {
        expect(result).toEqual([undefined, undefined]);
        done();
      });
    });
  });
});
