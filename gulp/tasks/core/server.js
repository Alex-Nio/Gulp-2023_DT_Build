/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';
import { fileURLToPath } from 'url';

// Получаем абсолютный путь к текущему модулю
const __filename = fileURLToPath(import.meta.url);
const __dirname = plugins.path.dirname(__filename);

const configPath = plugins.path.join(
  __dirname,
  '..',
  '..',
  'config',
  'browser.json'
); // Абсолютный путь к файлу config.json

const createInitialConfig = async (configPath) => {
  const initialConfig = { defaultBrowser: '' };

  try {
    await plugins.fspromise.writeFile(
      configPath,
      JSON.stringify(initialConfig, null, 2),
      'utf-8'
    );
    console.log(
      plugins.chalk.green(
        `Создан файл конфигурации браузера по умолчанию: ${configPath}`
      )
    );
  } catch (err) {
    console.error('Ошибка создания файла конфигурации браузера:', err);
  }
};

export const server = async (done) => {
  const browsers = ['firefox', 'opera', 'chrome'];

  // Проверка наличия файла конфигурации
  try {
    await plugins.fspromise.access(configPath);
  } catch (err) {
    // Файл не существует, создайте его с начальным содержимым
    await createInitialConfig(configPath);
  }

  // Чтение файла конфигурации
  let config = {};

  try {
    const configData = await plugins.fspromise.readFile(configPath, 'utf-8');
    config = JSON.parse(configData);
  } catch (err) {
    console.error('Ошибка чтения файла конфигурации:', err);
  }

  let selectedBrowser = config.defaultBrowser || ''; // Используем браузер по умолчанию из конфигурации

  // Если браузер по умолчанию не установлен, предложим выбрать браузер
  if (!selectedBrowser) {
    const answers = await plugins.inquirer.prompt([
      {
        type: 'list',
        name: 'browser',
        message: 'Выберите браузер для запуска:',
        choices: browsers,
      },
      {
        type: 'confirm',
        name: 'setDefault',
        message: 'Сделать выбранный браузер браузером по умолчанию?',
        default: false,
      },
    ]);

    selectedBrowser = answers.browser;
    const setDefault = answers.setDefault;

    if (setDefault) {
      config.defaultBrowser = selectedBrowser;

      // Запись выбранного браузера в файл конфигурации
      try {
        await plugins.fspromise.writeFile(
          configPath,
          JSON.stringify(config, null, 2),
          'utf-8'
        );
      } catch (err) {
        console.error('Ошибка записи файла конфигурации:', err);
      }
    }
  }

  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    notify: true,
    port: 3000,
    browser: selectedBrowser,
  });

  done();
};
