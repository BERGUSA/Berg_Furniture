/*######################################################################################
# PHP STORE LOCATOR SCRIPT (phpscriptindex.com, phpstorelocatorscript.com)
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
# NOTICE: (C) DB DESIGN 2007, DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
# Code is NOT open source and subject to a software license agreement. You are
# allowed to modify the software to meet the needs of your domain in accordance with
# the software license agreement.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
# SUPPORT: phpstorelocatorscript.com, phpscriptindex.com/support/
# EMAIL SUPPORT: phpsales@gmail.com Monday - Friday 10:00am to 5:00pm EST
######################################################################################*/

var map = '';
var mapDiv = '';
var html = Array();
var markers = Array();

function load(lat, lng, level) {	
	try{
		var mapDiv = document.getElementById('mapDiv');
		mapDiv.innerHTML = '<div id="map" style="width: 350; height: 500px"></div>';
	} catch(e){
		try{
			var mapDiv = document.getElementById('smallMapDiv');	
			mapDiv.innerHTML = '<div id="map" style="width: 300; height: 200px"></div>';
		}catch(e){
			alert('Unable to load map');
			return;
		}
	}
	
	if (GBrowserIsCompatible()) {
		map = new GMap2(document.getElementById("map"));
		map.addControl(new GSmallMapControl());		
		map.addControl(new GMapTypeControl());		
	}else{
		alert('Cannot load map. Web browser does not support Google Maps');
		return;
	}

	try{
		map.setCenter(new GLatLng(lat, lng), level);
	}catch(e){
		alert('Cannot center map');
		return;
	}
}

function createMarker(lat, lng, html,icon, index) {
  var point = new GLatLng(lat, lng);
  var marker = new GMarker(point, icon);
  GEvent.addListener(marker, "click", function() {
    marker.openInfoWindowHtml(html);
	showInfo(index, 'hiddenDiv'+index)
  });
  return marker;
}

function showMiniMap(index){
	markers[index].showMapBlowup();
}
function showInfo(index, hiddenDivName){
	var hiddenDiv = document.getElementById(hiddenDivName);
	for(var i=0; i<html.length; i++){
		document.getElementById('itemDiv'+i).style.display = ""; //show item display
		document.getElementById('hiddenDiv'+i).style.display="none"; //hide details display
	}
	document.getElementById('itemDiv'+index).style.display = "none";
	hiddenDiv.style.display = "";
	markers[index].openInfoWindowHtml(html[index]);
	
}

//********************************************
    var drMap;
    var gdir;
    var geocoder = null;
    var addressMarker;    

    function setDirections(fromAddress, toAddress, locale) {
		document.getElementById("drOutDiv").style.display = '';		
		document.getElementById("directions").innerHTML = '';
		drMap = new GMap2(document.getElementById("drMap"));
		gdir = new GDirections(drMap, document.getElementById("directions"));
		GEvent.addListener(gdir, "error", handleErrors);		
		gdir.load("from: " + fromAddress + " to: " + toAddress, { "locale": locale });
    }

    function handleErrors(){
		if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS){
			document.getElementById("drOutDiv").style.display = 'none';		   
			alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
		}else if (gdir.getStatus().code == G_GEO_SERVER_ERROR){
			document.getElementById("drOutDiv").style.display = 'none';		   		   
			alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);
		}else if (gdir.getStatus().code == G_GEO_MISSING_QUERY){
			document.getElementById("drOutDiv").style.display = 'none';		   		   			
			alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);
		}else if (gdir.getStatus().code == G_GEO_BAD_KEY){
			document.getElementById("drOutDiv").style.display = 'none';		   		   		
			alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);
		}else if (gdir.getStatus().code == G_GEO_BAD_REQUEST){
			document.getElementById("drOutDiv").style.display = 'none';		   		   			
			alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);
		}else{ 
			document.getElementById("drOutDiv").style.display = 'none';		   		   					
			alert("Sorry. I'm unable to get directions for this address.");
		}
	}