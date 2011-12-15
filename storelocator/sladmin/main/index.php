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
	# PHP Store Locator Script Admin Index PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
		

	
	//Fetch total stores
	$sql = "select * from stores";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
		
	$total_stores = mysql_num_rows($result);
	
	function dirsize($dir,$buf=2){
		static $buffer;
		if(isset($buffer[$dir]))
			return $buffer[$dir];
		if(is_file($dir))
			return filesize($dir);
		if($dh=opendir($dir)){
				$size=0;
			while(($file=readdir($dh))!==false){
				if($file=='.' || $file=='..')
					continue;
				$size+=dirsize($dir.'/'.$file,$buf-1);
			}
			closedir($dh);
			if($buf>0)
				$buffer[$dir]=$size;
			return $size;
		}
		return false;
	}	
	
	$sql = "select version() as `v`";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
	$temp = mysql_fetch_assoc($result);
	$version = $temp['v'];
		
?>

<p>
<h2><?=$lang['Control_Panel_Welcome'];?></h2>
<?=$lang['You_Are_Here'];?> <a href="#">
<?=$lang['Admin_Home'];?>
</a>
<p class="directions"><?=$lang['Control_Panel_Directions'];?></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminTable">
  <tr>
    <td class="box_top_mid"><img src="../images/box_top_left.jpg" align="left" /><img src="../images/box_top_right.jpg" align="right" /></td>
  </tr>
  <tr>
    <td class="rightbg">
	<table width="96%" border="0" align="center" cellpadding="3" cellspacing="0" class="indexTable">
        <tr class="indexTR">
          <th colspan="2"><?=$lang['Stats'];?></th>
        </tr>
        <tr class="indexRow">
          <td class="" width="63%"><?=$lang['Store_Locator_Version'];?></td>
          <td width="37%" class="">1.2</td>
        </tr>
        <tr class="indexRow">
          <td class=""><?=$lang['Server_Software'];?></td>
          <td class=""><?=$_SERVER['SERVER_SOFTWARE'];?></td>
        </tr>
        <tr class="indexRow">
          <td class=""><?=$lang['MySQL_Version'];?></td>
          <td class=""><?=$version;?></td>
        </tr>
        <tr class="indexRow">
          <td class=""><?=$lang['Number_StoresDealers'];?></td>
          <td class=""><?=$total_stores;?></td>
        </tr>
        <tr class="indexRow">
          <td class=""><?=$lang['Image_upload_folder_size'];?></td>
          <td class=""><?=dirsize("../../uploads");?>
            bytes</td>
        </tr>
    </table>
	</td>
	</tr>
        <tr>
          <td class="box_bottom_mid"><img src="../images/box_bottom_left.jpg" align="left" /><img src="../images/box_bottom_right.jpg" align="right" /></td>
        </tr>
</table>
</p>
<?
	include($loc.'footer.php');
?>
