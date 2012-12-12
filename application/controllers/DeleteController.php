<?php

class DeleteController extends Zend_Controller_Action {

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
        if (!isset($post["id"])) {
        	$json['error'] = 1;
        	$json['message'] = "Нет данных";
        	echo Zend_Json_Encoder::encode($json);
        	return;
        }
        $table = new Application_Model_Task();
        $id = (int) $post["id"];
        $task = $table->fetchRow("id = $id");
        if (!$task) {
        	$json['error'] = 2;
        	$json['message'] = "Задача не найдена";
        	echo Zend_Json_Encoder::encode($json);
        	return;
        }
        $task->delete();
        echo Zend_Json_Encoder::encode($json);
    }
}
