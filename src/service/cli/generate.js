'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const ExitCode = {
  error: 1,
  success: 0,
};

const AnnounceRestrict = {
  min: 1,
  max: 5
};

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const TEXTS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const generateDatePublication = ()=>{
  const currentDate = Date.now();
  const date = new Date();
  const startDate = date.setMonth(date.getMonth() - 3);
  const temp = new Date(getRandomInt(startDate, currentDate));
  return temp.toISOString().replace(/T/g, ` `).replace(/\..+/, ``);
};

const generatePublication = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(TEXTS).slice(0, AnnounceRestrict.max).join(` `),
    fullText: shuffle(TEXTS).slice(0, getRandomInt(1, TEXTS.length - 1)).join(` `),
    createdDate: generateDatePublication(),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1))
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countPublication > MAX_COUNT) {
      console.info(`Не больше ${MAX_COUNT} публикаций`);
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generatePublication(countPublication));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};