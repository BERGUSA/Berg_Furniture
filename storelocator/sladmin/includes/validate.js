/*****************************************************************************************************
* Easy Javascript Validation by Daniel Boorn
* Copyright 2006, All Rights reserved by Daniel Boorn
* Contact: daniel.boorn@gmail.com - wwww.dboorn.com
* In any form element add the following form attributes to validate
* required ="yes"
* validate = { "int", "float", "text", "email" }
* message = "Error Message for Element"
* Example: <input type="text" validate="int" message="Please enter valid zip code" name="zip">
*
* It is required that you add the following to any submit button
*     onClick="validate(this.form); return document.formSubmit;"
******************************************************************************************************/

	var timeoutId = "";
	var timeoutId2 = "";	
	var errorFormFields;
	var colorArray = new Array('#FF0000','#EE0000','#DD0000','#CC0000','#BB0000','#AA0000','#990000','#880000','#770000','#660000','#550000','#440000','#330000','#220000','#110000', "#C6C6C6");	

	function validate(form){
		errorFormFields = new Array();
		
		var error = "";
		//for each form element
		for(var i=0; i<form.length; i++){
			var element = form[i];
			element.style.backgroundColor="";
			element.style.border = "1px solid #C6C6C6";
			//if form field not required 
			if(!element.disabled){
				//if required
				if(element.getAttribute("required") == "yes"){
					//if form element if empty
					if(!valid(element.value,element.getAttribute("validate"),element)){
						error += element.getAttribute("message") + "\r\n";	
						errorFormFields.push(i);
						element.style.backgroundColor = "#CCFFFF";
					}
				}
				else if(element.getAttribute("validate") != ""){
					//if validation is need by not required
					if(element.value != ""){
						if(!valid(element.value,element.getAttribute("validate"),element))
							error += element.getAttribute("message") + "\r\n";
					}
				}
			}
		}
		
		//Alert Error
		if(error != ""){
			form[errorFormFields[0]].focus();
			alert(error);			
			changeColor(form.id, 0);
		}
		else{
			form.submit();
		}
			
			
	}
	
	function validateNs(form){
		errorFormFields = new Array();
		
		var error = "";
		//for each form element
		for(var i=0; i<form.length; i++){
			var element = form[i];
			element.style.backgroundColor="";
			element.style.border = "1px solid #C6C6C6";
			//if form field not required 
			if(!element.disabled){
				//if required
				if(element.getAttribute("required") == "yes"){
					//if form element if empty
					if(!valid(element.value,element.getAttribute("validate"),element)){
						error += element.getAttribute("message") + "\r\n";	
						errorFormFields.push(i);
						element.style.backgroundColor = "#CCFFFF";
					}
				}
				else if(element.getAttribute("validate") != ""){
					//if validation is need by not required
					if(element.value != ""){
						if(!valid(element.value,element.getAttribute("validate"),element))
							error += element.getAttribute("message") + "\r\n";
					}
				}
			}
		}
		
		//Alert Error
		if(error != ""){
			form[errorFormFields[0]].focus();
			alert(error);			
			changeColor(form.id, 0);
		}
		else{
			return true;
		}
			
			
	}	
	
	function changeColor(formId, colorId){
		
		form = document.getElementById(formId);
		
		for(var i=0;i<errorFormFields.length;i++){
//			alert(form[errorFormFields[i]]);
			if(colorArray[colorId] == "")
				form[errorFormFields[i]].style.border = "";			
			else
				form[errorFormFields[i]].style.border = "2px solid "+colorArray[colorId];
			
		}
		
		if(timeoutId != "")
			window.clearTimeout(timeoutId);
		
		colorId++;
		if(colorId<colorArray.length)
			timeoutId = window.setTimeout("changeColor('"+formId+"',"+colorId+")",300);
	}


	function changeColor2(divId, colorId){
		div = document.getElementById(divId);
		div.style.display = "";
		div.style.border = "2px solid "+colorArray[colorId];	
		if(timeoutId2 != "")
			window.clearTimeout(timeoutId2);		
		colorId++;
		if(colorId<colorArray.length)
			timeoutId2 = window.setTimeout("changeColor2('"+divId+"',"+colorId+")",300);
	}


	function valid(value,type,element){
		if(value == "")
			return false;
			
		switch(type){
			case "int":
				if(isNaN(parseInt(value)))
					return false;
				break;
			case "float":
				if(isNaN(parseFloat(value)))
					return false;
				break;
			case "email":					
				var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (!filter.test(value))
					return false;
				break;
			case "date(YYYY-MM-DD)":
				var filter  = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
				if (!filter.test(value))
					return false;
				break;				
			case "checked":
				if(!element.checked)
					return false;
				break;
			case "phone":// 555-555-5555
				var filter  = /^[2-9]\d{2}-\d{3}-\d{4}$/;
				if (!filter.test(value))
					return false;
				break;			
			case "creditcard": // 4444-4444-4444-4444
				var filter  = /^(\d{4}[- ]){3}\d{4}|\d{16}$/;
				if (!filter.test(value))
					return false;
				break;
			case "expdate": // MM/YY
				var filter  = /^((0[1-9])|(1[0-2]))\/(\d{2})$/;
				if (!filter.test(value))
					return false;
				break;				
				
			default://string
				break;
		}
		return true;
	}	

    function check_length(maxchars,message,div_id)
    {
    	var len = message.value.length;

        if(len > maxchars){
        	message.value = message.value.substr(0,maxchars);
        	len = maxchars;
        }

        document.getElementById(div_id).innerHTML = maxchars - len;
    }

	