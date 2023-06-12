/* eslint-disable */
import '../../../html/components/test-component/test-component.js';
import { variables } from '../core/variables';
import { functions } from '../core/exports';

functions.sayHelloWorld(); // Вызов функции sayHelloWorld
functions.sayGoodbye(); // Вызов функции sayGoodbye

console.log(variables.firstName); // Вывод значения переменной firstName
console.log(variables.lastName); // Вывод значения переменной lastName
console.log(variables.age); // Вывод значения переменной age

// Пример деструктуризации с одной переменной
const { firstName } = variables;
console.log(firstName); // Вывод значения переменной firstName
