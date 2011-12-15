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
	# Store Locator Search Results File
	###########################################################
	
	//Fetch settings header
	require('fetch_settings.php');
	
	//Fetch template 
	$xtpl = new XTemplate('skins/'.$settingsArray['skin'].'/store_locator_results.xtpl');

	//Fetch lang support
	$langFile = "lang/en/langfile.php";
	require($langFile);
	$xtpl->assign('lang', $lang);
		
	//Clean variables
	$requestVarNames = array("postcode", "town", "state", "lat", "lng","start", "location");
	cleanRequestVars($requestVarNames);

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
	
	//Validate lat, lng are present (redirect if needed)
	if(($_REQUEST['lat'] == "") || ($_REQUEST['lng'] == "")){
		@header('Location:store_locator.php');
		die("<script>window.location='store_locator.php';</script>"); //js backup redirect
	}
	
	//Load template variables
	$xtpl->assign('styleHref', 'skins/'.$settingsArray['skin'].'/style.css');
	$xtpl->assign('formAction', 'store_locator_results.php');
	$xtpl->assign('formMethod', 'post');
	$xtpl->assign('skinLoc','skins/'.$settingsArray['skin']);
	$emailArray = @explode("@", $settingsArray['contactEmail']);
	$xtpl->assign('siteEmail',sprintf("<script>document.write('%s'+'@'+'%s');</script>", $emailArray[0], $emailArray[1]));
	$xtpl->assign('sitePhone',$settingsArray['contactPhone']);
	
	$js = "
	<script src='sladmin/includes/validate.js' type='text/javascript'></script>	
	<script src='sladmin/includes/utilityModules.js' type='text/javascript'></script>";
	$xtpl->assign('headScript', $js);	
	
	if( isset($_REQUEST['countryIso']) && $_REQUEST['countryIso'] != ""){
		$defaultCountryIso = $_REQUEST['countryIso'];
	}else{
		$defaultCountryIso = $settingsArray['countryIso'];
	}
	$xtpl->assign('countryIso', $defaultCountryIso);
	
	$xtpl->assign('postcode', $_REQUEST['postcode']);
	$xtpl->assign('location_field', $_REQUEST['location']);
	$xtpl->assign('town', $_REQUEST['town']);
	$xtpl->assign('state', $_REQUEST['state']);
	$xtpl->assign('pageTitle', $settingsArray['pageTitle']);
	$xtpl->assign('metaKeywords', $settingsArray['metaKeywords']);
	$xtpl->assign('metaDescription', $settingsArray['metaDescription']);	
	
	$sql = "select * from countries where iso is not null and iso != '' order by name asc";
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	
	while($row = mysql_fetch_assoc($result)){
		if($row['iso'] == $defaultCountryIso){
			$row['selected'] = "selected";
		}
//		echo $row['name'] ."<hr>";
		$xtpl->assign('country', $row);
		$xtpl->parse('main.countryisooption1');
		$xtpl->parse('main.countryisooption2');		
	}
	
	
	//set javascript includes
	$js = "	
	<script src='http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=".$settingsArray['ajaxApiKey']."' type='text/javascript'></script>		
	<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=".$settingsArray['mapKey']."' type='text/javascript'></script>
	<script src='sladmin/includes/googleajaxapi.js' type='text/javascript'></script>
	<script src='sladmin/includes/googlemaps.js' type='text/javascript'></script>
	";
	$xtpl->assign('pageScript', $js);	
		
	//Build radius search sql
	$lat = mysqlSafe($mysql->conn, $_REQUEST['lat']);
	$lng = mysqlSafe($mysql->conn, $_REQUEST['lng']);
	$sql = '(SIN(RADIANS('.$lat.')) * SIN(RADIANS(`latitude`)) + COS(RADIANS('.$lat.')) * COS(RADIANS(`latitude`)) * COS(RADIANS((('.$lng.') - (`longitude`)))))';
	$sql = 'ACOS'.$sql;
	$sql = 'DEGREES('.$sql.')';
	$sql = '('.$sql.' * 69 )'; 	
	//convert to km (if needed)
	if($settingsArray['distanceType'] == "KM"){
		$sql = '('.$sql.' * 1.61 )';
	}
	
	//allow supplied radius
	if(!empty($_REQUEST['radius'])){
		$settingsArray['withInDistance'] = intval($_REQUEST['radius']);
	}
	
	$whereDistance = $sql;
	$distanceColumn = $sql . ' as `'.$settingsArray['distanceType'].'` ';
	$sql = sprintf("select *, %s from `stores` where %s <= %s order by `preferred` desc, %s asc", $distanceColumn, $whereDistance, $settingsArray['withInDistance'], $settingsArray['distanceType']);
	//execute radius search sql
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	$totalRows = mysql_num_rows($result);

	//start paging results	
	$resultsPerPage = 10;
	$startRow = intval($_REQUEST['start']);
	if($startRow>0)
		$startRow--;
	$sql .= " limit $startRow, $resultsPerPage ";
	$startRow++;
	
	//execute radius search sql
	$result = $mysql->exSql($sql) or die($mysql->debugPrint());
	$pageTotalRows = mysql_num_rows($result);
			
	//Configure Paging
	$totalPages = @ceil($totalRows/$resultsPerPage);
	$currentPage = ceil($totalPages-($totalRows-$startRow)/$resultsPerPage);
	if($currentPage==0)
		$currentPage++;

	//set template location
	if($_REQUEST['postcode'] != ""){
		$location = $_REQUEST['postcode'] . ", " . $_REQUEST['countryIso'];
	}else{
		$location = $_REQUEST['location']  . ", " . $_REQUEST['countryIso'];
	}
	$location = ucwords($location);
	$xtpl->assign('location', $location);
	
	//if no results, parse error notice and exit
	if($totalRows==0){
		$xtpl->parse('main.errornotice');
		$xtpl->parse('main');
		$xtpl->out('main');
		exit();
	}
	
	//load template with paging data
	$xtpl->assign('currentPage', $currentPage);
	$xtpl->assign('totalPages', $totalPages);
	$xtpl->assign('totalRows', $totalRows);
	$xtpl->assign('pageTotalRows', $pageTotalRows);	
	
	if($totalPages>1){
		$nextPage = $currentPage+1;
		$pdata = array( 'page' => $nextPage,
						'start' => ($currentPage*$resultsPerPage),
						'postcode' => $_REQUEST['postcode'],
						'lat' => $_REQUEST['lat'], 
						'lng' => $_REQUEST['lng'],
						'location' => $_REQUEST['location'],
						'countryIso' => $_REQUEST['countryIso']);
		$xtpl->assign('pdata', $pdata);
		if($nextPage <= $totalPages){
			$xtpl->parse('main.searchresults.paging.nextpage');					
			$xtpl->parse('main.searchresults.paging2.nextpage');								
		}
	}

	if($currentPage>1){
		$lastPage = $currentPage-1;
		$pdata = array( 'page' => $lastPage,
						'start' => (($lastPage-1)*$resultsPerPage),
						'postcode' => $_REQUEST['postcode'],
						'lat' => $_REQUEST['lat'], 
						'lng' => $_REQUEST['lng'],
						'location' => $_REQUEST['location'],
						'countryIso' => $_REQUEST['countryIso']);
		$xtpl->assign('pdata', $pdata);
		$xtpl->parse('main.searchresults.paging.lastpage');					
		$xtpl->parse('main.searchresults.paging2.lastpage');							
	}	
	
	$xtpl->parse('main.searchresults.paging');	
	$xtpl->parse('main.searchresults.paging2');		
	

		
	$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$count = 0;		
	$trow = array();
	while($row = mysql_fetch_assoc($result)){
		//build results set information for template	
		$row['iconSrc'] = 'sladmin/images/icons/gmap/marker'.$letters{$count}.'.png';
		$row['onclick1'] = sprintf("showInfo(%s, '%s');", $count, 'hiddenDiv'.$count);
		$row['onclick2'] = sprintf("showMiniMap(%s);", $count);
		$row['hiddenDivId'] = 'hiddenDiv'.$count;
		$row['itemDivId'] = 'itemDiv'.$count;
		$row['distance'] = sprintf("%01.2f %s", $row[$settingsArray['distanceType']], $settingsArray['distanceType']);
		
		if($row['preferred']=="Yes"){
			$xtpl->parse('main.searchresults.resultsdisplay1.preferred');
			$xtpl->parse('main.searchresults.resultsdisplay1.preferred2');
		}
		
	//if display logo, parse logo html
		$xtpl->assign('noShow',  '  ' );
		if($row['logo'] == NULL ){
			$xtpl->assign('noShow', 'display:none;');
			}
		
	
	
		
		//push onto another array for later processing
		$trow[] = $row; 
		//assign row to data set
		$xtpl->assign('data', $trow[(sizeof($trow)-1)]);
		//if display website, parse website html
		if($row['website'] != "" && $row['displayWebsite'] == '1'){
			$xtpl->parse('main.searchresults.resultsdisplay1.websiteHTML');
			$xtpl->parse('main.searchresults.resultsdisplay2.websiteHTML');
		}
		//if dislay weekly ad, parse weekly ad html 
		if($row['displayWeeklyAd'] == '1'){
			$xtpl->parse('main.searchresults.resultsdisplay1.weeklyAdHTML');		
			$xtpl->parse('main.searchresults.resultsdisplay2.weeklyAdHTML');
		}
		//if even row, parse alt row html
		if($count%2 == "1"){
			$xtpl->parse('main.searchresults.resultsdisplay2.altrow');
		}

		//parse row data set html
		$xtpl->parse('main.searchresults.resultsdisplay1');
		$xtpl->parse('main.searchresults.resultsdisplay2');
		
		$count++;				
	}

	$onloadStr = "load(".$trow[0]['latitude'].", ".$trow[0]['longitude'].", 12); loadOverlays(); showInfo(0, 'hiddenDiv0');";
	$xtpl->assign('bodyonload', $onloadStr);
		
	//Google Maps JavaSript
	$js = "<script type='text/javascript'>\n";
	$js .= "var markers = new Array();\n";
	$js .= "function loadOverlays(){\n";
	
	$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$count = 0;
	foreach($trow as $row){
		//build javascript for google maps template section
		$js .= '
			var icon = new GIcon();
			icon.image = "http://www.google.com/mapfiles/marker'.$letters{$count}.'.png";
			icon.shadow = "http://www.google.com/mapfiles/shadow50.png";
			icon.iconSize = new GSize(20, 34);
			icon.shadowSize = new GSize(37, 34);
			icon.iconAnchor = new GPoint(6, 20);
			icon.infoWindowAnchor = new GPoint(5, 1);
		';
		
		$html = sprintf("<div class='mapwindow'><strong>%s</strong></a><br /><a class='smalltxt altlink' href='store_info.php?store=%s'>more info &raquo;</a><br />%s %s<br />%s %s, %s<br />%s</div>",
						$row['businessName'],
						$row['id'],
						$row['address'],
						$row['address2'],
						$row['city'],
						$row['state'],
						$row['postal'],
						$row['phone']);
		$js .= sprintf("html[%s] = \"%s\";\n", $count, $html);
		$js .= sprintf("markers[%s] = createMarker(%s, %s,html[%s], icon, %s);\n", $count, $row['latitude'], $row['longitude'], $count, $count);
		$js .= sprintf("map.addOverlay(markers[%s]);\n", $count);
		$count++;		
	}
	$js .= "}\n";
	$js .= "\n</script>";	
	$xtpl->assign('googleMapScript', $js);
	$xtpl->parse('main.searchresults');	

	//Assign files for 'header' and 'footer'
	$xtpl->assign_file('header', '../header.php');
	$xtpl->assign_file('footer', '../footer.php');

	//parse and output to template
	$xtpl->parse('main');
	$xtpl->out('main');
?>