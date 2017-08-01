var session = require('express-session');

function checkLogin(req,res,next){
    if(!req.session.user){
        req.flash('error','未登录!');
        res.redirect('/login');
    }
    next();
}


function checkNotLogin(req,res,next){
    if(req,session.user){
        req.flash('error','已登录');
        res.redirect('back'); //返回之前的登录页面
    }
    next();
}


exports.checkLogin = checkLogin;
exports.checkNotLogin = checkNotLogin;