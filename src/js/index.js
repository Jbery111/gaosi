require(["require.config"],function(){
	require(["jquery","Swiper","header","url","template","footer",],function($,Swiper,header,url,template,footer){
		console.log(1);
		class Index {
			constructor (){
				new header().init();
				this.textfield = $("#textfield");
				this.searchContainer = $("#search_result_search_fm");
				this.search();
				// this.caty();
				this.render();
				this.swiper();
			}
			// 轮播图
            swiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    // 自动播放
                    autoplay:true,
                    //淡入淡出
                    effect : 'fade',
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true,
                    },
                  })   
            }
			search () {
				let _this = this;
				this.textfield.on("keyup", function () {
					let keyWord = $(this).val().trim();
					// 内容不为空才请求
					if(keyWord !== ""){
						// getJSON可以完成jsonp跨域，数据返回了自动调用后面的回调
						$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
							let list = res.s;
							console.log(list);
							let ul = $("<ul>");
							list.forEach( function(item, index) {
								$("<li>").html(item).appendTo(ul);
							});
							_this.searchContainer.empty().show().append(ul);
						})
					}else{
						// 把上一次请求渲染出来的container隐藏
						_this.searchContainer.hide();
					}

					
				})

				this.textfield.on("blur", function () {
					setTimeout(() => {
						_this.searchContainer.hide();
					},200);
					
				})

				this.searchContainer.on("click", "li", function (e) {
					_this.textfield.val($(this).html());
					_this.searchContainer.hide();
				})
			}

			// caty () {
			// 	// 请求分类数据
			// 	$.ajax({
			// 		url : url.baseUrl + "/caty",
			// 		method : "GET",
			// 		dataType: "json",
			// 		success : function (res) {
			// 			if(res.res_code === 1){
			// 				let list = res.res_body.list;
			// 				// template 是模块提供的方法，用它来渲染模板引擎
			// 				// 第一个参数是模板引擎的script标签的id名（不用加#）
			// 				// 第二个参数是个对象，传模板里需要的数据
			// 				var html = template("catyList", { list });
			// 				// console.log(html);
			// 				$("#catyListContainer").html(html);
			// 			}
						
			// 		}
			// 	})
			// }
			render(){
				$.ajax({
					url : url.baseUrl + "index?id=1",
					method : "GET",
					dataType: "json",
					success : function (res) {
						console.log(res);
						if(res.res_code === 1){
							let list = res.res_body.list;
							console.log(template);
							// template 是模块提供的方法，用它来渲染模板引擎
							// 第一个参数是模板引擎的script标签的id名（不用加#）
							// 第二个参数是个对象，传模板里需要的数据
							var html = template("indexList", { list });

							$("#brand-adv").html(html);
						}	
					}
				})
			}
		}
		new Index();
	})
})