window.onload=function() {

	/**
	 * 根据时间来画表针
	 * @param  {[number]} radius 半径
	 * @param  {[number]} sec    
	 * @param  {[number]} min    
	 * @param  {[number]} hour   
	 * @param  {[number]} year   
	 * @param  {[number]} month   
	 * @param  {[number]} date
	 * @return {[type]}        [description]
	 */
	function drawTime (radius,sec,min,hour,year,month,date) {
		// 获取随机颜色
		var clockColorArr = randomColor();
		var clockColorStr = 'rgb('+clockColorArr[0]+','+clockColorArr[1]+','+clockColorArr[2]+')';
		var textColorArr = randomColor();
		var textColorStr = 'rgb('+textColorArr[0]+','+textColorArr[1]+','+textColorArr[2]+')';
		
		// 获取当前时间对应的坐标
		var coordinate = getCoor(radius,sec,min,hour);
		
		// 获取2d上下文
		var drawing = document.getElementById("clock");
		var context = drawing.getContext("2d");
		// 设置随机颜色
		context.strokeStyle = clockColorStr;
		context.fillStyle = textColorStr;
		
		// 清空整个canvas
		context.clearRect(0,0,200,200);
		
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
		context.lineTo(0.6*coordinate[2][0],-0.6*coordinate[2][1]);

		//画分针
		context.moveTo(0,0);
		context.lineTo(0.75*coordinate[1][0],-0.75*coordinate[1][1]);

		//画秒针
		context.moveTo(0,0);
		context.lineTo(0.85*coordinate[0][0],-0.85*coordinate[0][1]);

		// 设置写字的格式
		context.font="bold 14px Arial";
		context.textAlign="center";
		context.textBaseline="middle";
		// 生成年月日的字符串
		var dateStr = ''+year+'-'+month+'-'+date;
		// 获取字符串的位置
		var datePos = randomPosition();
		// 写下字符串
		context.fillText(dateStr,datePos[0],datePos[1]);
		// 描边路经
		context.stroke();
		// 原点变回来
		context.translate(-100,-100);
		context.moveTo(0,0);


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
		

		
		// 转换方向,由于数组也是对象，因此不能直接var tmp = coornadite，而应该新建另一个数组
		var tmp = [[0,0],[0,0],[0,0]]
		
		for(var i=0;i<3;i++){
			tmp[i][0] = parseInt(coordinate[i][0]);
			tmp[i][1] = parseInt(coordinate[i][1]);

			coordinate[i][0] = -tmp[i][1];
			coordinate[i][1] = tmp[i][0];
		}
		return coordinate;
	}

	/**
	 * 获取当前时间
	 * @return {[array]} 含有秒，分，时，年，月，日的数组<----注意这个顺序
	 */
	function getTime () {
		var date = new Date();
		var now = [0,0,0,0,0,0];
		now[2] = date.getHours();
		now[1] = date.getMinutes();
		now[0] = date.getSeconds();
		now[3] = date.getFullYear();
		now[4] = date.getMonth();
		now[5] = date.getDate();
		return now;
	}


	/**
	 * 获取随机颜色值
	 * @return {[array]} rgb的三个值组成的数组
	 */
	function randomColor () {
		var colorArr = [0,0,0];
		for(var i=0;i<3;i++){
			colorArr[i] = Math.floor(Math.random()*255);
		}
		return colorArr;
	}
	
	/**
	 * 获取随机位置，即横纵坐标都是－50至50
	 * @return {[array]} 包含横纵坐标的数组
	 */
	function randomPosition () {
		var ranPos = [];
		for(var i=0;i<2;i++){
			ranPos[i] = Math.floor(Math.random()*100)-50;
		}
		return ranPos;
	}

	/**
	 * 每50毫秒调用一次，重画表盘
	 */
	setInterval(function(){
		var now = getTime();
		drawTime(100,now[0],now[1],now[2],now[3],now[4],now[5]);
	},50);
	
}
