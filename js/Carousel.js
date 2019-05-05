 // extend 扩展
// 轮播    自动轮播    点击切换     3D效果


(function($){
	function Carousel(ele,opt){
		var d = {
			index:0,
			start:false,
			interval:1000
		};
		this.opts = $.extend({},d,opt);
		this.$wrp = ele;
		this.$img = this.$wrp.find('img');
		this.len = this.$img.length;
		this.W = this.$img.width();
		this.H = this.$img.height();
		this.index = this.opts.index;
		this.timer = null;
		this.interval = this.opts.interval;
		this.start = this.opts.start;
		this.init();
	}
	
	Carousel.prototype.init = function(){
		var self = this;
		    self.move();
		    self.bindEvent();
	}
	//实现分散
	Carousel.prototype.move = function(){
		var self = this;
		var len = Math.floor(self.len / 2);
		var Lnum,Rnum,n=0;
		
		for(var i = 1;i <= len ;i ++){
			Lnum = self.index - i;	
			self.$img.eq(Lnum).css({
				'transform':'translateX('+ (-150 * i) +'px) translateZ('+ (200 - (i * 100)) + 'px) rotateY(30deg)'
			})
		}	

		for(var i = 0;i < len ;i++){
			
			Rnum = self.index + i +1;
			if(Rnum > self.len -1){
				Rnum = n;
				n ++;
			}
			self.$img.eq(Rnum).css({
				'transform':'translateX('+ (150 * (i+1)) +'px) translateZ('+ (200 - ((i+1) * 100)) + 'px) rotateY(-30deg)'
			})
		}
		
		self.$img.eq(self.index).css({
		 'transform':'translateZ('+ 200 +'px)'
	   })	
	}
	
	
	
	
	//点击切换  
	Carousel.prototype.bindEvent = function(){
		var self = this;
		self.$img.on('click',function(){
			self.index = $(this).index();
			self.moveing(self.index);		  
		}).hover(function(){
			clearInterval(self.timer);
		},function(){
			self.timer = setInterval(function(){
			   self.play();
		    },self.interval)
		})
				
		self.timer = setInterval(function(){
			self.play();
		},self.interval)	
	}

	
	
	Carousel.prototype.moveing = function(index){
		var self = this;   
		self.index = index;
		self.move();	
	}
	
	
	Carousel.prototype.play= function(){
		var self = this;
		if(self.start){
			if(self.index == self.len -1){
				self.index = 0;
			}else{
				self.index ++;
			}			
			self.moveing(self.index);
		}
	}
	

	
	$.fn.extend({
		carousel:function(option){
			new Carousel(this,option);
		}
	})
})(jQuery)







































//(function($){
//	
//function Carousel(ele,option){
//	var opt = {
//		index:0,
//		start:false,
//		interval:2000
//	};
//	this.d = $.extend({},opt,option); //对象合并   （传参就用参数，没有就用默认的）
//	this.index = this.d.index;
//	this.$img = ele.find('img');
//	this.W = this.$img.width();
//	this.H = this.$img.height();
//	this.len = this.$img.length;
//	this.start = this.d.start;
//	this.interval = this.d.interval;
//	this.timer = null;
//	this.init();
//}
//
////初始化
//Carousel.prototype.init = function(){
//	var self = this;
//	self.move();
//	self.bindevent();
//}
//
//
////实现分散
//Carousel.prototype.move = function(){
//	var self = this;
//	
//	var len = Math.floor(self.len / 2);  //以中间为分割线
//	var Lnum,Rnum;
//	
//	for(var i = 1 ; i <= len ;i++){
//		Lnum = self.index - i;  //当前图片的    -->  左边的图片
//		
//	   self.$img.eq(Lnum).css({
//	   	 'transform':'translateX('+ (-150 * i) +'px) translateZ('+ (200 - (i * 100)) + 'px) rotateY(30deg)'
//	   })
//	}
//	
//		
//	  var n = 0;
//	for(var i = 1 ; i <= len ;i++){
//	      //当前图片的    -->  右边的图片
//     Rnum = self.index + i;
//     if(Rnum > this.len-1 ){
//	    	Rnum = n;
//	    	n ++;
//	    }
//
//     self.$img.eq(Rnum).css({
//	   	 'transform':'translateX('+ (150 * i) +'px) translateZ('+ (200 - (i * 100)) + 'px) rotateY(-30deg)'
//	      })
//	    }
//	
//	   self.$img.eq(self.index).css({
//		 'transform':'translateZ('+ 200 +'px)'
//	   })
//  }
//
////点击
//Carousel.prototype.bindevent = function(){
//	var self = this;
//	self.$img.on('click',function(){
//		self.nowIndex = $(this).index();
//
//       self.moveing(self.nowIndex);
//	})
//	.hover(function(){
//		clearInterval(self.timer);
//	},function(){
//		self.timer = setInterval(function(){
//		    self.play();
//	    },self.interval)
//	})
//	
//	self.timer = setInterval(function(){
//		self.play();
//	},this.interval)
//}
//
////图片运动
//Carousel.prototype.moveing = function(indexs){
//	this.index = indexs;
//	this.move();
//}
//
////自动轮播
//Carousel.prototype.play = function(){	
//	 if(this.start){
//	 	
//	 	if(this.index == this.len-1){
//			this.index = 0;	
//		}else {
//		 	  this.index ++;
//		  }
//			 
//		 this.move(this.index);
//		 
//	  }else{
//	  	clearInterval(this.timer);
//	  }	
// }
//
//$.fn.extend({
//	 carousel:function(options){
//	    new Carousel(this,options);	
//	 }
//})
//
// 
//})(jQuery)
