var editForm = function() {
	
	var wnd = new wndHandle();
	var _id = $('<input type="hidden" name="id" value="0">').appendTo(wnd.body);
	$('<table class="edit_form">\
			<tr><td colspan="3">Название задачи<input type="text" class="task_title" name="title"/></td></tr>\
			<tr>\
				<td>Дата создания<input type="text" class="task_time_add" name="time_add"></td>\
				<td>Срок сдачи<input type="text" class="task_time_completed" name="time_completed"></td>\
				<td>Дата выполнения<input type="text" class="task_time_execution" name="time_execution"></td>\
			</tr>\
			<tr><td colspan="3">Описание<textarea class="task_description" name="description"></textarea></tr>\
			<tr><td colspan="3" class="center"><input type="button" style="width: auto;display: inline;" value="Сохранить"/></td></tr>\
		</table>').appendTo(wnd.body);
	
	var title = wnd.body.find(".task_title");
	var time_add = wnd.body.find(".task_time_add").datepicker({firstDay: 1, dateFormat: "dd.mm.yy"});
	var time_completed = wnd.body.find(".task_time_completed").datepicker({firstDay: 1, dateFormat: "dd.mm.yy"});
	var time_execution = wnd.body.find(".task_time_execution").datepicker({firstDay: 1, dateFormat: "dd.mm.yy"});
	var description = wnd.body.find(".task_description");
	var btn = wnd.body.find('input[type="button"]');
	
	btn.click(function(){
		if (title.val() == "") {
			alert('Введите название задачи');
			return;
		}
		var post = wnd.body.find("[type][id!='button'], textarea");
		$.post("/edit", post, function(data){
			if (data["error"] != 0) {
				alert(data["message"]);
				return;
			}
			if (_id.val() == "0") createData(data["id"], data["time_add"]);
			else updateData(data["id"], data["time_add"]);
			wnd.hide();
		}, "json");
	});
	
	
	this.show = function(id) {
		if (id != 0) fillData(id);
		else clearFields();
		_id.attr("value", id);
		wnd.show();
		setPosition();
	};
	
	
	var fillData = function(id) {
		title.attr('value', $('#task_' + id + ' .title').html());
		time_add.attr('value', $('#task_' + id + ' .time_add').html());
		time_completed.attr('value', $('#task_' + id + ' .time_completed').html());
		time_execution.attr('value', $('#task_' + id + ' .time_execution').html());
		description.attr('value', $('#task_' + id + ' .description').html());
	};
	
	
	var clearFields = function() {
		title.attr('value', "");
		time_add.attr('value', "");
		time_completed.attr('value', "");
		time_execution.attr('value', "");
		description.attr('value', "");
	};
	
	
	var updateData = function(id, time_add) {
		$('#task_' + id + ' .title').html(title.val());
		$('#task_' + id + ' .time_add').html(time_add);
		$('#task_' + id + ' .time_completed').html(time_completed.val());
		$('#task_' + id + ' .time_execution').html(time_execution.val());
		$('#task_' + id + ' .description').html(description.val());
	};
	
	
	var createData = function(id, time_add) {
		$('<tr class="row" id="task_' + id + '">\
			<td class="center">' + id + '</td>\
			<td>\
				<span class="title fake_link" onclick="showDescription(' + id + ')">' + title.val() + '</span>\
				<div class="description">' + description.val() + '</div>\
			</td>\
			<td class="time_add">' + time_add + '</td>\
			<td class="time_completed">' + time_completed.val() + '</td>\
			<td class="time_execution">' + time_execution.val() + '</td>\
			<td class="action">\
				<img src="/i/edit.gif" alt="edit" title="Редактировать" width="16" height="16" onclick="editForm.GetInstance().show(' + id + ')"/>\
				<img src="/i/delete.gif" alt="delete" title="Удалить" width="16" height="16" onclick="deleteTask(' + id + ')"/>\
			</td>\
		</tr>').appendTo($('.list-task'));
	};
	
	
	var setPosition = function() {
		var win = $(window);
		var top = win.height() / 2 + win.scrollTop() - wnd.height() / 2;
		var left = win.width() / 2  - (wnd.width() / 2);
		wnd.css({"top": top + "px", "left": left + "px"});
	};
	
};

editForm.GetInstance = function() {
	if (this._instance) return this._instance;
	return this._instance = new this;
};
