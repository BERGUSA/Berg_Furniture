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
		
	$uploadName = $_POST['uploadName'];
	$uploadFile = "../../uploads/".$uploadName;
		
	//Fetch file into array
	$fileArray = file($uploadFile) or die("<script>alert('".$lang['Unable_To_Open_Upload_File']."'); window.back();</script>");
	
//	var_dump($fileArray);
	
	$good = 0;
	$skipped = 0;
	$failed = 0;
	
	for($i=0;$i<sizeof($fileArray);$i++){
		//Skip first row (if needed)
		if( ($i==0) && ($_POST['skiprow'] == "1") ){
			continue;
		}
		
		
		$columns = @explode(",",$fileArray[$i]);
		
		for($jk=0;$jk<sizeof($columns);$jk++){ 
			$columns[$jk] = trim($columns[$jk]); //Clean
		}
		
		$node = new sqlNode();
		$node->table = "stores";
		$node->push("text","businessName",$columns[1]);
		$node->push("text","website",$columns[2]);
		$node->push("text","shownWebsite",$columns[2]);
		if(trim($columns[2]) != ""){
			$node->push("text","displayWebsite","1");
			$node->push("text","websiteTarget","_blank");
		}
		$node->push("text","address",$columns[3]);
		$node->push("text","address2",$columns[4]);
		$node->push("text","city",$columns[5]);
		$node->push("text","state",$columns[6]);
		$node->push("text","postal",$columns[7]);
		$node->push("text","country",$columns[8]);
		$node->push("text","phone",$columns[9]);
		$node->push("text","fax",$columns[10]);
		
		//If no latitude or longitude, fetch from Google Map API
		if( ($columns[11] == "") || ($columns[12] == "") ){			
			//Fetch latitude and longitude from Google
			$str = "?q=".urlencode($columns[3] . " " . $columns[4] . " " . ', '.$columns[5].' '.$columns[6].' '.$columns[7].', '.$columns[8]);
			$str.= "&key=".$settings['mapKey'];
			$str.= "&output=xml";
			
			//Send Request
//			echo $str;
			$result = XMLRPC_request('maps.google.com', '/maps/geo', 'geocode', $str);
			$cord = @$result['kml']['Response']['Placemark']['Point']['coordinates'];
			
			//Check for error
			if(strlen($cord) < 1){
				$errorCode = $result['kml']['Response']['Status']['code'];
				switch($errorCode){
					case "610":
						$error[] = "Google Map Error 610 (Bad Geocoder API Key). Please check settings.";
						break;
					default:
						$error[] = "Google Map Error ".$errorCode;
						break;
				}
			}
			
			if(strlen($cord) > 0){
			  $address = @explode(',',$cord);
			  $node->push("text","longitude",$address[0]);
			  $node->push("text","latitude",$address[1]);				  
			}
		}else{//User user input latitude and longitude
			$node->push("text","latitude",$columns[11]);
			$node->push("text","longitude",$columns[12]);
		}
		
		$node->push("text","email",$columns[13]);
		
		if($_POST['importAction'] == "insert"){
			$node->push("defined","created","NOW()");
			$node->push("defined","lastUpdate","NOW()");			
			if(($result = $mysql->insert($node)) === false )
				$failed++;
			else
				$good++;
		}elseif($_POST['importAction'] == "update"){
			if($columns[0] == ""){
				$skipped++;
			}else{
				$node->push("defined","lastUpdate","NOW()");
				$node->where = "where id = ".intval($columns[0]);
				if(($result = $mysql->update($node)) === false )
					$failed++;
				else
					$good++;
			}
		}		
	}	
	
	if($_POST['delFile'] == "1"){
		unlink($uploadFile);
	}
	$message = $lang['Completed']." $good | ".$lang['Failed']." $failed | ".$lang['Skipped']." $skipped";

?>
<h2><?=$lang['Bulk_Import_DealerStore_From_CSV_File_Step_3'];?></h2>
<?=$lang['You_Are_Here'];?> <a href="#"><?=$lang['Admin_Home'];?></a> &raquo; <a href="#"><?=$lang['Bulk_Import_DealerStore_From_CSV_File_Step_3'];?></a>	

<p class="error" id="errorDiv" style="display:none;"><?=$message;?></p>
<script>changeColor2('errorDiv',0);</script>

<p><a href="bulkimport.php"><?=$lang['Import_Another_File'];?></a></p>

<?
	include($loc.'footer.php');
?>