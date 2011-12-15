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
	# Administration Login
	##################################################

	@session_start() or die("Stoping script! Cannot start session. Please make sure PHP session modules are installed and/or enabled (www.php.net/session)");

	//Fetch MySQL support
	require("includes/mysql.ini.php");
	$mysql = new mysql();

	//Fetch lang support
	$langFile = "lang/en/adminLang.php";
	require($langFile);	
	
	if( isset($_POST['username']) && $_POST['username'] != "" ){
		if( isset($_POST['password']) && $_POST['password'] != "" ){
			//Clean login information
			$_POST['username'] = trim(strip_tags(mysql_real_escape_string($_POST['username'], $mysql->conn),""));
			$_POST['password'] = trim(strip_tags(mysql_real_escape_string($_POST['password'], $mysql->conn),""));			
			
			$sql = sprintf("select * from admin where username = '%s' and password = '%s'", $_POST['username'], $_POST['password']);
			$result = $mysql->exSql($sql) or die($mysql->debugPrint());
			
			if(mysql_num_rows($result)>0){
				@session_register("au0");
				$_SESSION['au0'] = base64_encode('ADMINLOGIN');
				@header("Location:index.php");
				die("<script>window.location='index.php';</script>"); //js backup redirect
			}else{ echo "failed"; }
		}
	}

?>
<html>
<head>
<title>
<?=$lang['PHP_Store_Locator_Control_Panel'];?>
</title>
<link href="includes/style/adminCSS.css" type="text/css" rel="stylesheet" />
</head>
<body>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<form action="login.php" method="post">
<table width="450" align="center" border="0" cellspacing="0" cellpadding="0" class="adminTable">
  <tr>
    <td class="box_top_mid"><img src="images/box_top_left.jpg" vspace="0" hspace="0" border="0" align="left" /><img src="images/box_top_right.jpg" vspace="0" hspace="0" border="0" align="right" /></td>
  </tr>
  <tr>
    <td class="rightbg">
    	<table border="0" align="center" cellpadding="3" cellspacing="0" class="">
        <tr>
          <td class="logoRow" colspan="2"><a href="http://www.storelocatorscript.com" target="_blank" title="Visit PHP Store Locator Script Home Page"><img src="images/logo_center.jpg" vspace="0" hspace="0" border="0" /></a></td>
        </tr>
		<tr>
          <th colspan="2"><?=$lang['Login_Information'];?></th>
        </tr>
        <tr>
          <td valign="top" class="column"><?=$lang['Username'];?>*</td>
          <td class="row"><input  value="" name="username" type="text" id="username" size="20"></td>
        </tr>
        <tr>
          <td valign="top" class="column"><?=$lang['Password'];?>*</td>
          <td class="row"><input value="" name="password" type="password" id="password" size="20"></td>
        </tr>
        <tr>
          <td class="column submitRow">&nbsp;</td>
          <td class="row submitRow"><input type="submit" value="Login"></td>
        </tr>
      </table>
  </tr>
  <tr>
    <td class="box_bottom_mid"><img src="images/box_bottom_left.jpg" align="left" vspace="0" hspace="0" border="0" /><img src="images/box_bottom_right.jpg" align="right" vspace="0" hspace="0" border="0" /></td>
  </tr>
</table>
</form>
</body>
</html>
