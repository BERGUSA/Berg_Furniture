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
	# Store Locator Weekly Ad File
	###########################################################
	
	//Fetch settings header
	require('fetch_settings.php');
	
	//Fetch template 
	$xtpl = new XTemplate('skins/'.$settingsArray['skin'].'/ad_info.xtpl');

	//Fetch lang support
	$langFile = "lang/en/langfile.php";
	require($langFile);
	$xtpl->assign('lang', $lang);
		
	//Clean variables
	$requestVarNames = array("store");
	cleanGetVars($requestVarNames);
	$_GET['store'] = intval($_GET['store']);
		
	//Validate lat, lng are present (redirect if needed)
	if($_GET['store']<1){
		@header('Location:store_locator.php');
		die("<script>window.location='store_locator.php';</script>"); //js backup redirect
	}
	
	//Load template variables
	$xtpl->assign('styleHref', 'skins/'.$settingsArray['skin'].'/style.css');
	$xtpl->assign('skinLoc','skins/'.$settingsArray['skin']);
	$emailArray = @explode("@", $settingsArray['contactEmail']);
	$xtpl->assign('siteEmail',sprintf("<script>document.write('%s'+'@'+'%s');</script>", $emailArray[0], $emailArray[1]));
	$xtpl->assign('sitePhone',$settingsArray['contactPhone']);
	$xtpl->assign('pageTitle', $settingsArray['pageTitle']);
	$xtpl->assign('metaKeywords', $settingsArray['metaKeywords']);
	$xtpl->assign('metaDescription', $settingsArray['metaDescription']);
	

	$sql = sprintf("select * from stores where id = %s", mysql_real_escape_string($_GET['store'], $mysql->conn));
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	
	if(mysql_num_rows($result)<1){
		@header('Location:store_locator.php');
		die("<script>window.location='store_locator.php';</script>"); //js backup redirect
	}

	$row = mysql_fetch_assoc($result);
	
	//Adjust for location of logo
	$row['logo'] = "uploads/".trim($row['logo']);
	
	//Assign data to template	
	$xtpl->assign('data', $row);
	
	//parse logo html (if logo exits)
	if(trim($row['logo'])!="uploads/"){
		if(@is_file($row['logo'])){
			$xtpl->parse('main.storelogo');
		}
	}
			
	//parse and output to template
	$xtpl->parse('main');
	$xtpl->out('main');
?>