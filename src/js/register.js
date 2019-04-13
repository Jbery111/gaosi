require(["require.config"],function(){
    require(["jquery"],() => {
        class Register{
            constructor(){
                this.submit();
            }
            //登录提交
            submit() {
                $("#login-btn1").on("click", () => {
                    let username = $("#username").val(),
                        password = $("#password").val();
                    console.log(username,password);
                    $.ajax({
                        url: "http://localhost/api/register.php",
                        method: "POST",
                        data: {username,password},
                        dataType: "json",
                        success : function(res){
                            if(res.res_code === 1){
                                if(confirm("注册成功，是否前往首页"))
                                    location.href = "/index.html";
                                //存
                                localStorage.setItem("login", JSON.stringify({username}));
                            }else{
                                alert(res.res_info);
                            }
                        }
                    })
                })
            }
        }
        new Register();
    })
})