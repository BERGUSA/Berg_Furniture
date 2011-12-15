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
	# Edit Radius Option
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	//If POST, process form
	if(!empty($_POST['option']) && !empty($_POST['radiusid'])){
		//Build update sql
		$node = new sqlNode();
		$node->table = "radiusoptions";
		$node->push("text","option",$_POST['option']);
		$node->push("text","value",$_POST['value']);
		
		//Send Update Query
		$node->where = "where id = ".intval($_POST['radiusid']);
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
	
	//Fetch info
	$sql = "select * from radiusoptions where id = ".intval($_GET['id']);
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$row = mysql_fetch_assoc($result);
?>
<script src='http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=<?=$settings['ajaxApiKey'];?>' type='text/javascript'></script>		
<script src="../includes/googleajaxapi.js" type="text/javascript"></script>
<form action="edit.php" method="post" enctype="multipart/form-data" id="editForm">
	<h2>Edit Radius Option</h2>
	Your are here: <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#">Edit Radius Option</a>	
      <p class="directions"><?=$lang['edit_form_directions'];?></p>
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
                <td valign="top" class="column">Radius*</td>
                <td class="row"><input type="text" name="value" size="5" value="<?=$row['value'];?>" id="option" required="yes" message="Enter Radius Integer" validate="int"/></td>
              </tr>
              <tr>			  
                <td valign="top" class="column">Displayed Text*</td>
                <td class="row"><input type="text" name="option" size="40" value="<?=$row['option'];?>" id="option" required="yes" message="Enter Displayed Text" validate="text"/></td>
              </tr>			  
              <tr>
                <td class="column submitRow">&nbsp;</td>
                <td class="row submitRow"><input name="" onclick="if(validateNs(this.form)) this.form.submit();" type="button" value="<?=$lang['Update'];?>">
                    <input name="button" type="button" value="Cancel" onclick="history.back();"></td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td><img src="../images/box_bottom.jpg"/></td>
        </tr>
  </tr>
  </table>		
    <input type="hidden" name="redirect_get" value="<?=base64_encode($getStr);?>" />
	<input type="hidden" name="radiusid" value="<?=$row['id'];?>" />  
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