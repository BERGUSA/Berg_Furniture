<?php

//==============
//CONFIGURATION
//==============

//Put in your email address below:
$to = 'marketing@bergfurniture.com';


//User info 
$name = stripslashes($_POST['name']); //sender's name
$address = stripslashes($_POST['address']); //sender's address
$city = stripslashes($_POST['city']); //sender's city
//$state = stripslashes($_POST['state']); sender's state
$state = $_POST['state'];
$zip = stripslashes($_POST['zip']); //sender's zip
$email = stripslashes($_POST['email']); //sender's email
$phone = stripslashes($_POST['phone']); //sender's phone number
$item = $_POST['item'];
$finish = $_POST['finish'];
//The subject
$subject = stripslashes($_POST['subject']); // the subject


//The message you will receive in your mailbox
//Each parts are commented to help you understand what it does exaclty.
//YOU DON'T NEED TO EDIT IT BELOW BUT IF YOU DO, DO IT WITH CAUTION!
$msg  = "From : $name \r\n\n";  //add sender's name to the message
$msg .= "Address : $address \r\n\n"; //add senders address to the message
$msg .= "City : $city \r\n\n"; //add senders city to the message
$msg .= "State : $state \r\n\n"; //add senders state to the message
$msg .= "Zip code : $zip \r\n\n"; //add senders zip code to the message
$msg .= "e-Mail : $email \r\n\n";  //add sender's email to the message
$msg .= "Phone Number : $phone \r\n\n"; //add senders phone number
$msg .= "Item # : $item \r\n\n";
$msg .= "Finish : $finish \r\n\n";
//$msg .= "Store Info : $store \r\n\n"; //add senders store info
//$msg .= "Subject : $subject \r\n\n"; //add subject to the message (optional! It will be displayed in the header anyway)
//$msg .= "---Message--- \r\n".stripslashes($_POST['message'])."\r\n\n";  //==the message itself

//Extras: User info (Optional!)
//Delete this part if you don't need it
//Display user information such as Ip address and browsers information...
//$msg .= "---User information--- \r\n"; //Title
//$msg .= "User IP : ".$_SERVER["REMOTE_ADDR"]."\r\n"; //Sender's IP
//$msg .= "Browser info : ".$_SERVER["HTTP_USER_AGENT"]."\r\n"; //User agent
//$msg .= "User come from : ".$_SERVER["HTTP_REFERER"]; //Referrer
// END Extras

//STATES




//END STATES


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
		<p>Inital order has been sent!<br /> A Berg Furniture representative will contact you to process payment shortly.</p>
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