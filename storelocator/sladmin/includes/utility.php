<?
	########################################################################################
	# PHP STORE LOCATOR SCRIPT storelocatorscript.com
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# NOTICE: PHP STORE LOCATOR SCRIPT (C) STORELOCATORSCRIPT>COM
	# DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
	# Code is NOT open source and subject to a software license agreement. 
	########################################################################################
?>
 <? 
	########################################################################################
	# PHP STORE LOCATOR SCRIPT (phpscriptindex.com, phpstorelocatorscript.com)
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# NOTICE: (C) DB DESIGN 2007, DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
	# Code is NOT open source and subject to a software license agreement. You are
	# allowed to modify the software to meet the needs of your domain in accordance with
	# the software license agreement.
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# SUPPORT: phpstorelocatorscript.com, phpscriptindex.com/support/
	# EMAIL SUPPORT: phpsales@gmail.com Monday - Friday 10:00am to 5:00pm EST
	############# ###########################################################################
	
	##################################################
	# Utility Modules PHP File
	##################################################	
	 
	function mysqlSafe($conn, $string){
		return mysql_real_escape_string($string, $conn);
	}
	
	function cleanRequestVars($vars){
		foreach($vars as $name){
			if(isset($_REQUEST[$name])){
				$_REQUEST[$name] = strip_tags($_REQUEST[$name]);
			}else{
				$_REQUEST[$name] = "";
			}
		}
	}
	function cleanPostVars($vars){
		foreach($vars as $name){
			if(isset($_POST[$name])){
				$_POST[$name] = strip_tags($_POST[$name]);
			}else{
				$_POST[$name] = "";
			}
		}
	}
	function cleanGetVars($vars){
		foreach($vars as $name){
			if(isset($_GET[$name])){
				$_GET[$name] = strip_tags($_GET[$name]);
			}else{
				$_GET[$name] = "";
			}
		}
	}	
	
	function randName($length){
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ1234567890";
		$name = "";
		for($i=0;$i<intval($length);$i++){
			$name .= $chars{rand(0,(strlen($chars)-1))};
		}
		return $name;
	}
	
	function countrySelectOptions($mysql, $default=""){
		$sql = "select * from countries where iso is not null and iso != '' order by name asc";
		$result = $mysql->exSql($sql) or die($mysql->debugPrint());
		$string = "";
		while($row = mysql_fetch_assoc($result)){
			if($row['iso'] == $default) $select = "selected";
			else $select = "";
			$string .= sprintf("<option value='%s' %s>%s</option>\n", $row['iso'], $select, $row['name']);
		}
		return $string;
	}
?>