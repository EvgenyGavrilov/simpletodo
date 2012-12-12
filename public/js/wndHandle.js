var wndHandle = function() {
	
	var keep = true;
	var close = false;
	
	var wnd = $('<div class="win_popup"></div>').appendTo($('body'));
	$('<div class="title">\
			<div class="close_btn" title="Закрыть"></div>\
			<div class="title_text"></div>\
		</div>\
		<div class="body"></div>').appendTo(wnd);
	
	var btn_close = wnd.find('.close_btn').click(function(){
		hide();
	});
	
	var title = wnd.find(".title");
	var title_text = title.find(".title_text");
	this.body = wnd.find('.body');
	var move = false;
	var xofs = 0;
	var yofs = 0;
	
	
	title.mousedown(function(e){
		move = true;
		xofs = e.pageX - title.offset().left;
		yofs = e.pageY - title.offset().top;
		title.css("cursor", "move");
		return false;
	});
	
	
	$(document).mouseup(function(e){
		move = false;
		title.css("cursor", "default");
		return false;
	});
	
	
	$(document).mousemove(function(e){
		if (move) {
			wnd.css("left", e.pageX - xofs);
			wnd.css("top", e.pageY - yofs);
			return false;
		}
	});
	
	
	var hide = this.hide = function() {
		wnd.fadeOut(300);
		return this;
	};
	
	
	var show = this.show = function() {
		keep = true;
		wnd.fadeIn(300);
//		var width = wnd.width();
//		wnd.css("width", width + "px");
	};
	
	
	this.css = function(key, value) {
		if (typeof(key) == "object") wnd.css(key);
		else wnd.css(key, value);
		return this;
	};
	
	
	this.width = function() { return wnd.width(); };
	this.height = function() { return wnd.height(); };
	this.setTitle = function(text) { title_text.html(text); return this; };
};

wndHandle.GetInstance = function() {
	if (this._instance) return this._instance;
	return this._instance = new this;
};