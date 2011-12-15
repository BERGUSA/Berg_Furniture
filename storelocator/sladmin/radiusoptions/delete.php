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
	# Delete Radius Option
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	//If GET, process form
	if($_GET['id'] != ""){

		$getStr = "";	
		foreach($_GET as $key => $value){
			if($key != "id"){
				$getStr .= "&$key=".urlencode($value);
			}
		}
		
		
		//If bulk delete
		$whereArray = array();
		foreach($_GET['id'] as $value){
			//Strip out any xxs
			$value = strip_tags($value,"");
			//Get MySQL safe string
			$value = mysql_real_escape_string($value,$mysql->conn);
			//Add value to SQL
			$whereArray[] = "id=".intval($value);
		}
		$whereStr = @implode(" OR ", $whereArray);
		
		//Send Update Query
		$node = new sqlNode();
		$node->table = "radiusoptions";
		$node->where = "where ".$whereStr;
		if(($result = $mysql->delete($node)) === false )
			die($mysql->debugPrint());
		
		$redirect_get = base64_decode(trim($getStr));
		//Redirect
		echo "<script>window.location='index.php?e=$errorStr$redirect_get';</script>";
		die();	
	}//End Process Post Form
	else{
		echo "<script>alert('".$lang['Please_Select_Item']."');</script>";
		echo "<script>history.back();</script>";
		die();
	}
?>