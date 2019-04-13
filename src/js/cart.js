require(["require.config"],() => {
    require(["jquery","template","header","footer"],($,template,header) => {
        class Cart{
            constructor(){
                new header().init();
                this.getData();
                this.checkAll();
                this.check();
                this.addNum();
                this.reduceNum();
                this.sumMoney();
                this.sumNum();
                this.inputNum();
                this.warningModalCenter();
                $(window).resize();
                this.deleteShop();
                this.okDelete();
                this.cancelDelete();
            }
            //取商品
            getData() {
                let cart = localStorage.getItem("cart");
                if(cart){
                    cart = JSON.parse(cart);
                    let html = template("shop-cart", {list:cart});
                    $("#list-container").html(html);
                }else{
                    //不存在
                    this.blankCar();
                }
                //warning居中                                                                                                                                                                                                                                                                                                                                                                     
                $("#warning").css({"left" : $(window).width()/2, "top" : $(window).height()/2});
                $("#modal-warning").css({
                    "width" : $(window).width(),
                    "height" : $(window).height()
                });
                this.count = $(".check").length;
            }
            //全选
            checkAll() {
                let _this = this;
                $("#shopping--wrap").on("click","#checkAll" ,function(){
                        //记得用prop才能取到布尔值
                        $(".check").prop("checked",$(this).prop("checked"));
                        //保证两个全选按钮值一致
                        _this.count = $(this).prop("checked") ? $(".check").length : 0;
                        //算钱
                        _this.sumMoney();
                        _this.sumNum();
                })
            }
            //单选采用事件委托
            check() {
                let _this = this;
                $("#shopping--wrap").on("click",".check", function(){
                    _this.count += $(this).prop("checked") ? 1 : -1;
                    $("#checkAll").prop("checked",_this.count === $(".check").length);
                    // //算钱
                    _this.sumMoney();
                    _this.sumNum();
                })
            }
            //增加数量
            addNum() {
                let _this = this;
                $("#shopping--wrap").on("click",".addNum", function(){
                    //设置输入框的值
                    $(this).prev().val(Number($(this).prev().val())+1);
                    let price = $(this).parent().parent().prev().html().slice(1),
                        num = $(this).prev().val();
                    $(this).parent().parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().parent().attr("data-id"),num);
                })
            }
            //减少数量
            reduceNum() {
                let _this = this;
                $("#shopping--wrap").on("click",".reduceNum", function(){
                    $(this).next().val(Number($(this).next().val())-1);
                    //输入框数量最少为1
                    if($(this).next().val() < 1)
                        $(this).next().val(1);
                    let price = $(this).parent().parent().prev().html().slice(1),
                        num = $(this).next().val();
                    $(this).parent().parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().parent().attr("data-id"),num);
                })
            }
            //直接输入值
            inputNum() {
                let _this = this;
                $("#shopping--wrap").on("change",".inputNum", function(){
                    if($(this).val() < 1) $(this).val(1);
                    let price = $(this).parent().parent().prev().html().slice(1),
                        num = $(this).val();
                    $(this).parent().parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().parent().attr("data-id"),num);
                })
            }
            //判断是否满足优惠
            isfreeSpan() {
                if($("#totalMoney").html() >= 769){
                    $("#addMore").addClass("active");
                    $("#isSatisfy").html("已满足享好礼七件套优惠");
                }else if($("#totalMoney").html() >= 569){
                    $("#addMore").addClass("active");
                    $("#isSatisfy").html("已满足享好礼六件套优惠");
                }else if($("#totalMoney").html() >= 269){
                    $("#addMore").addClass("active");
                    $("#isSatisfy").html("已满足享好礼四件套优惠");
                }else{
                    $("#addMore").removeClass("active");
                    $("#isSatisfy").html("您还未享受到的优惠去");
                }
            }
            //算总价
            sumMoney() {
                let money = 0;
                $.each($(".money"), (i,item) =>{
                    //这个遍历出来是原生对象,计算被选中的
                    if(item.parentNode.children[0].children[0].children[0].checked)
                        money += Number(item.innerHTML.slice(1));
                })
                $("#totalMoney").html(money.toFixed(2));
                this.isfreeSpan();
            }
            //算数量
            sumNum() {
                let number = 0;
                $.each($(".inputNum"), (i,item) => {
                    if(item.parentNode.parentNode.parentNode.children[0].children[0].children[0].checked){
                        number += Number(item.value);
                    }
                })
                $("#numCount").html(number);
                $("#totalNum").html("("+number+")");
            }
            //存localstorage
            storage(id,num) {
                let cart = JSON.parse(localStorage.getItem("cart")),
                    index = 0;
                cart.some((item,i) => {
                    index = i;
                    return item.id == id;
                })
                cart[index].num = Number(num);
                localStorage.setItem("cart",JSON.stringify(cart));
            }
            //warning-modal居中
            warningModalCenter() {
                $(window).resize(() => {
                    $("#delete-modal").css({"left" : $(window).width()/2, "top" : $(window).height()/2});
                    $("#modal-bg").css({
                        "width" : $(window).width(),
                        "height" : $(window).height()
                    });
                    //空购物车
                    $(".blank").css({
                        "left" : $(window).width()/2,
                        "top" : $(window).height()/2
                    });
                })
            }
            //删除商品警告
            deleteShop() {
                $("#shopping--wrap").on("click",".delBtn", function(){
                   $("#delete-modal").show();
                   $("#okBtn").attr("data-id",$(this).parent().parent().parent().attr("data-id"));
                })
            }
            //确认删除商品
            okDelete() {
                let _this = this;
                $("#okBtn").on("click", function(){
                    $("#delete-modal").hide();
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    //删除localstorage
                    cart = cart.filter((item) => {
                        return item.id != $(this).attr("data-id");
                    })
                    //判断是否全部清空了
                    if(cart.length === 0){
                        _this.blankCar();
                        //同时记得清空localStorage,不然刷新页面，
                        //上面判断cart(虽然为空，但是是字符串类型)，会为true
                        localStorage.removeItem("cart");
                    }else{
                        localStorage.setItem("cart",JSON.stringify(cart));
                    }
                    //删除列表显示
                    $.each($(".shop-list"),(i,item) => {
                        if($(item).attr("data-id") == $(this).attr("data-id"))
                            item.remove();
                    })
                    _this.sumMoney();
                    _this.sumNum();
                })
            }
            //取消删除商品
            cancelDelete() {
                $("#cancelBtn").on("click", function(){
                    $("#delete-modal").hide();
                })
                $("#closeBtn").on("click", function(){
                    $("#delete-modal").hide();
                })
            }
            //空购物车
            blankCar() {
                let p = $("<p>您的购物车中还没有商品， <a href='/html/list.html?type=2'>去逛逛吧</a></p>").addClass("blank");
                    $(".main").html(p);
                    $(".blank").css({
                        "left" : $(window).width()/2,
                        "top" : $(window).height()/2
                    });
            }
            
        }
        new Cart();
    })
})