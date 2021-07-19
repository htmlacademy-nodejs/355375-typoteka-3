'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res)=>{
  res.render(`publications/my`);
});

myRouter.get(`/comments`, (req, res)=>{
  res.render(`comments/comments`);
});

module.exports = myRouter;
