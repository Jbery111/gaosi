require(["require.config"],function(){
	require(["jquery","header","footer","url","template"],function($,header,footer,url,template){
		console.log(1);
		class Detail{
			constructor() {
                console.log(Detail);
            }
            
		}
		 return new Detail();
	})
})