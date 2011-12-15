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
	# Store/Dealer Bacup DB Contents Index PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
	include($loc.'mysql.backup.ini.php');

	//If GET, process
	$errorStr = "";
	if( isset($_GET['e']) && $_GET['e'] != ""){
		//Parse Errors
		$errorStr = base64_decode($_GET['e']);
		$errorStr = "<span style='color:red; font-weight:bold;'>Notice: </span>".$errorStr;
	}
	
	$message = "";
	if( isset($_GET['action']) && $_GET['action'] != ""){
		switch($_GET['action']){
		
			case "bk": //Backup db to file
			$mysqlBR = new MySQLBackup($mysql);
			$result = $mysqlBR->backup('backup.sql');
			if($result){
				$message = "Database backup is complete. <a href='backup.sql'>Click here to download file</a>";
			}else{
				$message = sprintf("A SQL ERROR has been detected: %s", $result);
			}
			break;
			
			case "r": //Restore db from file
			$mysqlBR = new MySQLBackup($mysql);
			$result = $mysqlBR->restore('backup.sql');
			if($result){
				$message = "Database has been restored from file.";
			}else{
				$message = sprintf("A SQL ERROR has been detected: %s", $result);
			}			
			break;
		}
	}
		
?>
<P>
<h2><?=$lang['Backup_or_Restore_from_File'];?></h2>
<?=$lang['You_Are_Here'];?> <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Backup_or_Restore_from_File'];?></a>	
  
<p class="error" id="errorDiv" style="display:none;"><?=$errorStr;?></p>
<? if(strlen($errorStr)>0) echo "<script>changeColor2('errorDiv',0);</script>"; ?>
 
<p class="error" id="messageDiv" style="display:none;"><?=$message;?></p>
<? if(strlen($message)>0) echo "<script>changeColor2('messageDiv',0);</script>"; ?>

<p class="directions"><?=$lang['backup_directions'];?></p>

<input type="button" onClick="if(confirm('<?=$lang['backup_confirm'];?>')) { window.location='index.php?action=bk';this.disabled = true; this.disabled=true; this.value='Loading'; }" value="<?=$lang['backup_button'];?>" />&nbsp;
<input type="button" onClick="if(confirm('<?=$lang['restore_confirm'];?>')) { window.location='index.php?action=r';this.disabled = true; this.disabled=true; this.value='Loading'; }" value="<?=$lang['restore_button'];?>"/>
</P>
<?
	include($loc.'footer.php');
?>