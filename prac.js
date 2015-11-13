/**
 * 竟然写出了一个可以加上任意数字的函数
 * @param {[number]} arg 下次要加的数
 */
function add (arg) {
	this.last = arg;
	add.func = function(arg){
		console.log(add.last+arg);
		add.last += arg;
		return add.func;
	}
	return add.func;
}

// 这样调用
add(2)(1)(4)(3);


if(!a){
	alert('a is not defined');
	var a = {};
}
