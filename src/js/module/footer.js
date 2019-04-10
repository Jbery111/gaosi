
define(["jquery"], $ => {
    class Footer{
        
        constructor(){
            this.init();
        }
        init(){
            console.log("footer");
            return new Promise((resolve,reject) => {
                $("#footer-container").load("/html/module/footer.html",() => {
                    resolve();
                })
            })
            
        }
    }
    return new Footer();
});