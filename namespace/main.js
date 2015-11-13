
/**
 * 命名空间的注册和删除函数
 * @type {Object}
 */
var namespace = {
	/**
	 * 命名空间注册的函数——本质上就是生成嵌套对象
	 * @param  {[string]} ns_str 命名空间的名字
	 * @return {[obj]} 返回生成的对象的最里面那层
	 */
	reg:function(ns_str){
		// 初始的parent指向最外层
		var parent = window;
		// 把字符串用"."切分成数组
		var ns_arr = ns_str.split(".");
		// 初始化一下变量以节省性能
		var i=0;
		var ns_len = ns_arr.length;
		// 依次创建子对象
		for(;i<ns_len;i++){
			// 没什么用的判断，只是为了更稳定
			if(typeof(ns_arr[i]) != "undefined"){
				parent[ns_arr[i]] = {};
				// 指向新创建的内层对象
				parent = parent[ns_arr[i]];
			}	
		}
		return parent;
	},
	/**
	 * 删除命名空间，这个函数只能删除到最后一层
	 * 比如命名空间是a.b.c.d，你如果想删掉d的话，你就输入a.b.c.d，如果你想删到b的话，你就输入a.b
	 * @param  {[string]} ns_str 命名空间的名字
	 * @return {[bollen]}    删除成功还是失败
	 */
	del:function(ns_str){
		// 定义最外层和数组
		var parent = window;
		var ns_arr = ns_str.split(".");

		// 提前定义两个变量以节省性能
		var i = 0;
		var ns_len = ns_arr.length;

		// 找到最底层的空间并删掉它
		for(;i<ns_len;i++){
			if(typeof(ns_arr[i]) === "undefined"){
				// 说明传进来的是空值
				return false;
			}else if((i+1) === ns_len){
				// 说明找到了最底层的值，删掉它
				delete(parent[ns_arr[i]]);
				return true;
			}else{
				// 没找到，继续找下一层
				parent = parent[ns_arr[i]];
			}
		}
	}
}

