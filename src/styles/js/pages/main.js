import { variables } from '../core/variables'; // Переменные
import { functions } from '../core/exports'; // Функции
import '../../../html/components/test-component/test-component.js';

// Пример вызова функции
const time = functions.getCurrentTime();
console.log(time);
// Пример деструктуризации с одной переменной
const { helloWorld } = variables;
console.log(helloWorld);
