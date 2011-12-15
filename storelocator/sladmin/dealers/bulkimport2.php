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
	# Bulk Store/Dealer Import Utility Step 2
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		
	//Validate mime type
	$allowedMimeTypes[] = "text/csv";
	$allowedMimeTypes[] = "text/comma-separated-values";
	$allowedMimeTypes[] = "text/x-csv";
	if(!in_array($_FILES['file']['type'],$allowedMimeTypes)){
		echo "<script>alert('Invalid CSV File or Encoding. Your uploaded file mime type [".$_FILES['file']['type']."] is not in the allowed list.'); window.back();</script>";
		include($loc.'footer.php');
		die();
	}
	//Move file from to uploads folder
	$uploaddir = '../../uploads/';
	
	//Fetch random name
	do{
		$uploadName = randName(10) . ".csv";
	}while(is_file($uploaddir.$uploadName));
	
	$uploadfile = $uploaddir.$uploadName;
	
	
	$moved = move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
	if(!$moved){
		echo "<script>alert('Unable to move upload file to uploads folder!'); window.back();</script>";
		include($loc.'footer.php');
		die();			
	}

	//Fetch file into array
	$fileArray = file($uploadfile) or die("<script>alert('Unable to open upload file! Please check upload folder file permissions'); window.back();</script>");
	
	$message = "File uploaded and renamed to /uploads/".$uploadName;	
	
	//Generate preview html table
	$max_columns = 0;
	$max_preview_rows = 2;
	$tableStr = "<table cellpadding='0' cellspacing='0' border='1'>";
	$tableStr .= "<tr>
					<th>id</th>
					<th>businessName</th>
					<th>website</th>
					<th>address</th>
					<th>address2</th>
					<th>city</th>
					<th>state</th>
					<th>postal</th>
					<th>country</th>
					<th>phone</th>
					<th>fax</th>
					<th>latitude</th>
					<th>longitude</th>
					<th>email</th>
				</tr>";
	for($i=0;$i<sizeof($fileArray);$i++){
		//Skip first row (if needed)
		if( ($i==0) && ($_POST['skiprow'] == "1") ){
			$max_preview_rows++;
			continue;
		}
		//Stop look if max rows is reached
		if($i==$max_preview_rows)
			break;
		$tableStr .= "<tr>";
		$columns = @explode(",",$fileArray[$i]);
		foreach($columns as $column){
			$tableStr .= sprintf("<td>%s</td>",$column);
		}
		$tableStr .= "</tr>";
	}		
	$tableStr .= "</table>";

?>
<h2><?=$lang['Bulk_Import_DealerStore_CSV_File_Step_2'];?></h2>
<?=$lang['You_Are_Here'];?> <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Bulk_Import_DealerStore_CSV_File_Step_2'];?></a>	

<p class="error" id="errorDiv" style="display:none;"><?=$message;?></p>
<script>changeColor2('errorDiv',0);</script>

<p class="directions">Please select your import options.</p>
<form action="bulkimport3.php" method="post" enctype="multipart/form-data">
<table width="610" border="0" cellspacing="0" cellpadding="0" class="adminTable">
<tr>
  <td><img src="../images/box_top.jpg"></td>
</tr>
<tr>
  <td class="rightbg"><table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
	  <tr>
		<th colspan="2"><?=$lang['Import_Options'];?></th>
	  </tr>
	  <tr>
		<td valign="top" class="column"><?=$lang['Import_Action'];?></td>
		<td class="row">
		<select name="importAction" required='yes' message='<?=$lang['Select_Import_Action'];?>'>
		<option value=""><?=$lang['Select_Action'];?></option>
		<option value="insert"><?=$lang['Insert_DealerStores'];?></option>
		<option value="update"><?=$lang['Update_DealerStores'];?></option>
		</select>
		</td>
	  </tr>
	  <tr>
		<td valign="top" class="column ">&nbsp;</td>
		<td class="row ">
		<input type="checkbox" name="delFile" value="1" /><?=$lang['Delete_CSV_File'];?>
		</td>
	  </tr>	  
	  <tr>
		<td valign="top" class="column submitRow">&nbsp;</td>
		<td class="row submitRow">
	  <input name="" onclick="validate(this.form);" type="button" value="<?=$lang['Perform_Import_Action'];?>">
		</td>
	  </tr>	  	  
  </table></td>
</tr>
<tr>
  <td><img src="../images/box_bottom.jpg"/></td>
</tr>
</tr>
</table>		
<p>&nbsp;</p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminTable">
  <tr>
    <td class="box_top_mid"><img src="../images/box_top_left.jpg" align="left" /><img src="../images/box_top_right.jpg" align="right" /></td>
  </tr>
  <tr>
    <td class="rightbg">
	<table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
	  <tr>
		<th colspan="2"><?=$lang['Preview_First_2_Rows'];?></th>
	  </tr>
	  <tr>
		<td class="row">
		<?=$tableStr;?>
		</td>
	  </tr>	  
	  <tr>
		<td class="row submitRow"></td>
	  </tr>
  </table>
	</td>
	</tr>
        <tr>
          <td class="box_bottom_mid"><img src="../images/box_bottom_left.jpg" align="left" /><img src="../images/box_bottom_right.jpg" align="right" /></td>
        </tr>
</table>
<input type="hidden" name="skiprow" value="<?=$_POST['skiprow'];?>" />
<input type="hidden" name="uploadName" value="<?=$uploadName;?>" />
</form>
<?
	include($loc.'footer.php');
?>