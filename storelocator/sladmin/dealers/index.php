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
	# Creat Store/Dealer Index PHP File
	###########################################################
		
	//Fetch Admin Header
	$loc = "../includes/";
	include($loc.'header.php');
	
	if(!isset($_GET['sort'])){
		$_GET['sort'] = "";
	}
	if(!isset($_GET['order'])){
		$_GET['order'] = "";
	}
	if(!isset($_GET['max'])){
		$_GET['max'] = "";
	}
	if(!isset($_GET['start'])){
		$_GET['start'] = "";
	}			
	if(!isset($_GET['op'])){
		$_GET['op'] = "";
	}				
	
		

	//If GET, process
	$errorStr = "";
	if( isset($_GET['e']) && $_GET['e'] != ""){
		//Parse Errors
		$errorStr = base64_decode($_GET['e']);
		$errorStr = "<span style='color:red; font-weight:bold;'>Notice: </span>".$errorStr;
	}
	
	//Fetch total stores
	$sql = "select * from stores";
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
		
	$total_stores = mysql_num_rows($result);

	
	//Fetch stores by page
	switch(trim($_GET['sort'])){
		case "1": 
			$sortColumn = "businessName";
			$sortId = 1;
			break;
		case "2":
			$sortColumn = "phone";
			$sortId = 2;
			break;
		case "3":
			$sortColumn = "address";
			$sortId = 3;
			break;
		case "3":
			$sortColumn = "address";
			$sortId = 3;
			break;
		case "4":
			$sortColumn = "state";
			$sortId = 4;
			break;
		case "5":
			$sortColumn = "postal";
			$sortId = 5;
			break;
		case "6":
			$sortColumn = "country";
			$sortId = 6;
			break;
		case "7":
			$sortColumn = "created";
			$sortId = 7;
			break;		
		case "8":
			$sortColumn = "preferred";
			$sortId = 8;
			break;					
		default:
			$sortColumn = "lastUpdate";
			$sortId = 9;
			break;
	}
	
	switch(trim($_GET['order'])){
		case "asc":
			$order = "asc";
			break;
		default:
			$order = "desc";
			break;
	}								
	
	$results_per_page = intval($_GET['max']);
	if($results_per_page==0)
		$results_per_page = 25;
		
	$startRow = intval($_GET['start']);
	if($_GET['op'] == "1"){
		if($startRow>0)
			$startRow--;
	}
	
	$sql = "select * from stores order by `$sortColumn` $order limit $startRow, $results_per_page ";
	$startRow++;	
	
	if(($result = $mysql->exSql($sql)) === false )
		die($mysql->debugPrint());
		
	//Configure Paging
	$total_pages = @ceil($total_stores/$results_per_page);
	$current_page = ceil($total_pages-($total_stores-$startRow)/$results_per_page);
	if($current_page==0)
		$current_page++;

	$getStr = "";	
	foreach($_GET as $key => $value){
		if(!in_array($key,array("start","e","op"))){
			$getStr .= "&$key=".urlencode($value);
		}
	}
		
	$maxPageDisplay = 100000000;
	$pageCounter = 0;
	$pageStr = "";
	for($i=1;$i<($total_pages+1);$i++){
		if($pageCounter < $maxPageDisplay){
			if($i!=$current_page)
				$paging[] =  "<a href='index.php?start=".(($i-1)*$results_per_page)."$getStr'>$i</a>";
			else
				$paging[] = "<strong>$i</strong>";
		}	
		$pageCounter++;
	}
	$pagingHTML = @implode(" | ",$paging);
	unset($paging);
	

	
	$actionGetStr = "";	
	foreach($_GET as $key => $value){
		if(!in_array($key,array("e"))){
			$actionGetStr .= "&$key=".urlencode($value);
		}
	}	
	
