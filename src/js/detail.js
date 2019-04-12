require(["require.config"],function(){
	require(["jquery","header","footer","url","template"],function($,header,footer,url,template){
		class Detail{
			constructor() {
				this.init();
				new header().init().then(() => {
					//购物车显示数量
					let carNum = JSON.parse(localStorage.getItem("cart")).reduce((num,next) => {
						num += next.num;
						return num;
					},0)
					$("#red").html(carNum);
				})
			}
		init(){
			//获取ID，然后请求数据
		this.shop_id = location.search.slice(4);
		this.render();
		}
		
         render(){
			$.ajax({
				url : url.baseUrl + "detail?id="+this.shop_id,
				method : "GET",
				dataType: "json",
				success : res => {
					// console.log(res);
					if(res.res_code === 1){
						let list = res.res_body.list
						this._list= list[0];
						this._list.id =this.shop_id;
						// console.l
						// template 是模块提供的方法，用它来渲染模板引擎
						// 第一个参数是模板引擎的script标签的id名（不用加#）
						// 第二个参数是个对象，传模板里需要的数据
						var html = template("detailList", list[0]);
					
						$("#detail-container").html(html);
						this.add();
						this.reduce();
						this.addToCar();
						this.inputLimit();
					}	
					
				}
			})
		 }
		 reduce(){
			 console.log($("#bottomArrow"));
			$("#bottomArrow").on("click",function(){
				// console.log($("#num").html())
				$("#num").val(Number($("#num").val())-1);
				if($("#num").val() < 1) $("#num").val(1);
				
			})
		 }
		 add(){
			 console.log(0);
			 $("#topArrow").on("click",function(){
				 $("#num").val(Number($("#num").val())+1);
			 })
		 }
		 
		//购物车
		addToCar() {
			//加入购物车点击事件
			$("#addbutton").on("click", () => {
				//存之前看是否有记录
				let cart = localStorage.getItem("cart"),
				inputNum = $("#num").val()*1;
				if(cart){
					cart = JSON.parse(cart);
					//some判断是否存在相同id
					let count;
					if(cart.some((item,index) => {count = index; return item.id === this.shop_id;})){
						cart[count].num += inputNum;
					}else{
						cart.push({...this._list,num : inputNum});
					}
					localStorage.setItem("cart", JSON.stringify(cart));
				}else{
					//没有储存过商品
				localStorage.setItem("cart", JSON.stringify([
					{...this._list,num : inputNum}
					]));
				}
				//购物车显示数量
				let carNum = JSON.parse(localStorage.getItem("cart")).reduce((num,next) => {
					num += next.num;
					return num;
				},0)
				$("#red").html(carNum);
			})
			//立即购买点击事件
			$("#buyNow").on("click" ,() => {
				$("#addbutton").click();
				location.href = "/html/cart.html";
			})
		}
		//数量输入框的大小限制
		inputLimit() {
			$("#num").on("change",function(){
				if($(this).val() < 1 || $(this).val() === "") $(this).val(1);
			})
		}
	}

		 return new Detail();
	})
})