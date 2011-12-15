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

	###########################################################
	# Fetch Settings File
	###########################################################	
	
	require_once('classes/xtemplate.class.php');
	require_once('sladmin/includes/xmlparse.ini.php');	
	require_once('sladmin/includes/mysql.ini.php');
	require_once('sladmin/includes/utilityModules.php');
	$mysql = new mysql();
	
	
	//Fetch settings
	$sql = "select * from `admin` where ID = 1";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$settingsRow = mysql_fetch_assoc($result);
	$settingsArray = unserialize($settingsRow['settings']);
	
?>	