/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';
import { configFTP } from '../../config/ftp.js';

export const ftp = () => {
  configFTP.log = plugins.util.log;
  const ftpConnect = plugins.vinylFTP.create(configFTP);

  return plugins.app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      plugins.app.plugins.plumber(
        plugins.app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      ftpConnect.dest(`/${plugins.app.path.ftp}/${plugins.app.path.rootFolder}`)
    );
};
