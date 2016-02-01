/**
 * 类的创建
 */
var Cat = new Class({
	// 构造函数
	initialize:function(name){
		this.name=name;
	}
})
// 创建一个对象
var miao = new Cat('miaomiao~');
console.log(miao.name);



/**
 * 继承
 */
// 先创建一个类
var Animal = new Class({
	initialize:function(age){
		this.age = age;
	}
})
// 让另一个类继承他
var Dog = new Class({
	Extends:Animal,
	initialize:function(age,name){
		//调用父类的构造函数
		this.parent(age);
		this.name = name;
	}
})
// 创建一个对象
var wangwang = new Dog(5,"wangwang!~");
console.log(wangwang);


/**
 * 接口，是接口吧？
 */
// 基类就用继承时候创建的Animal了
Animal.implement({
	setName:function(name){
		this.name=name;
	}
})
var pig = new Animal(20);
pig.setName("hengheng~");
console.log(pig);