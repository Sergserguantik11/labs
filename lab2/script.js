"use strict";
//Вариант 4(8-ой в журнале)

// Задание 1*
// Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
// Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
console.log("task1");
function bindFunction(callback, args) {
  callback.apply(this, args);
}

function F(f1, f2) {
  console.log("abcd " + f1 + " , " + f2);
}

bindFunction(F, ["e", "f", "g"]);


// Задание 2
// Напишите аналог встроенного метода slice для работы с массивами
console.log("task2");
function slice(array, fn, begin, end) {
  var i, cloned = [], size, len = array.length, start, upTo;
  end = (typeof end !== 'undefined') ? end : array.length;
  start = begin || 0;
  start = (start >= 0) ? start : Math.max(0, len + start);
  upTo = (typeof end == 'number') ? Math.min(end, len) : len;

  if (end < 0) {
    upTo = len + end;
  }

  size = upTo - start;

  if (size > 0) {
    cloned = new Array(size);
    if (array.charAt) {
      for (i = 0; i < size+1;i++) {
        cloned[i] = array.charAt(start + i);
      }
    } else {
      for (i = 0; i < size+1; i++) {
        cloned[i] = array[start + i];
      }
    }
  }

  return cloned;
}

function fn() {
}

var arr = [1, 2, 3, 4, 5, 6];
console.log(arr);
console.log(slice(arr, fn, 2, 3));

// Задание 3
// Функция должна перебрать все свойства объекта,
// преобразовать их имена в верхний регистр и вернуть в виде массива
console.log("task3");
var user = {
  name: "Sergey",
  surname: "Jershov"
};

user.age = 20;

function upperProps(obj) {
  var keyArray = [];
  for (var key in obj) {
    keyArray.push(key.toUpperCase());
  }
  return keyArray;
}

console.log(upperProps(user));

// Задание 3*
// Функция принимает объект и должна вернуть Proxy для этого объекта.
// Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

var numberObject = {};

var raisingNumToPow = {
  set: function (obj, prop, value) {
    if (!Number.isInteger(value)) {
      throw new TypeError('The value is not an integer');
    } else {
      value = value * value;
    }
    obj[prop] = value;
    return true;
  }
};

function createProxy(obj) {
  return new Proxy(obj, raisingNumToPow);
}

var newObj = createProxy(numberObject);

newObj.num1 = 2;
console.log(newObj.num1);

newObj.num2 = 5;
console.log(newObj.num2);