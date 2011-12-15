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
<html>
<head>
<title><?=$lang['PHP_Store_Locator_Control_Panel'];?></title>
<link href="<?=$loc;?>style/adminCSS.css" type="text/css" rel="stylesheet" />
<script src="<?=$loc;?>/validate.js" type="text/javascript"/></script>
<script src="http://www.google.com/jsapi"></script>
<script>
  google.load("jquery", "1.4.2");
</script>
<body>
<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td class="adminHeader" rowspan="3" valign="top">
	<a href="http://www.storelocatorscript.com" target="_blank" title="Visit PHP Store Locator Script Home Page"><img src="../images/logo.jpg" vspace="0" hspace="0" border="0" /></a>
	<p>
	<div class="leftNav">
	<div><?=$lang['Manage'];?></div>
	<ul>
	  <li><a href="<?=$loc;?>../main/index.php"><?=$lang['Admin_Home'];?></a></li>
	  <li><a href="<?=$loc;?>../settings/index.php"><?=$lang['General_Settings'];?></a></li>
	  <li><a href="<?=$loc;?>../radiusoptions/index.php">Manage Radius Options</a></li>
	  <li><a href="<?=$loc;?>../logout.php"><?=$lang['Logout'];?></a></li>
	</ul>
	<div><?=$lang['Manage_DealerStore2'];?></div>
	<ul>
	  <li><a href="<?=$loc;?>../dealers/add.php"><?=$lang['Add_DealerStore'];?></a></li>	
	  <li><a href="<?=$loc;?>../dealers/index.php"><?=$lang['Manage_Dealers_Stores']; ?></a></li>
	</ul>
	<div><?=$lang['Utilities'];?></div>	  
	<ul>
	  <li><a href="<?=$loc;?>../dealers/bulkimport.php">Import Dealers/Stores</a></li>
	  <li><a href="<?=$loc;?>../backup/index.php"><?=$lang['Backup_Restore_DB'];?></a></li>
	</ul>
	</div>
	</p>
	</td>
    <td class="adminTop" valign="" height="10px">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><?=$lang['Logged_in_as'];?>: <strong><?=$lang['administrator'];?></strong>, <a href="<?=$loc;?>../logout.php"><?=$lang['Logout'];?></a> | <a href="<?=$loc;?>../settings/index.php"><?=$lang['General_Settings'];?></a> </td>
        <td align="right"><div id="topBar">
          <div id="dateBar"><?=date('l dS \of F Y h:i:s A');?></div>
        </div></td>
      </tr>
    </table>
    </td>
  </tr>
  <tr>
    <td class="adminMain" valign="top">