$(document).ready(function(){

		

		//HOME PAGE SLIDER

		//=================================================================================== 	 

		$('#loopedSlider').loopedSlider();

		

		//HOME PAGE 'NEW ITEMS' Cycle

		//=================================================================================== 	  

	  	$('.slideshow').cycle({

			fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc..

			timeout: '5000'

		});	

		

		//RIGHT-CLICK ON LOGO

		//=================================================================================== 

		//Show prompt for Hi-res Logos when you right-click the Berg Logo

		$('h1 a img').rightClick( function(e) {

			$('#hidden-logos').slideToggle(300);		

		});

		

		//Close prompt when you click the 'close' link

		$('.close').click(function() {

			$(this).parent().parent().slideToggle(150);

		});  







 	 	//ICON-TOOLTIPS

		//=================================================================================== 

		$("#icons img[title]").tooltip({tip:'#tip', effect:"fade", position: "top left", offset: [0,40]});

	  

	  	//PRODUCT IMAGE SLIDER 
		//=================================================================================== 

		$("div.scrollable").scrollable(); 
		
		//This function changes an attribute to a new attribute
		function changeAttributes (selector, oldAttribute, newAttribute) {
			var elem = $(selector);
			elem.each(function(){
				var attrTitle = $(this).attr(oldAttribute);
				var $this = $(this);
				$(this).removeAttr(oldAttribute);
				$(this).attr(newAttribute, attrTitle);
			});
		};
		
		//It's called here to change the 'title' attribute to 'data caption' in every thumbnail image
		//This is a roundabout way to remove the tooltips from displaying when the thumbnail is hovered over.  
		changeAttributes(".items img", "title", "data-caption");
		
		
		$(".bed_thumbs img").click(function() {
		// calclulate large image's URL based on the thumbnail
		// thumbnails have a '_t' appended to them, large images don't
		// this line of removes the '_t' to find the large image

		var url = $(this).attr("src").replace("_t.png",".jpg");

		// get handle to element that wraps the image and make it semitransparent

		var wrap = $(".imgWrap").fadeTo("medium", 1);
		
		// the large image
		var img = new Image();

		// call this function after it's loaded
		img.onload = function() {

			// make wrapper fully visible
			wrap.fadeTo("fast", 1);
	
			// change the image
			wrap.find("img").attr("src", url);
		};

		//get image caption from thumbnail title
		var titleStr = $(this).attr("data-caption");
		
		$("div#image_caption").html(titleStr);
		
		// begin loading the image from flickr
		img.src = url;

		// when page loads simulate a "click" on the first image
		}).filter(":first").click();
	
		$(".bed_thumbs img").click(function(){
			var url = $(this).attr("src").replace("_t.png","_line.jpg");
			var wrap = $(".simpleOverlayWrap").fadeTo("medium", 1);
			var img = new Image();
			img.onload = function () {
				wrap.fadeTo("fast", 1);
				wrap.find("img").attr("src",url);
			};
			img.src = url;
		}).filter(":first").click();


	  	//PRODUCT IMAGE SLIDER Edison Show
		//=================================================================================== 

		$("div#scrollable_pics").scrollable(); 
		
		//This function changes an attribute to a new attribute
		function changeAttributes(selector, oldAttribute, newAttribute) {
			var elem = $(selector);
			elem.each(function(){
				var attrTitle = $(this).attr(oldAttribute);
				var $this = $(this);
				$(this).removeAttr(oldAttribute);
				$(this).attr(newAttribute, attrTitle);
			});
		};
		//It's called here to change the 'title' attribute to 'data caption' in every thumbnail image
		//This is a roundabout way to remove the tooltips from displaying when the thumbnail is hovered over.  
		changeAttributes(".items2 img", "title", "data-caption");
		
		
		$(".items2 img").click(function() {
		// calclulate large image's URL based on the thumbnail
		// thumbnails have a '_t' appended to them, large images don't
		// this line of removes the '_t' to find the large image

		var url = $(this).attr("src").replace("_t.png",".jpg");

		// get handle to element that wraps the image and make it semitransparent

		var wrap = $(".imgWrap-edison").fadeTo("medium", 1);
		
		// the large image
		var img = new Image();

		// call this function after it's loaded
		img.onload = function() {

			// make wrapper fully visible
			wrap.fadeTo("fast", 1);
	
			// change the image
			wrap.find("img").attr("src", url);
		};

		//get image caption from thumbnail title
		var titleStr = $(this).attr("data-caption");
		
		$("div#image_caption-edison").html(titleStr);
		
		// begin loading the image from flickr
		img.src = url;

		// when page loads simulate a "click" on the first image
		}).filter(":first").click();

		
		
		


		//OVERLAYS

		//=================================================================================== 



		$("a[rel]").overlay({

			expose: { 

		        color: '#000', 

		        loadSpeed: 300, 

		        opacity: 0,
		        
		        closeOnEscape: true,
		        
		        closeOnClick: true

		    }, 

 		}); 

 		

 		//SCROLL TO

		//=================================================================================== 

		$.localScroll();

		

		//FACTORY TOUR SLIDESHOW

		//=================================================================================== 

		

		$("div.tabs").tabs(".FF_Images > div", { 

 

	        // enable "cross-fading" effect 

	        effect: 'fade', 

	        fadeInSpeed: "slow",

			fadeOutSpeed: "slow", 

 

	        // start from the beginning after the last tab 

	        rotate: true 

 

		    // use the slideshow plugin. It accepts its own configuration 

		    }).slideshow({

				autoplay: true,

				interval: 5000

		});

		

		// ROOM IDEAS PAGE

		//=================================================================================== 

		

		//IMAGE OPACITY ROLLOVERS

		

				$('div.animate a img').animate({'opacity' : 0.8}).hover(function() {

					$(this).animate({'opacity' : 1});

				}, function() {

					$(this).animate({'opacity' : 0.8});

				});

				

				//   IMAGE OVERLAYS

					$('div.animate a img[rel]').overlay({ 

						expose: { 

							color: '#000', 

							loadSpeed: 300, 

							opacity: 0.3 

				}   

				 

			});     

				

				// bind dropdowns in the form

				var $filterAlpha = $('#filter select[name="alpha"]');

				var $filterBeta = $('#filter select[name="beta"]');

				var $filterGamma = $('#filter select[name="gamma"]');



				// get the first collection

				var $applications = $('#applications');



				// clone applications to get a second collection

				var $data = $applications.clone();



				// attempt to call Quicksand on every form change

				$('select').change(

					function() {

						$(this).addClass('animate');

						if ($($filterAlpha).val() == '0'){

							if ($($filterBeta).val() == '0'){

								if ($($filterGamma).val() == '0'){

									//0-0-0

									var $filteredData = $data.find('div');

								} else {

									//0-0-1

									var $filteredData = $data.find('div[data-gamma=' + $($filterGamma).val() + ']' );

								}

							} else {

								if ($($filterGamma).val() == '0'){

									//0-1-0

									var $filteredData = $data.find('div[data-beta=' + $($filterBeta).val() + ']' );

								} else {

									//0-1-1

									var $filteredData = $data.find('div[data-beta=' + $($filterBeta).val() + ']' + 'div[data-gamma=' + $($filterGamma).val() + ']');

								}

							}

						} else {

							if ($($filterBeta).val() == '0'){

								if ($($filterGamma).val() == '0'){

									//1-0-0

									var $filteredData = $data.find('div[data-alpha=' + $($filterAlpha).val() + ']' );

								} else {

									//1-0-1

									var $filteredData = $data.find('div[data-alpha=' + $($filterAlpha).val() + ']' + 'div[data-gamma=' + $($filterGamma).val() + ']');

								}

							} else {

								if ($($filterGamma).val() == '0'){

									//1-1-0

									var $filteredData = $data.find('div[data-alpha=' + $($filterAlpha).val() + ']' + 'div[data-beta=' + $($filterBeta).val() + ']');

								} else {

									//1-1-1

									var $filteredData = $data.find('div[data-alpha=' + $($filterAlpha).val() + ']' + 'div[data-beta=' + $($filterBeta).val() + ']' + 'div[data-gamma=' + $($filterGamma).val() + ']');

								}

							}

						}

						

						// finally, call quicksand

					$applications.quicksand($filteredData, {

						    duration: 300,

						    easing: 'easeInOutQuad',

							adjustHeight:  	'auto' 

						}, function() {

								//   IMAGE OVERLAYS

								$('div.animate a img[rel]').overlay({ 

									expose: { 

										color: '#000', 

										loadSpeed: 300, 

										opacity: 0.3 

									}

								}); 

							

							$('div.animate a img').animate({'opacity' : 0.8}).hover(function() {

								$(this).animate({'opacity' : 1});

							}, function() {

								$(this).animate({'opacity' : 0.8});

							});	

						

						

						

						}); 

 

				});

				
				
				//add more than one pet bed
				



//show or hide the element based on the name provided
//must provide in string format, surrounded by "" or ''
//ex ShowHide('dropdown2') will hide dropdown2
//ex ShowHide('dropdown1','dropdown2', 'dropdown3') will hide all three
    function ShowHide() {
        var myElements = arguments;
        var myElement;
        var CheckBoxValue = document.getElementById("checkbox1").checked;
        if (CheckBoxValue == true) {    //checkbox is not selected
            for (var i = 0; i < myElements.length; i++) {
                myElement = document.getElementById(myElements[i]);
                myElement.selectedIndex = -1;
                myElement.style.visibility = "visible";
                //document.getElementById(myElements[i]).style.visibility = "visible";
            }
        } else {                        //checkbox is selected
            for (var i = 0; i < myElements.length; i++) {
                myElement = document.getElementById(myElements[i]);
                myElement.style.visibility = "hidden";
                //document.getElementById(myElements[i]).style.visibility = "hidden";
            }
        }
    }




				

				// CONTACT FORM VALIDATION

				//=================================================================================== 

				


				

				$("#contact-form").validate({

					errorClass: 'invalid',

					

					messages: {

						name: 'First and last name please!',

						address: 'Please give us a valid home address!',

						city: 'Please give us a valid city!',

						state: 'Please select a state!',

						zip: 'Please give us a valid zipcode!',

						email: 'Please enter a valid e-mail address!',
						
						phone: 'Please enter a valid 10-digit phone number!',

						store: 'If you are unsure, type "unsure"',
						
						item: 'Please, select an item!',
						
						finish: 'Please, select a finish',

						modelNo: 'If you are unsure, type "unsure"',

						purchaseDate: 'If you are unsure, type "unsure"',

						subject: 'What is your message about?',

						message: "We wanna hear from you, don't leave this blank!"

					},

					

					rules: {

						name: { minlength: 4 },

						address: { minlength: 5 },

						zip: {number: true, minlength: 5 },
						
						phone: {number: true, minlength: 10 },

						email: {email: true},

						message: {minlength: 10}

					}

					

				});

				

				$("form input, form textarea").click(function() {

					$(this).next('.error').hide();

				});

		

});