require(["require.config"],function(){
	require(["jquery","header","footer","url","template"],function($,header,footer,url,template){
		console.log(1);
		class Sekkisei{
			constructor() {
				this.render();
			}
			
			render() {
				// 请求分类数据
				$.ajax({
					url : url.baseUrl + "caty",
					method : "GET",
					dataType: "json",
					success : function (res) {
						console.log(res);
						if(res.res_code === 1){
							let list = res.res_body.list;
							// template 是模块提供的方法，用它来渲染模板引擎
							// 第一个参数是模板引擎的script标签的id名（不用加#）
							// 第二个参数是个对象，传模板里需要的数据
							var html = template("catyList", { list });
							console.log($("#content--list"));
							$("#content--list").html(html);
						}	
					}
				})
			}
		}
		 return new Sekkisei();
	})
})