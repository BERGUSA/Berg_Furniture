/*######################################################################################
# PHP STORE LOCATOR SCRIPT (phpscriptindex.com, phpstorelocatorscript.com)
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
# NOTICE: (C) DB DESIGN 2007, DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
# Code is NOT open source and subject to a software license agreement.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
# SUPPORT: phpstorelocatorscript.com, phpscriptindex.com/support/
# EMAIL SUPPORT: phpsales@gmail.com Monday - Friday 10:00am to 5:00pm EST
#######################################################################################*/

var popUpWin=0;
function popUpWindow(URLStr, left, top, width, height){
  if(popUpWin){
    if(!popUpWin.closed) popUpWin.close();
  }
  popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width='+width+',height='+height+',left='+left+', top='+top+',screenX='+left+',screenY='+top+'');
}


function ch(spanId, formId){
	try{
		var span = document.getElementById(spanId);
	}catch (e){
		alert('Unable to change country. Please contact site owner. Error Message: Iso div id is invalid.');
		return;
	}
	try{
		var form = document.getElementById(formId);
	}catch (e){
		alert('Unable to change country. Please contact site owner. Error Message: Iso form id is invalid.');
	}
	span.style.display='none';
	form.countryIso.style.display = '';
	
}
		