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
	########################################################################################
	
	##################################################
	# Software Administration Header File
	##################################################

	//Validate loc 
	if(!isset($loc)){
		$loc = "";
	}else{
//		echo $loc;
		$loc = trim(strip_tags(strval($loc)));
		$allowedLocations = array("../includes/", "includes/");
		if(!in_array($loc, $allowedLocations)){
			die("NOTICE: Ending script. Possible XSS detected!");
		}
	}
	
	
	//Validate Login
	require($loc."accessCheck.php");
		
	//Fetch lang support
	$langFile = "../lang/en/adminLang.php";
	require($loc.$langFile);
	
	//Fetch MySQL support
	require($loc."mysql.ini.php");
	$mysql = new mysql();
	
	//Fetch XML parsing support
	require($loc."xmlparse.ini.php");
	
	//Fetch Utility Modules Support
	require($loc."utilityModules.php");
	
	//Fetch General Settings
	$sql = "select * from `admin` where ID = 1";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$settingsRow = mysql_fetch_assoc($result);
	$settings = unserialize($settingsRow['settings']);
	
?>