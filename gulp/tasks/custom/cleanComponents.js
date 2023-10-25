/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

const componentsDir = 'src/html/components/';

async function scssImportsRemove() {
  const pageFiles = plugins.glob.sync('src/styles/scss/pages/**/*.scss');

  for (const pageFile of pageFiles) {
    const pageContent = plugins.fs.readFileSync(pageFile, 'utf8');
    let updatedPageContent = pageContent;

    const scssImportRegex =
      /@import\s+(["'])\.\.\/\.\.\/\.\.\/\.\.\/html\/components\/([\w-]+)\/([\w-]+)\.scss\1;/g;

    updatedPageContent = updatedPageContent.replace(
      scssImportRegex,
      (match, p1, component, file) => {
        const componentPath = plugins.path.join(
          'src',
          'html',
          'components',
          component,
          `${file}.scss`
        );
        if (plugins.fs.existsSync(componentPath)) {
          return match;
        } else {
          console.log(
            plugins.chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
          );
          return '';
        }
      }
    );

    plugins.fs.writeFileSync(pageFile, updatedPageContent);
  }
}

async function jsImportsRemove() {
  const jsPageFiles = plugins.glob.sync('src/styles/js/pages/**/*.js');
  for (const jsPageFile of jsPageFiles) {
    const jsPageContent = plugins.fs.readFileSync(jsPageFile, 'utf8');
    let updatedJsPageContent = jsPageContent;

    const jsImportRegex =
      /import\s+(['"])(?:\.\.\/)*html\/components\/([\w-]+)\/([\w-]+)\.js\1;/g;

    updatedJsPageContent = updatedJsPageContent.replace(
      jsImportRegex,
      (match, relativePath, component, file) => {
        const componentPath = plugins.path.join(
          'src',
          'html',
          'components',
          component,
          `${file}.js`
        );
        if (plugins.fs.existsSync(componentPath)) {
          return match;
        } else {
          console.log(
            plugins.chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
          );
          return '';
        }
      }
    );

    plugins.fs.writeFileSync(jsPageFile, updatedJsPageContent);
  }
}

async function removeEmpty(dir, isRecursive = false) {
  const files = plugins.fs.readdirSync(dir);

  for (const file of files) {
    const filePath = plugins.path.join(dir, file);
    if (plugins.fs.statSync(filePath).isDirectory()) {
      await removeEmpty(filePath);
    } else {
      const content = plugins.fs.readFileSync(filePath, 'utf8');
      if (content.trim() === '') {
        console.log(
          plugins.chalk.red.bgYellow.bold(`Удален пустой файл - ${filePath}`)
        );
        plugins.fs.unlinkSync(filePath);
      }
    }
  }

  if (!isRecursive) {
    await jsImportsRemove();
    await scssImportsRemove();
  }

  const remainingFiles = plugins.fs.readdirSync(dir);

  if (remainingFiles.length === 0) {
    console.log(plugins.chalk.red.bgBlue.bold(`Удалена пустая папка - ${dir}`));
    plugins.fs.rmdirSync(dir);
  }
}

export async function cleanComponents() {
  await new Promise((resolve, reject) => {
    app.gulp
      .src(`${componentsDir}/**/*.{html,js,scss}`)
      .pipe(
        plugins.filter((file) => {
          return file.stat.size !== 0;
        })
      )
      .pipe(app.gulp.dest(`${componentsDir}`))
      .on('error', (err) => {
        console.error(err.message);
        reject(err);
      })
      .on('end', async () => {
        const components = plugins.fs.readdirSync(componentsDir);

        console.log(plugins.chalk.red('Components:'));

        components.forEach((component) => {
          console.log(`- ${component}`);
        });

        await removeEmpty(componentsDir, true);

        resolve();
      });
  });
}
