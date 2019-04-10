
//面向对象的方式定义header模块
define( ["jquery"],function($) {
    class Header{
        constructor (){
            this.init().then(() =>{
                this.login;
            });
        }
        init(){
            return new Promise((resolve,reject) =>{
                $("#header-container").load("/html/module/header.html",function(){
                    resolve();
                });
            })
            
        }

       
    
    }
    return new Header();
});