function checkLogin(req,res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        return res.redirect('/signin');
    }else{
        req.flash('error','已登录');
        return req.redirect('back');
    }

    next();
}

module.exports = checkLogin;