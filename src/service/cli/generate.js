'use strict';

const {writeFile, readFile} = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle} = require(`../../utils`);
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const FILE_NAME = `mocks.json`;
const ExitCode = {
  error: 1,
  success: 0,
};

const AnnounceRestrict = {
  min: 1,
  max: 5
};

const readContent = async (path)=>{
  try {
    const content = await readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(e));
    throw e;
  }
};

const writeJsonFile = async (fileName, content)=>{
  const json = JSON.stringify(content);
  await writeFile(fileName, json);
};

const generateDatePublication = ()=>{
  const currentDate = Date.now();
  const date = new Date();
  const startDate = date.setMonth(date.getMonth() - 3);
  const temp = new Date(getRandomInt(startDate, currentDate));
  return temp.toISOString().replace(/T/g, ` `).replace(/\..+/, ``);
};

const generatePublication = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, AnnounceRestrict.max).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    createdDate: generateDatePublication(),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1))
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const sentences = await readContent(FILE_SENTENCES_PATH);
      const [count] = args;
      const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;
      if (countPublication > MAX_COUNT) {
        console.info(chalk.red(`Не больше ${MAX_COUNT} публикаций`));
        process.exit(ExitCode.error);
      }
      const publications = generatePublication(countPublication, titles, categories, sentences);

      await writeJsonFile(FILE_NAME, publications);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (e) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
