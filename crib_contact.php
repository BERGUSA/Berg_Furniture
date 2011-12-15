<?php include 'head.php'; ?>
<title>Berg Furniture | Contact </title>
</head>
<body>
<div id="outside_container">
  <div class="container">
	
    	<?php include('header.php'); ?>
        
			  <div class="aboutContainer">
              		<div class="prodTitle">
                    	<p>Contact Us</p>
                    </div>  
		  		<div id="contactPic"><img src="img/crib_contact_pic.png" alt="" /></div>
                    <div id="contHand"><img src="img/hand.png" alt=""  /></div>
                    <div class="aboutNav">
                      <ul>
                          <li><a href="history.php">History</a></li>
                          <li><a href="why_buy_berg.php">Why Buy Berg?</a></li>
                          
                          <li><a href="factory_tour.php">Factory Tour</a></li>
                          <li><a href="faqs.php">FAQs</a></li>
                          <li><a href="contact.php">Contact Us</a>
                          		<ul>
                                <li><a href="contact.php">General Questions</a></li>
                                <li><a href="crib_contact.php"><b>Crib Questions</b></a></li>
                         		</ul>
                          </li>
                      </ul>
                  </div>
                  <div id="contact">
                    		
                    <h5>Crib Questions</h5>
						<br />
						<br />
                    <p>Do you have a question about your Berg Furniture Crib? Please fill out the following form and we will get back to you as soon as possible.</p> 
                    
                    <div id="crib-contact-warn">
						
						<a href="discontinued.php">
						Before contacting us, please review this important information regarding cribs!
						</a>
						
					</div>

					<div id="contactForm">
					 
					<?php require("contact_config.php"); ?>
					
					<!-- Start HTML form -->
					   	<form name="form" method="post" action="<?php echo $self;?>" id="contact-form" class="contact-form">
							
					        <!-- Name -->
							<label for="name"><strong><span class="red">*</span> Name</strong></label>
							<input placeholder="First and Last" id="name" name="name" type="text" class="required" size="20" />
					
							<!-- Address -->
							<label for="address"><strong><span class="red">*</span> Address</strong></label>
							<input id="address" name="address" type="text" class="required" size="20" />
					            
					        <!-- City -->
							<label for="city"><strong><span class="red">*</span> City</strong></label>
							<input id="city" name="city" type="text" class="required" size="20" />
					            
					        <!-- State -->
							<label for="state"><strong><span class="red">*</span> State</strong></label>
							<input id="state" name="state" type="text" class="required" size="2" />
					            
					        <!-- Zip -->
							<label for="zip"><strong><span class="red">*</span> Zip Code</strong></label>
							<input id="zip" name="zip" type="text" class="required" size="5" />
					        
					        <!-- Email -->
							<label for="email"><strong><span class="red">*</span> Email</strong></label>
							<input id="email" name="email" type="text" class="required" size="20" />
					 
							<!-- Daytime Phone Number -->
							<label for="phone"><strong> Phone Number</strong> </label>
							<input id="phone" name="phone" type="text" class="not-required" size="20" />
					            
					         <!-- Model # -->
							<label for="subject"><strong><span class="red">*</span> Model Number</strong></label>
								<input id="modelNo" name="modelNo" type="text" class="required" size="20" />
							
							<!-- Name of Store... -->
							<label for="Store"><strong><span class="red">*</span> Name of Store, City &amp; State Product was Purchased</strong> </label>
							<input placeholder="eg. Ronnie's Furniture Shack, Philadelphia, PA" id="store" name="store" type="text" class="required" size="20" />
					            
					        <!-- Purchase Date -->
							<label for="purchaseDate"><strong><span class="red">*</span> Purchase Date</strong></label>
							<input placeholder="mm/dd/yyyy" id="purchaseDate" name="purchaseDate" type="text" class="required" size="20" />
					       
						   <!-- Subject -->
							<label for="subject"><strong><span class="red">*</span> Subject</strong></label>
								<input id="subject" name="subject" type="text" class="required" size="20" />
					        
					       
					        <!-- Message -->
							<label for="msg"><strong><span class="red">*</span> Your message</strong></label><br />
							<textarea id="message" name="message" class="required" rows="10" cols="30"></textarea>
					
							<br /><br />
							<input type="submit" class="buttonSubmit" value="Send it!" />
					 
						</form> 
						
					</div>                   			
                </div>         	            
      	</div>
	</div>
</div>
<?php include('footer.php'); ?>

</body>
</html>