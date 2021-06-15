'use strict';

const http = require(`http`);
const {readFile} = require(`fs`).promises;
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `./mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>My first server</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res)=>{
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const content = await readFile(FILENAME, `utf8`);
        const data = JSON.parse(content);
        const message = data.map(({title})=>`<li>${title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (e) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    default: sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
};

module.exports = {
  name: `--server`,
  run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, ()=>{
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message})=>{
        console.error(`Ошибка при создании сервера ${message}`);
      });

  }
};
