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
		  		<div id="histPic"><img src="img/office_pic.png" alt="" /></div>
                    <div id="contHand"><img src="img/hand.png" alt=""  /></div>
                    <div class="aboutNav">
                      <ul>
                          <li><a href="history.php">History</a></li>
                          <li><a href="why_buy_berg.php">Why Buy Berg?</a></li>
                          
                          <li><a href="factory_tour.php">Factory Tour</a></li>
                          <li><a href="faqs.php">FAQs</a></li>
                          <li><a href="contact.php">Contact Us</a>
                          		<ul>
									<li><a href="contact.php"><b>General Questions</b></a></li>
									<li><a href="crib_contact.php">Crib Questions</a></li>
                         		</ul>
                          </li>
                      </ul>
                  </div>
                  <div id="contact">
                    <h5>General Questions</h5>
						<br />
						<br />
                    <p>Do you have questions, comments, or concerns? See a broken link or a bug on the website? 
					We would love to hear back from you.</p> 
                    
                   <div class="note">
						<h2>Before filling out the form:</h2>
						<ul>
							<li><a href="faqs.php">View our FAQs to see if your question has been answered.</a></li>
							<li><a href="crib_contact.php" >Have a question about a crib? Click here! </a></li>
						</ul>
					</div>

					<div id="contactForm">
					 
					<?php require("contact_config.php"); ?>
					
					<!-- Start HTML form -->
					   	<form name="form" method="post" action="<?php echo $self;?>" id="contact-form" class="contact-form">
							
					        <!-- Name -->
							<label for="name"><strong><span class="red">*</span> Name</strong></label>
							<input placeholder="First and Last" id="name" name="name" type="text" class="required" size="20" />
					
					            
					        <!-- City -->
							<label for="city"><strong><span class="red">*</span> City</strong></label>
							<input id="city" name="city" type="text" class="required" size="20" />
					            
					        <!-- State -->
							<label for="state"><strong><span class="red">*</span> State</strong></label>
							<input id="state" name="state" type="text" class="required" size="2" />
					            
					       <!-- Email -->
							<label for="email"><strong><span class="red">*</span> Email</strong></label>
							<input id="email" name="email" type="text" class="required" size="20" />
					 
							<!-- Daytime Phone Number -->
							<label for="phone"><strong> Phone Number</strong> </label>
							<input id="phone" name="phone" type="text" class="not-required" size="20" />
					            
					        
					       
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