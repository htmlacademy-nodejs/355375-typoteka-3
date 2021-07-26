'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);
const posts = require(`./api/posts`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.use(`/`, posts);

app.use((req, res)=>{
  res
    .status(HttpCode.NOT_FOUND)
    .send(`not found`);
});

module.exports = {
  name: `--server`,
  run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
