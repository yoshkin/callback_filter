// @ts-check

const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

// BEGIN (write your solution here)
export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null, []);
  }

  const mappedColl = [];
  const iteratorCallback = (item, index, err, result) => {
    if (err) {
      oncedCallback(err);
      mappedColl[index] = { status: 'rejected', value: item };
      return;
    }
    if (result) {
      mappedColl[index] = { status: 'fulfilled', value: item };
    }
    completed += 1;
    if (completed === length) {
      const filtered = mappedColl.filter(({ status }) => status === 'fulfilled');
      const results = filtered.map(({ value }) => value);
      oncedCallback(err, results);
    }
  };

  coll.forEach((item, index) => iteratee(item, iteratorCallback.bind(null, item, index)));
};
// END
