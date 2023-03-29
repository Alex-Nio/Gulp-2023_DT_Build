# Описание проекта

Этот проект - отличное решение для создания адаптивной и кроссбраузерной верстки с использованием Gulp, WebPack и Babel.

## Запуск проекта

Чтобы запустить проект, необходимо склонировать репозиторий с помощью команды `git clone`, установить зависимости с помощью `npm install`, а затем запустить сборщик с помощью команды `$ npm run dev` или `$ gulp`. В режиме "production" проект собирается с помощью команды `$ npm run build`.

## Gulp

Gulp выполняет несколько важных задач для сборки проекта. Он сжимает HTML и SCSS файлы, добавляет вендорные префиксы, конвертирует шрифты в .ttf и woff/woff2, сжимает изображения и создает "svg cпрайты". Gulp также очищает папку с финальным проектом перед каждым запуском сборщика, чтобы не собирать мусор. Он также запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте и выгружает финальный проект на хостинг с помощью команды `$ npm run deployFTP`.

## WebPack

WebPack занимается обработкой файлов c JavaScript и позволяет модульное подключение скриптов. Он также позволяет писать код на любимом ES6+ и сжимает файлы JS в режиме "production".

## Деплой

Для деплоя папки `/dist` на GitHub Pages используется gh-pages. Деплой осуществляется по пути, указанному в `package.json` в поле `homepage`.

## Использование

Используя эту сборку, вы сможете создать адаптивную и кроссбраузерную верстку с помощью современных технологий и инструментов.

## :open_file_folder: Файловая структура

```
gulp
├── dist
├── gulp
│   ├── config
│   ├── tasks
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │   │   ├── svg
│   │   ├── js
│   │   │   ├── modules
│   │   │   │   ├── index.js
│   │   │   ├── app.js
│   │   ├── scss
│   │   │   ├── components
│   │   │   ├── config
│   │   │   │   ├── base
│   │   │   │   ├── helpers
│   │   │   │   ├── libs
│   │   │   ├── sections
│   │   │   ├── imports.scss
│   │   │   ├── main.scss
│   ├── files
│   ├── html
│   │   ├── components
│   │   ├── sections
├── index.html
├── webpack.config.js
├── gulpfile.js
├── package-lick.json
├── package.json
├── README.md
└── .gitignore
```
