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
	# Store Locator Store Detail File
	###########################################################
	
	//Fetch settings header
	require('fetch_settings.php');
	
	//Fetch template 
	$xtpl = new XTemplate('skins/'.$settingsArray['skin'].'/store_info.xtpl');

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
	$xtpl->assign('siteEmail',sprintf("<script type='text/javascript'>document.write('%s'+'@'+'%s');</script>", $emailArray[0], $emailArray[1]));
	$xtpl->assign('sitePhone',$settingsArray['contactPhone']);
	$xtpl->assign('pageTitle', $settingsArray['pageTitle']);
	$xtpl->assign('metaKeywords', $settingsArray['metaKeywords']);
	$xtpl->assign('metaDescription', $settingsArray['metaDescription']);
	
	
	//set javascript includes
	$js = "
	<script src='sladmin/includes/validate.js' type='text/javascript'></script>	
	<script src='http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=".$settingsArray['ajaxApiKey']."' type='text/javascript'></script>		
	<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=".$settingsArray['mapKey']."' type='text/javascript'></script>
	<script src='sladmin/includes/googleajaxapi.js' type='text/javascript'></script>
	<script src='sladmin/includes/utilityModules.js' type='text/javascript'></script>	
	";
	$xtpl->assign('pageScript', $js);


	$sql = sprintf("select * from stores where id = %s", mysql_real_escape_string($_GET['store'], $mysql->conn));
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	
	if(mysql_num_rows($result)<1){
		@header('Location:store_locator.php');
		die("<script>window.location='store_locator.php';</script>"); //js backup redirect
	}

	$row = mysql_fetch_assoc($result);
	
	//Adjust for location of logo
	$row['logo'] = "uploads/".trim($row['logo']);
	
	//Convert new line to br (if needed)
	if($row['hours']!=""){
		$row['hours'] = nl2br($row['hours']);
	}
	
	//Assign data to template	
	$xtpl->assign('data', $row);
	
	//parse logo html (if logo exits)
	if(trim($row['logo'])!="uploads/"){
		if(@is_file($row['logo'])){
			$xtpl->parse('main.storelogo');
		}
	}
	
	//parse additional store info html (if exits)
	if(trim($row['pageHTML']) != ""){
		$xtpl->parse('main.additionalinfo');
	}else{
		$xtpl->parse('main.noadditionalinfo');
	}
	
	//parse hours html (If hours exits)
	if(trim($row['hours']) != ""){
		$xtpl->parse('main.storehours');
	}else{
		$xtpl->parse('main.nohourslisted');
	}
	
	//if display website, parse website html
	if($row['website'] != "" && $row['displayWebsite'] == '1'){
		$xtpl->parse('main.websiteHTML');
	}
	//if dislay weekly ad, parse weekly ad html 
	if($row['displayWeeklyAd'] == '1'){
		$xtpl->parse('main.weeklyAdHTML');		
	}
	
		
	//Google Maps JavaSript
	$js  = "<script src='sladmin/includes/googlemaps.js' type='text/javascript'></script>\n";
	$js .= "<script type='text/javascript'>//<![CDATA[\n";
	$js .= "load(".$row['latitude'].", ".$row['longitude'].", 15);\n";
	$js .= "var markers = new Array();\n";
	
	//build javascript for google maps template section
	$js .= '
	var icon = new GIcon();
	icon.image = "http://www.google.com/mapfiles/markerA.png";
	icon.shadow = "http://www.google.com/mapfiles/shadow50.png";
	icon.iconSize = new GSize(20, 34);
	icon.shadowSize = new GSize(37, 34);
	icon.iconAnchor = new GPoint(6, 20);
	icon.infoWindowAnchor = new GPoint(5, 1);
	';
	
	$html = sprintf("<div class='mapwindow'><b>%s</b><br />%s %s<br />%s %s, %s<br />%s</div>",
					$row['businessName'],
					$row['address'],
					$row['address2'],
					$row['city'],
					$row['state'],
					$row['postal'],
					$row['phone']);
					
	$js .= sprintf("html[%s] = \"%s\";\n", 0, $html);
	$js .= sprintf("markers[%s] = createMarker(%s, %s,html[%s], icon, %s);\n", 0, $row['latitude'], $row['longitude'], 0, 0);
	$js .= sprintf("map.addOverlay(markers[%s]);\n", 0);

	$js .= "\n//]]>\n</script>";	
	$xtpl->assign('googleMapScript', $js);

	//Assign files for 'header' and 'footer'
	$xtpl->assign_file('header', '../header.php');
	$xtpl->assign_file('footer', '../footer.php');


	//parse and output to template
	$xtpl->parse('main');
	$xtpl->out('main');
?>