'use strict';

const express = require(`express`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();
const DEFAULT_PORT = 8080;

app.set(`views`, `${__dirname}/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(`${__dirname}/public`));

app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);


app.listen(DEFAULT_PORT, ()=>{
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});

app.get(`/`, (req, res)=>{
  res.render(`main`);
});

app.get(`/register`, (req, res)=>{
  res.render(`auth/sign-up`);
});

app.get(`/login`, (req, res)=>{
  res.render(`auth/sign-in`);
});

app.get(`/search`, (req, res)=>{
  res.render(`search/search`);
});

app.get(`/categories`, (req, res)=>{
  res.render(`categories/all-categories`);
});
