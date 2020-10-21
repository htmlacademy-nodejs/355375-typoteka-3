'use strict';

const {Cli} = require(`./cli`);

console.log(Cli);

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  error: 1,
  success: 0,
};

console.log(process.argv);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
if (userArguments.length === 0 || !Cli[userArguments]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userArguments].run(userArguments.slice(1));


