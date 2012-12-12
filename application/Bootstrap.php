<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

	protected function _initAutoload() {
		require_once 'Zend/Loader/Autoloader.php';
		$loader = Zend_Loader_Autoloader::getInstance();
		$loader->setFallbackAutoloader(true);
		return $loader;
	}
	
	protected function _initRoute() {
		$front = Zend_Controller_Front::getInstance();
		$router = $front->getRouter();
		$router->addRoute('JavaScript',
				new Zend_Controller_Router_Route('lib.js/*', array('module' => 'default', 'controller' => 'JavaScript', 'action' => 'index')));
	}
}