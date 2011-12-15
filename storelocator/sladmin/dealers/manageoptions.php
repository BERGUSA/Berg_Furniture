<?
	########################################################################################
	# PHP Real Estate Script (www.phprealestatescript.com, phpscriptindex.com)
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# NOTICE: (C) DB DESIGN 2007, DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
	# Code is NOT open source and subject to a software license agreement. You are
	# allowed to modify the software to meet the needs of your domain in accordance with
	# the software license agreement.
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# SUPPORT: phprealestatescript.com, phpscriptindex.com/support/
	# EMAIL SUPPORT: phpsales@gmail.com Monday - Friday 10:00am to 5:00pm EST
	########################################################################################
		
	##################################################
	# Manage Options
	##################################################

	$loc = "../includes/";
	require('../includes/ajaxHeader.php');
	
//	var_dump($_POST);	

//	echo "result=".$_POST['act'];
	
	switch($_POST['act']){
	
		
		case "preferred":
		header("content-type: text/xml");		
		$sql = sprintf("update `stores` set `preferred` = IF(`preferred`='Yes', null, 'Yes') where id = %s", intval($_POST['id']));
		$result = $mysql->exSql($sql) or die($mysql->debugPrint());
		$sql = sprintf("select `preferred` from `stores` where id = %s", intval($_POST['id']));
		$result = $mysql->exSql($sql) or die($mysql->debugPrint());		
		$row = mysql_fetch_assoc($result);
		$xml .= "<value>".($row['preferred']=="Yes"?"Yes":"No")."</value>";
		$xml .= "<result>1</result>";		
		printf("<root>%s</root>",$xml);
		break;			


		default:
		echo "result=No+Action+Supplied";
	}

?>