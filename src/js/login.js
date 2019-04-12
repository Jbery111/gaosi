require(["require.config"],function(){
    require(["jquery"],() => {
        class Login{
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
                        url: "http://localhost/api/login.php",
                        method: "POST",
                        data: {username,password},
                        dataType: "json",
                        success : function(res){
                            console.log(1);
                            if(res.res_code === 1){
                                $("#login").hide();
                                $("#modal").hide();
                                $("#login-btn").hide();
                                $("#after-login").show();
                                $("#name").html(username);
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
        new Login();
    })
})