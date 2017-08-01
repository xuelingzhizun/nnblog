<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="UTF-8" />
        <title>
            Blog
        </title>
        <link rel="stylesheet" href="stylesheets/style.css">
    </head>
    
    <body>
       <header>
            <h1>
                登陆
            </h1>
        </header>

        <nav>
            <span>
                <a title="主页" href="/">
                    home
                </a>
            </span>
            <span>
                <a title="登录" href="/login">
                    login
                </a>
            </span>
            <span>
                <a title="注册" href="/reg">
                    register
                </a>
            </span>
        </nav>

        <article>
            <form method="post">
                用户名：
                <input type="text" name="name" />
                <br />
                密&nbsp&nbsp&nbsp&nbsp码：
                <input type="password" name="password" />
                <br />
                <input type="submit" value="登录" />
            </form>
        </article>
    </body>

</html>