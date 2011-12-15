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
	# Administration Access Check
	##################################################

	@session_start() or die("Stoping script! Cannot start session. Please make sure PHP session modules are installed and/or enabled (www.php.net/session)");
	
	//Validate login
	$redirectToLogin = true;
	if( isset($_SESSION['au0']) && $_SESSION['au0'] != ""){
		$tmp = base64_decode($_SESSION['au0']);
		if($tmp == "ADMINLOGIN"){
			$redirectToLogin = false;
		}
	}
	
	//Redirect to login page (if needed)
	if($redirectToLogin){
		if($loc == "../includes/"){
			@header("Location:../login.php");
			die("Please login!");
		}
		if($loc == "includes/"){
			@header("Location:login.php");
			die("Please login!");
		}else{
			die("Please login!");
		}
	}
?>