var express = require('express');
var app = express(); 

//路由定义
var home  = require('./routes/index');
var posts = require('./routes/posts');
var signin = require('./routes/signin');
var signout = require('./routes/signout');
var signup = require('./routes/signup');




//路由
app.get('/',home);
app.use('/posts',posts);
app.use('/signin',signin);
app.use('/signout',signout);
app.use('/signup',signup);
