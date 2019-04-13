
//面向对象的方式定义header模块
define( ["jquery"],function($) {
    class Header{
        constructor (){
            
        }
        init(){
            let _this = this;
            return new Promise((resolve,reject) =>{
                $("#header-container").load("/html/module/header.html",function(){
                    _this.toIndex();
                    resolve();
                });
            })
            
        }
        //跳转首页
       toIndex(){
            $("#logoImg").on("click",() => {
                location.href = "/index.html";
            })
       }
    
    }
    return Header;
});