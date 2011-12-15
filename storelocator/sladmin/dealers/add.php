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
	# Creat New Store/Dealer PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	//If POST, process form
	if( isset($_POST['businessName']) && $_POST['businessName'] != ""){
		//Build insert sql 
		$node = new sqlNode();
		$node->table = "stores";
		$node->push("text","businessName",$_POST['businessName']);
		$node->push("text","phone",$_POST['phone']);
		$node->push("text","fax",$_POST['fax']);
		$node->push("text","email",$_POST['email']);
		$node->push("text","hours",$_POST['hours']);
		$node->push("text","shownWebsite",$_POST['shownWebsite']);
		$node->push("text","website",$_POST['website']);
		
		if($_POST['otherTarget'] != "")
			$node->push("text","websiteTarget",$_POST['otherTarget']);
		else
			$node->push("text","websiteTarget",$_POST['target']);		
			
		$node->push("text","displayWebsite",$_POST['displayWebsite']);
		$node->push("text","address",$_POST['address']);
		$node->push("text","address2",$_POST['address2']);
		$node->push("text","city",$_POST['city']);
		$node->push("text","state",$_POST['state']);
		$node->push("text","postal",$_POST['zip']);
		$node->push("text","country",$_POST['country']);
		$node->push("defined","lastUpdate","NOW()");
		$node->push("defined","created","NOW()");
		$node->push("html","pageHTML",$_POST['pageHTML']);
		$node->push("text","longitude",$_POST['longitude']);
		$node->push("text","latitude",$_POST['latitude']);				  			
		
		//If Logo upload, process photo file
		if($_FILES['file']['name'] != ""){
			//Validate mime type
			if( ($_FILES['file']['type'] != 'image/gif') && ($_FILES['file']['type'] != 'image/jpeg') && ($_FILES['file']['type'] != 'image/jpg') && ($_FILES['file']['type'] != 'image/pjpeg') ){
				echo "<script>alert('Invalid JPG/GIF File or Encoding. Mime Type [".$_FILES['file']['type']."]'); window.back();</script>";
				include($loc.'footer.php');
				die();
			}
			//Move file from to uploads folder
			$uploaddir = '../../uploads/';
			
			//Fetch random name
			do{
				$uploadName = randName(10) . ".jpg";
			}while(!is_file($uploaddir.$uploadName));
			
			$uploadfile = $uploaddir.$uploadName;
			
			$moved = move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
			if(!$moved){
				echo "<script>alert('Unable to move upload file to uploads folder!'); window.back();</script>";
				include($loc.'footer.php');
				die();			
			}
			$node->push("text","logo",$uploadName);
		}//End photo procesing
		
		//Send Insert Query
		if(($result = $mysql->insert($node)) === false )
			die($mysql->debugPrint());
		
		//Parse Errors
		$errorStr = @implode("<br/>",$error);
		$errorStr = base64_encode($errorStr);
		
		//Redirect
		echo "<script>window.location='index.php?e=$errorStr';</script>";
		die();	
	}//End Process Post Form
