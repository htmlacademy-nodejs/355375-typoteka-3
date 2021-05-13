'use strict';

const chalk = require(`chalk`);
const jsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(jsonFile.version));
  }
};
