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
	# Edit Weekly Ad PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	//If POST, process form
	if($_POST['storeid'] != ""){
		//Build insert sql 
		$node = new sqlNode();
		$node->table = "stores";
		$node->push("text","displayWeeklyAd",$_POST['displayWeeklyAd']);
		$node->push("html","weeklyAd",$_POST['weeklyAd']);
		
		//Send Update Query
		$node->where = "where id = ".intval($_POST['storeid']);
		if(($result = $mysql->update($node)) === false )
			die($mysql->debugPrint());
		
		//Parse Errors
		$errorStr = @implode("<br/>",$error);
		$errorStr = base64_encode($errorStr);
		
		$redirect_get = base64_decode(trim($_POST['redirect_get']));
		
		//Redirect
		echo "<script>window.location='index.php?e=$errorStr$redirect_get';</script>";
		die();	
	}//End Process Post Form
	
	
	$getStr = "";	
	foreach($_GET as $key => $value){
		if($key != "id"){
			$getStr .= "&$key=".urlencode($value);
		}
	}
	
	//Fetch dealer information
	$sql = "select * from stores where id = ".intval($_GET['id']);
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$row = mysql_fetch_assoc($result);
	
?>
<form action="weeklyad.php" method="post" id="editForm">
	<h2><?=$lang['Edit_Dealer_Store_Weekly_Ad'];?></h2>
	Your are here: <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Edit_Dealer_Store_Weekly_Ad'];?></a>	
      <p class="directions"><?=$lang['edit_form_directions'];?></p>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminTable">
        <tr>
          <td class="box_top_mid"><img src="../images/box_top_left.jpg" align="left"/><img src="../images/box_top_right.jpg" align="right" /></td>
        </tr>
        <tr>
          <td class="rightbg"><table width="95%" border="0" align="center" cellpadding="3" cellspacing="0">
              <tr>
                <th colspan="2"><?=$lang['Ad_Information'];?></th>
              </tr>
              <tr>
                <td valign="top" class="column"><?=$lang['Display_Weekly_Ad'];?>*</td>
                <td class="row"><input type="checkbox" name="displayWeeklyAd" value="1" <?=($row['displayWeeklyAd']=="1" ? "checked" : "");?> /></td>
              </tr>
			  <tr class="column">
			    <td colspan="2" class="row">
				<?
					require("../FCKEditor/fckeditor.php");
					$sBasePath = $_SERVER['PHP_SELF'] ;
					$sBasePath = substr($sBasePath,0,strpos($sBasePath,'dealers'));
					$sBasePath .= 'FCKEditor/';
					$oFCKeditor = new FCKeditor('weeklyAd') ;
					$oFCKeditor->Config['SkinPath'] = 'skins/silver/' ;										
					$oFCKeditor->BasePath	= $sBasePath ;
					$oFCKeditor->Value		= $row['weeklyAd'] ;
					$oFCKeditor->Create() ;
				?>
				</td>
			  </tr>
              <tr>
                <td class="column submitRow">&nbsp;</td>
                <td class="row submitRow"><input name="" onclick="validate(this.form);" type="button" value="<?=$lang['Update'];?>">
                    <input name="button" type="button" value="Cancel" onclick="history.back();"></td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td class="box_bottom_mid"><img src="../images/box_bottom_left.jpg" align="left"/><img src="../images/box_bottom_right.jpg" align="right" /></td>
        </tr>
  </tr>
  </table>		
    <input type="hidden" name="redirect_get" value="<?=base64_encode($getStr);?>" />
	<input type="hidden" name="storeid" value="<?=$row['id'];?>" />  
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