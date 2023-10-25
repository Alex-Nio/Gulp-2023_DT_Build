/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const clean = () => {
  return plugins.del(app.path.clean);
};
