import { plugins } from '../../config/plugins.js';

export const createPage = () => {
  const pageName = process.argv.includes('--name')
    ? process.argv[process.argv.indexOf('--name') + 1]
    : '';

  if (!pageName) {
    console.error('Название страницы не указано!');
    return;
  }

  const viewsFolderPath = plugins.path.join('src', 'html', 'views');
  const pageFolderPath = plugins.path.join(viewsFolderPath, pageName);
  const pageFilePath = plugins.path.join(pageFolderPath, `${pageName}.html`);

  // Создать папку views, если она не существует
  if (!plugins.fs.existsSync(viewsFolderPath)) {
    plugins.fs.mkdirSync(viewsFolderPath, { recursive: true });
  }

  // Создать папку с именем страницы, если она не существует
  if (!plugins.fs.existsSync(pageFolderPath)) {
    plugins.fs.mkdirSync(pageFolderPath, { recursive: true });

    // Создать папку "sections" внутри папки страницы, если она не существует
    const sectionsFolderPath = plugins.path.join(pageFolderPath, 'sections');

    plugins.fs.mkdirSync(sectionsFolderPath, { recursive: true });

    console.log(
      plugins.chalk.green(
        `Создана страница '${pageName}' в папке '${pageFolderPath}'`
      )
    );

    console.log(
      plugins.chalk.green('Создана папка "sections" внутри папки страницы')
    );
  }

  // Создать файл страницы HTML
  plugins.fs.writeFileSync(pageFilePath, '');

  console.log(
    plugins.chalk.green(
      `Создан файл страницы '${pageName}.html' в папке '${pageFolderPath}'`
    )
  );

  // Добавить импорт в файл страницы SCSS
  const pageScssFolderPath = plugins.path.join(
    'src',
    'styles',
    'scss',
    'pages',
    `${pageName}`
  );

  const pageScssFilePath = plugins.path.join(
    pageScssFolderPath,
    `${pageName}.scss`
  );

  const importScssStatement = '@import "./../../config/main.scss";';

  // Создать папку с именем страницы в SCSS, если она не существует
  if (!plugins.fs.existsSync(pageScssFolderPath)) {
    plugins.fs.mkdirSync(pageScssFolderPath, { recursive: true });
  }

  // Создать папку "sections" внутри папки страницы SCSS, если она не существует
  const sectionsFolderPath = plugins.path.join(pageScssFolderPath, 'sections');

  if (!plugins.fs.existsSync(sectionsFolderPath)) {
    plugins.fs.mkdirSync(sectionsFolderPath, { recursive: true });

    console.log(
      plugins.chalk.green(
        'Создана папка "sections" внутри SCSS директории страницы'
      )
    );
  }

  // Создать файл страницы SCSS, если он не существует
  if (!plugins.fs.existsSync(pageScssFilePath)) {
    plugins.fs.writeFileSync(pageScssFilePath, importScssStatement);
  }

  console.log(
    plugins.chalk.green(
      `Создан SCSS файл страницы '${pageName}.scss' в директории '${pageScssFolderPath}'`
    )
  );

  // Добавить импорт в файл страницы JS
  const pageJsFolderPath = plugins.path.join('src', 'styles', 'js', 'pages');
  const pageJsFilePath = plugins.path.join(pageJsFolderPath, `${pageName}.js`);

  // Создать папку с именем страницы в JS, если она не существует
  if (!plugins.fs.existsSync(pageJsFolderPath)) {
    plugins.fs.mkdirSync(pageJsFolderPath, { recursive: true });
  }

  // Создать файл страницы JS, если он не существует
  if (!plugins.fs.existsSync(pageJsFilePath)) {
    plugins.fs.writeFileSync(pageJsFilePath, '');
  }

  console.log(
    plugins.chalk.green(
      `Создан JavaScript файл страницы '${pageName}.js' в директории '${pageJsFolderPath}'\n`
    )
  );

  return Promise.resolve();
};
