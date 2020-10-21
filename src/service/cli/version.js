'use strict';

const jsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(jsonFile.version);
  }
};
