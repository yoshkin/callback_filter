# callback_filter

filter.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает коллекцию и применяет колбек к каждому элементу. Если колбек вернёт false - элемент необходимо отфильтровать. Отфильтрованная коллекция должна сохранять порядок элементов.

```js
Примеры
filter([5, 4, 1, 2], (item, callback) => {
  callback(null, item % 2 === 0);
}, (err, results) => {
  console.log(results); // => [4, 2]
});
```
