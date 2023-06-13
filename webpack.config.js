/* eslint-disable */
import * as pathNode from 'path';
import fs from 'fs';

const srcFolder = 'src';
const buildFolder = 'dist';

const path = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(buildFolder),
};

const getPageEntries = () => {
  const pagesPath = pathNode.resolve(`${path.src}/styles/js/pages`);
  const pages = fs.readdirSync(pagesPath);
  const pageEntries = {};

  pages.forEach((page) => {
    const pageName = page.split('.').slice(0, -1).join('.');
    pageEntries[pageName] = pathNode.resolve(`${pagesPath}/${page}`);
  });

  return pageEntries;
};

export const webpackConfig = (isMode) => ({
  entry: {
    ...getPageEntries(),
    // main: ['@babel/polyfill', `${path.src}/styles/js/main.js`],
  },
  mode: isMode ? 'development' : 'production',
  output: {
    path: `${path.build}/js`,
    filename: '[name].min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
