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

function stopRKey(evt) { //http://www.mediacollege.com/internet/javascript/form/disable-return.html
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text")) { return false; }
}
document.onkeypress = stopRKey;

function postcodeLookUp(form){
	var node = new geoNode();
	node.returnHandler = function(result){ 
		form.lat.value = result.lat;
		form.lng.value = result.lng;
		form.submit();
	};
	node.geocode(form.postcode.value+', '+form.countryIso.value);
}

function locationLookUp(form){
	var node = new geoNode();
	node.returnHandler = function(result){ 
		form.lat.value = result.lat;
		form.lng.value = result.lng;
		form.submit();
	};
	var loc = form.location.value + ", " + form.countryIso.value;
//	alert(loc);
	node.geocode(loc);	
}

function townLookUp(form){
	var node = new geoNode();
	node.returnHandler = function(result){ 
		form.lat.value = result.lat;
		form.lng.value = result.lng;
		form.town.value = result.city;
		form.state.value = result.region;
		form.submit();
	};
	var loc = form.town.value + " " + form.state.value + ", " + form.countryIso.value;
//	alert(loc);
	node.geocode(loc);	
}

function addressLookUp(form){
	if(form.fetchLL.checked){
		var node = new geoNode();
		node.returnHandler = function(result){ 
			form.latitude.value = result.lat;
			form.longitude.value = result.lng;
			form.fetchLL.checked = false;
			form.latitude.disabled = '';
			form.longitude.disabled = '';
			form.submit();
		};
		var loc = form.address.value + " " + form.address2.value + ", " + form.city.value + ", " + form.state.value + " " + form.zip.value + ", " + form.country.value;
//		alert(loc);
	}else{
		form.submit();
	}
	node.geocode(loc);	
}

function geoNode(){
	this.gls = new GlocalSearch();
	this.returnHandler = function (latitude, longitude){ };
	this.parseResult = function(){ 
		if(this.gls.results[0]){
			this.returnHandler(this.gls.results[0]);
		}else{
			alert('Sorry your location was not found.');
		}
	}
	this.geocode = function(loc){
		this.gls.setSearchCompleteCallback(this, this.parseResult);
		this.gls.execute(loc);
	}	
}
