<?php
class Zend_View_Helper_BreadCrumbs extends  Zend_View_Helper_Placeholder_Container_Standalone {
	
	protected $_regKey = 'Zend_View_Helper_BreadCrumbs';
	
	/**
	 * Retrieve placeholder for BreadCrumbs element and optionally set state
	 *
	 * @param  string $title
	 * @param  string $setType
	 * @return Zend_View_Helper_HeadTitle
	 */
	public function breadCrumbs($title = null, $url = null, $setType = Zend_View_Helper_Placeholder_Container_Abstract::APPEND) {
		$title = (string) $title;
		if ($title !== '') {
			$item = array(
				"title" => $title,
				"url" => (string) $url
			);
			if ($setType == Zend_View_Helper_Placeholder_Container_Abstract::SET) $this->set($item);
			elseif ($setType == Zend_View_Helper_Placeholder_Container_Abstract::PREPEND) $this->prepend($item);
			else $this->append($item);
		}
		return $this;
	}
	
	
	/**
	 * Turn helper into string
	 * @return string
	 */
	public function toString() {
		$items = array();
		foreach ($this as $item) {
			$items[] = '<a href="'.$item["url"].'">'.$item["title"].'</a>';
		}
		$separator = $this->getSeparator();
		return implode($separator, $items);
	}
}