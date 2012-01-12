<!-- BEGIN: footer -->	
	<div id="Footer">
    	<div id="FooterBorder"></div>
        <div class="globalNav">       
                <div id="gNprod"><h4>PRODUCTS</h4><br />
                    <ul>
                        <li><a href="/space_savers.php">Space Savers</a></li>
                        <li><a href="/captains_bed.php">Captain's Bed</a></li>
                        <li><a href="/jr_captains_bed.php">Jr. Captain's Bed</a></li>
                        <li><a href="/enterprise_collection.php">Enterprise</a></li>
                        <li><a href="/utica.php">Utica</a></li>
                        <li><a href="/play_and_study.php">Play &amp; Study</a></li>
                        <li><a href="/platform_beds.php">Platform Beds</a></li>
                        <li><a href="/case_goods.php">Case Goods</a><li>
                    </ul>
                </div>
                <div id="gNcs"><h4>CUSTOMER SERVICE</h4><br />
                	<ul>	
                        <li><a href="/contact.php">Contact Us</a></li>
                        <li><a href="/faqs.php">FAQs</a></li>
                        <li><a href="/storelocator">Store Locator</a></li>
                        <li><a href="/factory_tour.php">Factory Tour</a></li>
                        <li><a href="/discontinued.php">Discontinued Items</a></li>
                    </ul>
                </div>
                <div id="gNabout"><h4><a href="/why_buy_berg.php">WHY BUY BERG?</a></h4><br />
                	<ul>
                    	<li><a href="/mission_statement.php">Mission Statement</a></li>
                        <li><a href="/research.php">Research</a></li>
                        <li><a href="/made_usa.php">Made in USA</a></li>
                        <li><a href="/consTech.php">Construction &amp; Tech</a></li>
                        <li><a href="/testimonies.php">Testimonials</a></li>
                        <li><a href="/history.php">History</a></li>
						<li><a href="/room_ideas_new.php">Room Ideas</a></li>
                    </ul>
                </div>
                <div style="padding-left: 30px; border-left: #333 solid thin;" id="gNcomm">
                    <h4>BERG COMMUNITY</h4>
                       <br />
                       <div id="friends">
						   <ul>
								<!-- Bedding by Cal Kids -- w/google analytics link tracker -->
								<li>Bedding by:</li>
								<li><a style="color: #FC0;" href="http://www.calkids.com" target="_blank" onClick="javascript: pageTracker._trackPageview('/G1/calkids.com');">California Kids</a></li>
								
								<!-- Knobs by One World --  w/google analytics link tracker-->
								<li style="padding-top:5px;">*Custom Knobs sold separately by:</li>
								<li><a style="color:#9F0;" href="http://www.oneworldkids.net" target="_blank" onClick="javascript: pageTracker._trackPageview('/G1/oneworldkids.net');">One World Kids</a></li>
							</ul>
                      </div>
                      <br />
                      
                      <!-- Facebook and Flickr Icons -->
					  
                          <a href="http://www.facebook.com/home.php?#/pages/Barrington-NJ/Berg-Furniture/251098782140?ref=nf" target="_blank" onClick="javascript: pageTracker._trackPageview("/G1/facebook.com");">
                          <img src="/img/fb_icon.png" 
                          alt="facebook, see more usa kids furniture" title="Berg on Facebook" style="float:left;"/></a>
                         
                          <a href="http://www.flickr.com/photos/bergfurniture" target="_blank" onClick="javascript: pageTracker._trackPageview("/G1/flickr.com");">
                          <img src="/img/fr_icon.png" 
                          alt="flickr, view more american children bunkbeds" title="Berg on Flickr"/></a>
              </div>
    			
                <div id="ftrLogo"><a href="/">Berg Furniture</a></div>
         		  
         </div>
	    <div id="ftrBtm">
	 		
			<p>&copy; 
			<?php 
				//display the year
				echo date(Y) 
			?> 
			Berg Furniture</p>
			
			<!-- this site created by Orry Baram -->
		
			<a id="madeUSA" href="/made_usa.php">
				<img src="/img/made_in_usa.png" alt="Made in USA" title="Made in USA" />
			</a> 
		</div>	   
    </div>
    
    
    <!-- JS
    ==================================================================-->
    
    <script type="text/javascript" src="js/jquery-1.6.4.js"></script>
    <script type="text/javascript" src="js/plugins.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
	
	
	
	<!-- Google Analytics -->
	
	
	<!--Old Google Analytics
	
	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		
		try {
		var pageTracker = _gat._getTracker("UA-10894475-1");
		pageTracker._trackPageview();
		} catch(err) {}
		
		
		
		-->
		
		<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-28142793-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
		
		
		<!-- External Link Tracker -->
		function recordOutboundLink(link, category, action) {
		  try {
		    var pageTracker=_gat._getTracker("UA-10894475-1");
		    pageTracker._trackEvent(category, action);
		    setTimeout('document.location = "' + link.href + '"', 100)
		  }catch(err){}
		}
	</script>
	    
		
	<!-- ASTEROIDS! -->
	
	<script>
		$.fn.konami = function (callback, code) {
        if (code == undefined) code = "38,38,40,40,37,39,37,39,66,65";
        return this.each(function () {
            var kkeys = [];
            $(this).keydown(function (e) {
                kkeys.push(e.keyCode);
                if (kkeys.toString().indexOf(code) >= 0) {
                    $(this).unbind('keydown', arguments.callee);
                    callback(e);
                }
            }, true);
        });
    }
    $(window).konami(function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://erkie.github.com/asteroids.min.js';
        document.body.appendChild(s); 
    });
	</script>
<!-- END: footer -->