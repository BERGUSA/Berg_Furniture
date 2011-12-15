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
	# Store Locator PHP File
	###########################################################
	
	require('fetch_settings.php');
	
	//Fetch template 
	$xtpl = new XTemplate('skins/'.$settingsArray['skin'].'/store_locator.xtpl');
	
	//Fetch lang support
	$langFile = "lang/en/langfile.php";
	require($langFile);
	$xtpl->assign('lang', $lang);
	
	$xtpl->assign('styleHref', 'skins/'.$settingsArray['skin'].'/style.css');
	$xtpl->assign('formAction', 'store_locator_results.php');
	$xtpl->assign('formMethod', 'post');
	$xtpl->assign('skinLoc','skins/'.$settingsArray['skin']);
	$emailArray = @explode("@", $settingsArray['contactEmail']);
	$xtpl->assign('siteEmail',sprintf("<script>document.write('%s'+'@'+'%s');</script>", $emailArray[0], $emailArray[1]));
	$xtpl->assign('sitePhone',$settingsArray['contactPhone']);
	$xtpl->assign('countryIso', $settingsArray['countryIso']);
	$xtpl->assign('pageTitle', $settingsArray['pageTitle']);
	$xtpl->assign('metaKeywords', $settingsArray['metaKeywords']);
	$xtpl->assign('metaDescription', $settingsArray['metaDescription']);
	
	$js = "
	<script src='sladmin/includes/validate.js' type='text/javascript'></script>	
	<script src='http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=".$settingsArray['ajaxApiKey']."' type='text/javascript'></script>		
	<script src='sladmin/includes/googleajaxapi.js' type='text/javascript'></script>
	<script src='sladmin/includes/utilityModules.js' type='text/javascript'></script>	
	";
	$xtpl->assign('pageScript', $js);
	
	$sql = "select * from countries where iso is not null and iso != '' order by name asc";
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	
	while($row = mysql_fetch_assoc($result)){
		if($row['iso'] == $settingsArray['countryIso']){
			$row['selected'] = "selected";
		}
//		echo $row['name'] ."<hr>";
		$xtpl->assign('country', $row);
		$xtpl->parse('main.countryisooption1');
		$xtpl->parse('main.countryisooption2');		
	}
	
	//fetch all radius options
	$sql = "select * from radiusoptions order by value asc";
	$rResult = $mysql->exSql($sql) or die($mysql->debugPrint());
	while($rRow = mysql_fetch_assoc($rResult)){
		if($rRow['value']==intval($_POST['radius'])){
			$rRow['selected']='selected="selected"';
		}
		$xtpl->assign('row',$rRow);
		$xtpl->parse('main.radiusoption');
	}	 
	//Assign files for 'header' and 'footer'
	$xtpl->assign_file('header', '../header.php');
	$xtpl->assign_file('footer', '../footer.php');	 

	$xtpl->parse('main');
	$xtpl->out('main');
	
?>