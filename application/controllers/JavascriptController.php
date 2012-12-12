<?
class JavascriptController extends Zend_Controller_Action {
	
	public function init() {
		Zend_Controller_Action_HelperBroker::removeHelper('viewRenderer');
		Zend_Controller_Action_HelperBroker::removeHelper('Layout');
	}
	
	private $js = array(
		'jquery',
		'jquery-ui',
		'wndHandle',
		'function',
		'editForm',
		'calendar',
	);

			
	public function indexAction() {
		$path = getcwd()."/js/";
		$this->getResponse()->setRawHeader('Content-Type: text/javascript; charset=utf-8');
		foreach ($this->js as $js) {
			$file = $path.$js.".js";
			if (!file_exists($file)) continue;
			ob_start();
			include $file;
			echo ";";
			$this->outJS(ob_get_clean());
		}
	}
	
	
	private function outJS($js) {
		?>
		try {
			<? echo $js,"\n" ?>
		}
		catch(e) { }
		<?
	}
}