?>
<form action="index.php" method="get" id="indexForm">
<input type="hidden" name="op" value="1" />	  
	<h2><?=$lang['Manage_DealerStore'];?></h2>
	<?=$lang['You_Are_Here'];?> <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Manage_DealerStore'];?></a>	
      
	  <p class="error" id="errorDiv" style="display:none;"><?=$errorStr;?></p>
	  <? if(strlen($errorStr)>0) echo "<script>changeColor2('errorDiv',0);</script>"; ?>
	  
	  <p><a href="add.php"><img src="../images/icons/new.gif" border="0" align="absmiddle" /> <?=$lang['New_DealerStore'];?></a></p>
	  <p class="directions"><?=$lang['DealerStore_Directions'];?></p>
	  <p><strong><?=$total_stores;?> <?=$lang['DealerStore_Total'];?></strong></p>
	  <p><?=$lang['Show'];?> <input type="text" value="<?=$results_per_page;?>" size="2" name="max" required='yes' validate='int' message='<?=$lang['Results_Per_Page'];?>'/> <?=$lang['Per_Page_Starting_Row'];?> <input type="input" required='yes' validate='int' message="<?=$lang['Enter_Starting_Row'];?>" value="<?=$startRow;?>" size="2" name="start" />
	   <?=$lang['Sort_By'];?> 
	   <select name="sort">
	     <option value="1" <?=($sortId=="1" ? "selected":"");?>><?=$lang['Name'];?></option>
		 <option value="2" <?=($sortId=="2" ? "selected":"");?>><?=$lang['Telephone'];?></option>
		 <option value="3" <?=($sortId=="3" ? "selected":"");?>><?=$lang['Address'];?></option>
		 <option value="4" <?=($sortId=="4" ? "selected":"");?>><?=$lang['State_Province'];?></option>
		 <option value="5" <?=($sortId=="5" ? "selected":"");?>><?=$lang['Zip_Postal_Code'];?></option>
		 <option value="6" <?=($sortId=="6" ? "selected":"");?>><?=$lang['Country'];?></option>
		 <option value="7" <?=($sortId=="7" ? "selected":"");?>><?=$lang['Created'];?></option>
		 <option value="8" <?=($sortId=="8" ? "selected":"");?>><?=$lang['Last_Updated'];?></option>
		 <option value="8" <?=($sortId=="8" ? "selected":"");?>>Preferred</option>
	  </select>
	  <?=$lang['In'] = "in";?>
	  <select name="order">
	    <option value="asc" <?=($order=="asc" ? "selected":"");?>><?=$lang['Asc'];?></option>
		<option value="desc" <?=($order=="desc" ? "selected":"");?>><?=$lang['Desc'];?></option>
	  </select>
	  <?=$lang['Order'];?>
	   &nbsp;<input type="button" onclick="validate(this.form);" value="Go" /></p>
	   <p>Page: <?=$pagingHTML;?></p>