?>
<script src='http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=<?=$settings['ajaxApiKey'];?>' type='text/javascript'></script>		
<script src="../includes/googleajaxapi.js" type="text/javascript"></script>
<form action="add.php" method="post" enctype="multipart/form-data" id="addForm">
	<h2><?=$lang['Add_New_Dealer_Store'];?></h2>
	Your are here: <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Add_New_Dealer_Store'];?></a>	
      <p class="directions"><?=$lang['add_form_directions'];?></p>
      <table width="610" border="0" cellspacing="0" cellpadding="0" class="adminTable">
        <tr>
          <td><img src="../images/box_top.jpg"></td>
        </tr>
        <tr>
          <td class="rightbg"><table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
              <tr>
                <th colspan="2"><?=$lang['General_Information'];?></th>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Business_Name'];?>*</td>
                <td class="row"><input required='yes' validate='text' message="<?=	$lang['Enter_Business_Name'];?>" name="businessName" type="text" id="businessName" size="35"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Telephone']; ?></td>
                <td class="row"><input name="phone" type="text" id="phone" size="25"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Fax'];?></td>
                <td class="row"><input name="fax" type="text" id="fax" size="25"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Email'];?></td>
                <td class="row"><input name="email" type="text" id="email" size="30"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Hours'];?></td>
                <td class="row"><textarea name="hours" cols="40" rows="6" id="hours"></textarea></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Website'];?></td>
                <td class="row">
				<p>				
				<table width="100%" border="0">
				<tr>
				<td width="50%">
				<?=$lang['URL_to_Display']; ?><br>
                        <input name="shownWebsite" type="text" id="shownWebsite" size="25" onblur="if(this.form.website.value == '') this.form.website.value=this.value">
                        <br>
                  (e.g. http://www.google.com)<br>
                  <?=$lang['Actual_URL'];?><br>
                  <input name="website" type="text" id="website" size="25" onblur="loadExample(this.form);">
                  <br>
                  (e.g. http://www.google.com) <br>
                  <?=$lang['Open_URL_in'];?>:<br>
                  <select name="target" id="target">
                    <option value="_blank">_blank</option>
                    <option value="_parent">_parent</option>
                    <option value="_self">_self</option>
                    <option value="_top">_top</option>
                  </select>
                  , <?=$lang['other'];?>
                  <input name="otherTarget" type="text" id="otherTarget" size="12">
				  </td>
				  <td>
				  <div id="exampleURL" ></div>
				  </td>
				  </tr>
				  <tr>
				  <td colspan="2">
                  <input name="displayWebsite" type="checkbox" id="displayWebsite" value="1" checked>
                  <?=$lang['Display_Website_Link_On_Search_Results_Page'];?>
				  </td>
				  </tr>
				  </table>
                </p>
				</td>
              </tr>
              <tr class="column">
                <th colspan="2" valign="top"><?=$lang['Location_Information'];?></th>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Address'];?>*</td>
                <td class="row"><input required='yes' validate='text' message="<?=$lang['Enter_Address'];?>" name="address" type="text" id="address" size="30"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Address_2'];?></td>
                <td class="row"><input name="address2" type="text" id="address2" size="30"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['City'];?>*</td>
                <td class="row"><input required='yes' validate='text' message="<?=$lang['Enter_City'];?>" name="city" type="text" id="city" size="25"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['State_Province'];?></td>
                <td class="row"><input required='no' validate='text' message='<?=$lang['Enter_State_Province'];?>' name="state" type="text" id="state" size="25"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Zip_Postal_Code'];?></td>
                <td class="row"><input required='no' validate='text' message='<?=$lang['Enter_Zip_Postal_code'];?>' name="zip" type="text" id="zip" size="10"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Country'];?>*</td>
                <td class="row">
				<select name="country" required='yes' validate='text' message='<?=$lang['Select_Country'];?>'>
				<option value=""> -- <?=$lang['Select_Country'];?> -- </option>
				<?=countrySelectOptions($mysql, $settings['countryIso']);?>
				</select>
				</td>
              </tr>
              <tr class="column">
                <th colspan="2"><?=$lang['Mapping_Information'];?></th>
              </tr>
              <tr>
                <td class="column"><?=$lang['Latitude_and_Longitude'];?>* </td>
                <td class="row"><input onClick="if(this.checked) { this.form.latitude.style.backgroundColor = ''; this.form.latitude.disabled = true; this.form.longitude.style.backgroundColor = ''; this.form.longitude.disabled = true; }else { this.form.latitude.disabled=false; this.form.longitude.disabled=false; }" name="fetchLL" type="checkbox" id="fetchLL" value="1" checked="checked">
                  <?=$lang['Fetch_latidue_and_longitude'];?><br>
                  <br>
                  <?=$lang['Latitude'];?>:
                  <input name="latitude" required='yes' validate='text' message='<?=$lang['Enter_Latitude'];?>' type="text" id="latitude" size="20" disabled="disabled">
                  <br>
                  <?=$lang['Longitude'];?>:
                  <input name="longitude" required='yes' validate='text' message='<?=$lang['Enter_Longitude'];?>' type="text" id="longitude" size="20" disabled="disabled">
                  <br>
                  <br></td>
              </tr>
              <tr class="column">
                <th colspan="2"><?=$lang['Logo_Upload'];?></th>
              </tr>
              <tr>
                <td class="column"><?=$lang['JPG_File'];?></td>
                <td class="row"><input name="file" type="file" id="file" size="30"></td>
              </tr>
			  <tr>
			    <th colspan="2"><?=$lang['Optional_Detail_Page_TextHTML'];?></th>
			  </tr>
			  <tr>
			    <td class="column" colspan="2">
				<?
					require("../FCKEditor/fckeditor.php");
					$sBasePath = $_SERVER['PHP_SELF'] ;
					$sBasePath = substr($sBasePath,0,strpos($sBasePath,'dealers'));
					$sBasePath .= 'FCKEditor/';
					$oFCKeditor = new FCKeditor('pageHTML') ;
					$oFCKeditor->Config['SkinPath'] = 'skins/silver/' ;										
					$oFCKeditor->BasePath	= $sBasePath ;
					$oFCKeditor->Create() ;
				?>
			    </td>
			  </tr>
              <tr>
                <td class="column submitRow">&nbsp;</td>
                <td class="row submitRow"><input name="" onclick="if(validateNs(this.form)) addressLookUp(this.form);" type="button" value="<?=$lang['Add_New_Dealer_Store'];?>">
                    <input name="button" type="button" value="Cancel" onclick="history.back()"></td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td><img src="../images/box_bottom.jpg"/></td>
        </tr>
  </tr>
  </table>		
  </form>
  <script>
  function loadExample(form){
  	var exampleDiv = document.getElementById("exampleURL");
	var htmlStr = "<strong><?=$lang['Example_of_displayed_link'];?></strong>";
	htmlStr += "<input type='button' value='<?=$lang['Refresh'];?>' onclick='loadExample(this.form);'><br><br>";	
	htmlStr += "<a href='"+form.website.value+"'>"+form.shownWebsite.value+"</a>";

	exampleDiv.innerHTML = htmlStr;
  }
  </script>
<?
	include($loc.'footer.php');
?>