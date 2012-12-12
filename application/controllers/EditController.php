<?php
class EditController extends Zend_Controller_Action {
	
	public function init() {
		Zend_Controller_Action_HelperBroker::removeHelper('viewRenderer');
		Zend_Controller_Action_HelperBroker::removeHelper('Layout');
	}
	
	public function indexAction() {
		$json = array(
				"error" => 0,
				"message" => ""
		);
		$post = $this->getRequest()->getPost();
		if (!isset($post["title"])) {
			$json['error'] = 1;
			$json['message'] = "Нет данных";
			echo Zend_Json_Encoder::encode($json);
			return;
		}
		$table = new Application_Model_Task();
		$id = 0;
		if (isset($post["id"])) $id = (int) $post["id"];
		$task = $table->fetchRow("id = $id");
		if (!$task) $task = $table->createRow();
		
		$task->title = htmlspecialchars($post["title"]);
		
		$regxp = "/(\\d{1,2}).(\\d{1,2}).(\\d{2,4})/";
		$matches = "";
		if (isset($post["time_add"]) and preg_match($regxp, $post["time_add"], $matches)) {
			$time_add = mktime(0, 0, 0, $matches[2], $matches[1], $matches[3]);
			$task->time_add = $time_add;
		}
		else $task->time_add = time();
		
		$matches = "";
		if (isset($post["time_completed"]) and preg_match($regxp, $post["time_completed"], $matches)) {
			$time_completed = mktime(0, 0, 0, $matches[2], $matches[1], $matches[3]);
			$task->time_completed = $time_completed;
		}
		
		$matches = "";
		if (isset($post["time_execution"]) and preg_match($regxp, $post["time_execution"], $matches)) {
			$time_execution = mktime(0, 0, 0, $matches[2], $matches[1], $matches[3]);
			$task->time_execution = $time_execution;
		}
		else $task->time_execution = null;
		
		if (isset($post["description"])) $task->description = htmlspecialchars($post["description"]);
		else $task->description = "";
		
		$json["id"] = $task->save();
		$json["time_add"] = date("d.m.Y", $task->time_add);
		echo Zend_Json_Encoder::encode($json);
	}
}