</form>	  
<script>
//toggleButton(this, <?=$row['id'];?>, 'act=preferred&id=<?=$row['id'];?>')
function toggleButton(button, storeid, actStr){
	$.post('manageoptions.php',{ act:actStr, id:storeid }, function(data){
		//alert($(data).find("value").text());
		button.value=$(data).find("value").text();
	});
}
</script>
<form action="delete.php" id="recordsetForm">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminTable">
        <tr>
          <td class="box_top_mid"><img src="../images/box_top_left.jpg" align="left" /><img src="../images/box_top_right.jpg" align="right" /></td>
        </tr>
        <tr>
          <td class="rightbg"><table width="96%" border="0" align="center" cellpadding="3" cellspacing="0" class="indexTable">
		      <tr>
			    <td colspan="7" class="indexRow">
			    <a href="javascript: selectrs('all','recordsetForm'); "><?=$lang['Select_All'];?></a> | <A href="javascript: selectrs('none','recordsetForm'); "><?=$lang['Select_None'];?></A> | <a href="javascript:if(confirm('<?=$lang['Are_You_Sure_You_Want_To_Delete'];?>')) document.getElementById('recordsetForm').submit();"><?=$lang['Delete_Selected'];?></a>
			    </td>
			  </tr>
              <tr class="indexTR">
			    <th>&nbsp;</th>
                <th><?=$lang['Business'];?></th>
				<th><?=$lang['Location'];?></th>
				<th><?=$lang['Created_Last_Update'];?></th>
				<th><?=$lang['Status'];?></th>
				<th>Preferred</th>
				<th><?=$lang['Action'];?></th>								
              </tr>
			  <? while($row = mysql_fetch_assoc($result)){ ?>
			  <tr class="indexRow" onmouseover="if(this.className!='clickRow') this.className='altRow'" onmouseout="if(this.className!='clickRow') this.className='indexRow'" onclick="if(this.className!='clickRow') this.className='clickRow'; else this.className='altRow'">
			  <td><input type="checkbox" value="<?=$row['id'];?>" name="id[]" id="id"/></td>	
			  <td><?=$row['businessName'];?><br/><a href="<?=$row['website'];?>" target="_blank"><?=$row['shownWebsite'];?></a></td>
			  <td><?=sprintf("%s %s - %s, %s %s %s<br/><strong>Tel:</strong> %s",$row['address'],$row['address2'],$row['city'],$row['state'],$row['postal'],$row['country'],($row['phone']!=""?$row['phone']:"n/a"));?></td>
			  <td><?=sprintf("%s, %s",$row['created'],$row['lastUpdate']);?></td>
			  <td>
			  <? 
			  	if( ($row['latitude'] == "") || ($row['longitude'] == "") )
					echo "<a href='#' title='".$lang['DealerStore_Lat_Long_NF']."' style='cursor:help'><div style='background-color:orange; width:20px; border:1px solid black;'>&nbsp;</div></a>";				
				else
					echo "<a href='#' title='".$lang['DealerStore_Lat_Long']."' style='cursor:help'><div style='background-color:green; width:20px; border:1px solid black;'>&nbsp;</div></a>";					
			  
			   ?>
			  </td>
			  <td><input type="button" onclick="toggleButton(this, <?=$row['id'];?>, 'preferred')" value="<?=($row['preferred']=="Yes"?"Yes":"No");?>" /></td>
			  <td width="11%">
			  <a href="weeklyad.php?id=<?=$row['id'].$actionGetStr;?>" title="<?=$lang['Click_To_Manage_Weekly_Ad'];?>"><img border="0" src="../images/icons/info.gif" /></a>			  
			  <a href="edit.php?id=<?=$row['id'].$actionGetStr;?>" title="<?=$lang['Click_To_Edit'];?>"><img border="0" src="../images/icons/edit2.gif" /></a>

			  </td>			  
			  </tr>
			  <? } ?>
          </table></td>
        </tr>
        <tr>
          <td class="box_bottom_mid"><img src="../images/box_bottom_left.jpg" align="left" /><img src="../images/box_bottom_right.jpg" align="right" /></td>
        </tr>
  </tr>
  </table>		

  <script>
  function loadExample(form){
  	var exampleDiv = document.getElementById("exampleURL");
	var htmlStr = "<strong><?=$lang['Example_of_displayed_link'];?></strong>";
	htmlStr += "<input type='button' value='<?=$lang['Refresh'];?>' onclick='loadExample(this.form);'><br><br>";	
	htmlStr += "<a href='"+form.website.value+"'>"+form.shownWebsite.value+"</a>";
	exampleDiv.innerHTML = htmlStr;
  }
  
  function selectrs(action, formid){
  	var form = document.getElementById(formid);
	switch(action){
		case "all":
			for(var i=0;i<form.id.length;i++){
				form.id[i].checked = true;
			}
			break;
		case "none":
			for(var i=0;i<form.id.length;i++){
				form.id[i].checked = false;
			}
			break;
	}
  }
  </script>
<?
	include($loc.'footer.php');
?>