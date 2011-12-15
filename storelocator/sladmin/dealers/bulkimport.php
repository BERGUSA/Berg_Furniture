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
	# Bulk Store/Dealer Import Utility
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	//If GET, process
	$errorStr = "";
	if( isset($_GET['e']) && $_GET['e'] != ""){
		//Parse Errors
		$errorStr = base64_decode($_GET['e']);
		$errorStr = "<span style='color:red; font-weight:bold;'>Notice: </span>".$errorStr;
	}	
	
?>
<h2>Bulk Import Dealer/Store(s) From CSV File</h2>
Your are here: <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#">Bulk Import Dealer/Store(s) From CSV File</a>	

<p class="error" id="errorDiv" style="display:none;"><?=$errorStr;?></p>
<? if(strlen($errorStr)>0) echo "<script>changeColor2('errorDiv',0);</script>"; ?>
<p class="directions"><?=$lang['Bulk_Import_Directions'];?></p>
<p><a href="../help/examples/example_import_csv_file.csv" target="_blank"><img src="../images/icons/download2.gif" border="0" align="absmiddle" /><?=$lang['Download_Exaple_CSV_File'];?></a></p>
<form action="bulkimport2.php" method="post" enctype="multipart/form-data">
<table width="610" border="0" cellspacing="0" cellpadding="0" class="adminTable">
<tr>
  <td><img src="../images/box_top.jpg"></td>
</tr>
<tr>
  <td class="rightbg"><table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
	  <tr>
		<th colspan="2"><?=$lang['Upload_Import_CSV_File'];?></th>
	  </tr>
	  <tr>
		<td valign="top" class="column"><?=$lang['CSV_File'];?></td>
		<td class="row"><input required='yes' validate='text' message="Select CSV File." name="file" type="file" id="file" size="30"></td>
	  </tr>
	  <tr>
		<td valign="top" class="column">&nbsp;</td>
		<td class="row"><input type="checkbox" value="1" name="skiprow" /><?=$lang['Skip_First_Line_CSV_File'];?></td>
	  </tr>
	  <tr>
		<td class="column submitRow">&nbsp;</td>
		<td class="row submitRow"><input name="" onclick="validate(this.form);" type="button" value="<?=$lang['Upload_File'];?>"></td>
	  </tr>
  </table></td>
</tr>
<tr>
  <td><img src="../images/box_bottom.jpg"/></td>
</tr>
</tr>
</table>		
</form>
<?
	include($loc.'footer.php');
?>