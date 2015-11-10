window.onload=function() {
	var drawing = document.getElementById("clock");
	// 检测是否支持getContext()
	if(drawing.getContext){
		// 获取2d上下文
		var context = drawing.getContext("2d");
		
		// 开始画图
		context.beginPath();
		
		// 画时钟的外圈
		context.arc(100,100,99,0,2*Math.PI,true);
		
		// 画完之后提起笔，把笔放在新的内圆上
		context.moveTo(194,100);
		
		// 画时钟的内圈
		context.arc(100,100,94,0,2*Math.PI,false);
		
		// 变换原点
		context.translate(100,100);

		//画时针
		context.moveTo(0,0);
		context.lineTo(0,-85);

		//画分针
		context.moveTo(0,0);
		context.lineTo(65,0);

		// 描边路经
		context.stroke();

		// 绘制文本
		context.font="bold 14px Arial";
		context.textAlign="center";
		context.textBaseline="middle";
		context.fillText("12",0,-82);
	}
	// 根据时间来画表针
	function drawTime (radius,sec,min,hour) {
		var coordinate = getCoor(radius,sec,min,hour);
		// 获取2d上下文
		var context = drawing.getContext("2d");
		// 开始画图
		context.beginPath();

		// 变换原点
		context.translate(100,100);

		//画时针
		context.moveTo(0,0);
		context.lineTo(coordinate[2][0],coordinate[2][1]);

		//画分针
		context.moveTo(0,0);
		context.lineTo(coordinate[1][0],coordinate[1][1]);

		// 描边路经
		context.stroke();

	}
	

	/**
	 * 根据时间计算时针，分针，秒针终点坐标
	 * @param  {[number]} radius  半径
	 * @param  {[number]} sec  秒
	 * @param  {[number]} min  分
	 * @param  {[number]} hour 时
	 * @return {[array]}     2维数组表示秒针分针时针的坐标
	 */
	function getCoor (radius,sec,min,hour) {
		// 解决顺时针的问题
		sec = -sec;
		min = -min;
		hour = -hour;
		// 返回的数组，表示三个坐标
		var coordinate = [[0,0],[0,0],[0,0]];
		// 以下计算都是以右方向为基准
		// 秒针的横纵坐标
		coordinate[0][0] = (Math.cos((sec/60)*2*Math.PI)*radius).toFixed(2);
		coordinate[0][1] = (Math.sin((sec/60)*2*Math.PI)*radius).toFixed(2);
		// 分针的横纵坐标
		coordinate[1][0] = (Math.cos((min/60)*2*Math.PI)*radius).toFixed(2);
		coordinate[1][1] = (Math.sin((min/60)*2*Math.PI)*radius).toFixed(2);
		// 时针的横纵坐标
		if(hour>12){
			hour-=12;
		}
		coordinate[2][0] = (Math.cos((hour/12)*2*Math.PI)*radius).toFixed(2);
		coordinate[2][1] = (Math.sin((hour/12)*2*Math.PI)*radius).toFixed(2);
		
		console.log(coordinate[2][0],coordinate[2][1]);
		console.log(coordinate);

		
		setTimeout(function(){
			console.log(coordinate)
		},2000)
		
		// 转换方向
		var tmp = coordinate;
		for(var i=0;i<3;i++){
			coordinate[i][0] = -tmp[i][1];
			coordinate[i][1] = tmp[i][0];
		}
		
		return coordinate;
	}
	drawTime(100,0,0,20.5);
	(function(){
		var b = [[0,0],[0,0]];
		b[1][0] = 2.3;
		b[1][1] = 3.6;
		console.log(b);
	}())
}
