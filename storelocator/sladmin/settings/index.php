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
	# Settings PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
	
	//If Post, process form
	if( isset($_POST['username']) && $_POST['username'] != ""){
		$node = new sqlNode();
		$node->table = "admin";
		$node->where = "where ID = 1";
		$node->push("text","username",$_POST['username']);
		$node->push("text","password",$_POST['password']);
		//Push other settings into assoc array
		$tempArray['mapKey'] = trim($_POST['mapKey']);
		$tempArray['contactEmail'] = trim($_POST['contactEmail']);
		$tempArray['contactPhone'] = trim($_POST['contactPhone']);
		$tempArray['countryIso'] = trim($_POST['countryIso']);
		$tempArray['ajaxApiKey'] = trim($_POST['ajaxApiKey']);
		$tempArray['distanceType'] = trim($_POST['distanceType']);
		$tempArray['withInDistance'] = intval($_POST['withInDistance']);
		$tempArray['pageTitle'] = trim($_POST['pageTitle']);
		$tempArray['metaKeywords'] = trim($_POST['metaKeywords']);
		$tempArray['metaDescription'] = trim($_POST['metaDescription']);
		
		//validate directory
		if(is_dir("../../skins/".strip_tags(trim($_POST['skin']))))
			$tempArray['skin'] = trim($_POST['skin']);
		else
			printf("<script>alert('/skins/%s does not exist!');</script>", $_POST['skin']);
		//Serialize and store
		$node->push("text","settings",serialize($tempArray));
		unset($tempArray);
		
		//Send Query
		if(($result = $mysql->update($node)) === false )
			die($mysql->debugPrint());
		
		echo "<script>alert('Settings Saved!');</script>";
	}
		
	//Fetch settings
	$sql = "select * from `admin` where ID = 1";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$settingsRow = mysql_fetch_assoc($result);
	$settingsArray = unserialize($settingsRow['settings']);
	
	
	//Create skin folder list
	$dir = dir("../../skins") or die("Script Stoped: Cannnot open /skins directory for reading!");	
	$dirList = "";
	while (false !== ($entry = $dir->read())) {
		$ignore = array(".", "..");
		if(!in_array($entry, $ignore) && is_dir("../../skins/".$entry) ){
			if($entry == $settingsArray['skin'])
				$select = "selected";
			else
				$select = "";
	   		$dirList .= sprintf("<option value='%s' %s>%s</option>\n", $entry, $select, $entry);
		}
	}
	$dir->close();
	
?>
<form action="index.php" method="post"id="settingsForm">
	<h2><?=$lang['General_Settings'];?></h2>
	<?=$lang['You_Are_Here'];?> <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['General_Settings'];?></a>	
      <p class="directions"><?=$lang['Settings_Directions'];?></p>
      <table width="610" border="0" cellspacing="0" cellpadding="0" class="adminTable">
        <tr>
          <td><img src="../images/box_top.jpg"></td>
        </tr>
        <tr>
          <td class="rightbg"><table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
              <tr>
                <th colspan="2"><?=$lang['Login_Information'];?></th>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Username'];?>*</td>
                <td class="row"><input required='yes' validate='text' message="<?=$lang['Username'];?>" value="<?=$settingsRow['username'];?>" name="username" type="text" id="username" size="20"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Password'];?>*</td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['Password'];?>' value="<?=$settingsRow['password'];?>" name="password" type="text" id="password" size="20"></td>
              </tr>
              <tr>
                <th colspan="2"><?=$lang['API_Keys'];?></th>
              </tr>			  
              <tr>
                <td valign="top" class="column"><?=$lang['Google_Map_Key'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['Google_Map_Key'];?>' value="<?=$settingsArray['mapKey'];?>" name="mapKey" type="text" id="mapKey" size="45"></td>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Google_Ajax_Key'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['Google_Ajax_Key'];?>' value="<?=$settingsArray['ajaxApiKey'];?>" name="ajaxApiKey" type="text" id="ajaxApiKey" size="45"></td>
              </tr>			  
              <tr>
                <th colspan="2"><?=$lang['Search_Settings']?></th>
              </tr>			  			  
              <tr>
                <td valign="top" class="column"><?=$lang['pageTitle'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['pageTitle'];?>' value="<?=$settingsArray['pageTitle'];?>" name="pageTitle" type="text" id="pageTitle" size="40"></td>
              </tr>			  
              <tr>
                <td valign="top" class="column"><?=$lang['metaKeywords'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['metaKeywords'];?>' value="<?=$settingsArray['metaKeywords'];?>" name="metaKeywords" type="text" id="metaKeywords" size="40"></td>
              </tr>			  			  
              <tr>
                <td valign="top" class="column"><?=$lang['metaDescription'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['metaDescription'];?>' value="<?=$settingsArray['metaDescription'];?>" name="metaDescription" type="text" id="metaDescription" size="40"></td>
              </tr>			  			  			  
              <tr>
                <td valign="top" class="column"><?=$lang['Contact_Email'];?></td>
                <td class="row"><input required='yes' validate='email' message='<?=$lang['Contact_Email'];?>' value="<?=$settingsArray['contactEmail'];?>" name="contactEmail" type="text" id="contactEmail" size="25"></td>
              </tr>			  
              <tr>
                <td valign="top" class="column"><?=$lang['Contact_Phone'];?></td>
                <td class="row"><input required='yes' validate='text' message='<?=$lang['Contact_Phone'];?>' value="<?=$settingsArray['contactPhone'];?>" name="contactPhone" type="text" id="contactPhone" size="25"></td>
              </tr>			  			  
              <tr>
                <td valign="top" class="column"><?=$lang['Select_Template']?></td>
                <td class="row">
				<select name="skin">
				<?=$dirList;?>
				</select>
				</td>
              </tr>			  			  
              <tr>
                <td valign="top" class="column"><?=$lang['Default_Country'];?></td>
                <td class="row">
				<select name="countryIso">
				<?=countrySelectOptions($mysql, $settingsArray['countryIso']);?>
				</select>
				</td>
              </tr>	
              <tr>
                <td valign="top" class="column"><?=$lang['Show_Results_With_In'];?></td>
                <td class="row">
				<input type="text" name="withInDistance" size="5" value="<?=$settingsArray['withInDistance'];?>" required='yes' validate='int' message='<?=$lang['Show_Results_With_In'];?>' />
				<select name="distanceType">
				<option value="MI" <? if($settingsArray['distanceType'] == "MI") echo "selected"; ?>>MILES</option>
				<option value="KM" <? if($settingsArray['distanceType'] == "KM") echo "selected"; ?>>KM</option>
				</select>				
				</td>
              </tr>				  			  		  			  			  			  
              <tr>
                <td class="column submitRow">&nbsp;</td>
                <td class="row submitRow"><input name="" onclick="validate(this.form);" type="button" value="<?=$lang['Update_Settings'];?>"></td>
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