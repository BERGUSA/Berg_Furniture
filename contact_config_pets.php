<?php

//==============
//CONFIGURATION
//==============

//Put in your email address below:
$to = 'marketing@bergfurniture.com';


//User info 
$name = stripslashes($_POST['name']); //sender's name
$location = stripslashes($_POST['location']); //sender's location
$email = stripslashes($_POST['email']); //sender's email
$phone = stripslashes($_POST['phone']); //sender's phone number
//The subject
$subject = stripslashes($_POST['subject']); // the subject


//The message you will receive in your mailbox
//Each parts are commented to help you understand what it does exaclty.
//YOU DON'T NEED TO EDIT IT BELOW BUT IF YOU DO, DO IT WITH CAUTION!
$msg  = "From : $name \r\n\n";  //add sender's name to the message
$msg .= "Location : $location \r\n\n"; //add sender's address to the message
$msg .= "e-Mail : $email \r\n\n";  //add sender's email to the message
$msg .= "Phone Number : $phone \r\n\n"; //add senders phone number
$msg .= "Store Info : $store \r\n\n"; //add senders store info
//$msg .= "Subject : $subject \r\n\n"; //add subject to the message (optional! It will be displayed in the header anyway)
$msg .= "---Message--- \r\n".stripslashes($_POST['message'])."\r\n\n";  //the message itself

//Extras: User info (Optional!)
//Delete this part if you don't need it
//Display user information such as Ip address and browsers information...
//$msg .= "---User information--- \r\n"; //Title
//$msg .= "User IP : ".$_SERVER["REMOTE_ADDR"]."\r\n"; //Sender's IP
//$msg .= "Browser info : ".$_SERVER["HTTP_USER_AGENT"]."\r\n"; //User agent
//$msg .= "User come from : ".$_SERVER["HTTP_REFERER"]; //Referrer
// END Extras


 if ($_SERVER['REQUEST_METHOD'] != 'POST'){
  $self = $_SERVER['PHP_SELF'];


} else {
    error_reporting(0);

  	if  (mail($to, $subject, $msg, "From: $email\r\nReply-To: $email\r\nReturn-Path: $email\r\n"))

  	//Message sent!
  	//It the message that will be displayed when the user click the sumbit button
  	//You can modify the text if you want
  	echo nl2br("
   	<div class=\"MsgSent\">
		<h2>Thank You!</h2>
		<p>Your message has been sent!<br /> We will get back to you as soon as possible.</p>
	</div>
   ");

   	else

    // Display error message if the message failed to send
    echo "
   	<div class=\"MsgError\">
		<h2>Error!!</h2>
		<p>Sorry <b><?=$name;?></b>, your message failed to send. Try later!</p>
	</div>";
}

?>