// 实现构造函数
function Sandbox () {
	// 将参数转化成一个数组
	var args = arguments;
	// 最后一个参数是回调函数
	var callback = args.pop();
	// 如果参数是依次传递进来的，这样生成的数组就很好
	// 如果参数是放在一个数组里面传递进来的，args就是二维数组，直接取第一项就行了
	var modules = (args && typeof(args[0]) === "array" )?args[0]:args;

	// 确保本函数作为构造函数被调用
	if(!(this instanceof Sandbox)){
		return new Sandbox(modules,callback);
	}
	
}

// 预定义一些模块
Sandbox.module = {};

// dom操作模块
Sandbox.module.dom = function (box) {
	box.getElement = function(){
		console.log("box.getElement");
	}
	box.getStyle = function(){
		console.log("box.getStyle");
	}
}

var atest = function(){
	console.log(arguments);
}
atest('d','f');