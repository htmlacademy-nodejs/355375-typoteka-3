'use strict';

const express = require(`express`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();
const DEFAULT_PORT = 8080;

app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);


app.listen(DEFAULT_PORT, ()=>{
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`);
});

app.get(`/`, (req, res)=>{
  res.send(`/`);
});

app.get(`/register`, (req, res)=>{
  res.send(`/register`);
});

app.get(`/login`, (req, res)=>{
  res.send(`/login`);
});

app.get(`/search`, (req, res)=>{
  res.send(`/search`);
});

app.get(`/categories`, (req, res)=>{
  res.send(`/categories`);
});
