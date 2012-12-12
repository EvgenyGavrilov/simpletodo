var deleteTask = function(id) {
	if (!confirm("Удалить?")) return;
	$.post("/delete", {"id": id}, function(data){
		if (data["error"] != "") {
			alert(data["message"]);
			return;
		}
		$("#task_" + id).remove();
	}, "json");
};


var showDescription = function(id) {
	var wnd = wndHandle.GetInstance();
	wnd.setTitle($('#task_' + id + ' .title').html());
	wnd.body.html($('#task_' + id + ' .description').html());
	wnd.show();
	var win = $(window);
	var top = win.height() / 2 + win.scrollTop() - wnd.height() / 2;
	var left = win.width() / 2  - (wnd.width() / 2);
	wnd.css({"top": top + "px", "left": left + "px"});
};