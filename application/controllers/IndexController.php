<?php

class IndexController extends Zend_Controller_Action {

    public function indexAction() {
        $this->view->headTitle("simple ToDo");
        $table = new Application_Model_Task();
        $this->view->tasks = $table->fetchAll();
    }
}
