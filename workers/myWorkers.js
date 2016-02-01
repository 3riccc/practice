// 取到传来的数据
onmessage = function(event){
	console.log(event.data);
	// 把数据传回给调用者
	postMessage("Hi man ,too !")
}
