

<?php
   if ($_SERVER['REQUEST_METHOD'] != 'POST'){
      $me = $_SERVER['PHP_SELF'];
?>
   
   
   <form name="form1" method="post" enctype="multipart/form-data"
         action="<?php echo $me;?>" class="contest_form">
      
         	<label>Parent's Name:</label>
            <input type="text" name="pName" class="fat">
            <label>Child's Name:</label>
            <input type="text" name="cName" class="fat">
            <label>Child's Age:</label>
            <input type="text" name="cAge" class="fat">
            <label>Address:</label>
            <input type="text" name="address" class="fat">
            <label>City:</label>
            <input type="text" name="city" class="fat">
            <label>State:</label>
            <input type="text" name="state" class="fat">
            <label>Zipcode:</label>
            <input type="text" name="zip" class="fat">
            <label>E-mail:</label>
            <input type="text" name="email" class="fat">
            <label>What makes your Berg room special!?:</label>
            <textarea name="MsgBody"></textarea>
            <label>Add your Pic!:</label> 
            <input type="file" name="filename">
            <br /><br />
            <input type="checkbox" value=1 name="agreeTerms"> I agree to the <a href="contest-rules.asp">Rules & Regulations</a>
           
           <br />
		   <br />

			 <input type="submit" name="Submit" value="Submit!" id="button">
 		</form>
   

<?php
   } else {
      
   // initialize a variable to 
   // put any errors we encounter into an array
   $errors = array();
   // test to see if the form was actually 
   // posted from our form
   $page = $_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
   if (!ereg($page, $_SERVER['HTTP_REFERER']))
      $errors[] = "Invalid referer\n";
   // check to see if a name was entered
   if (!$_POST['pName'])
      // if not, add that error to our array
      $errors[] = "Parent's name is required";
   if (!$_POST['cName'])
      // if not, add that error to our array
      $errors[] = "Child's name is required";
   if (!$_POST['cAge'])
      // if not, add that error to our array
      $errors[] = "Child's age is required";
   if (!$_POST['address'])
      // if not, add that error to our array
      $errors[] = "You forgot to tell us your address!";
  if (!$_POST['city'])
  // if not, add that error to our array
  $errors[] = "You forgot to tell us your city!";
  
  if (!$_POST['state'])
  // if not, add that error to our array
  $errors[] = "You forgot to tell us your state!";
  
  if (!$_POST['zip'])
  // if not, add that error to our array
  $errors[] = "You forgot to tell us your zip!";
  
  if (!$_POST['email'])
  // if not, add that error to our array
  $errors[] = "Let us know your e-mail so we can easily notify you if you win!";
   
   // check to see if a message was entered
   if (!$_POST['MsgBody'])
      // if not, add that error to our array
      $errors[] = "Add a description of your room, it doesnt need to be too long...";
	  
	   if (!$_POST['agreeTerms'] =='1')
      // if not, add that error to our array
      $errors[] = "Please check that you have read the terms of agreement";
   
   
   // if there are any errors, display them
   if (count($errors)>0){
      
      foreach($errors as $err)
        echo "$err<br \><br \>";
		
   } else {
      // no errors, so we build our message
	  
	  
	  
	  error_reporting(0);
      $recipient = 'marketing@bergfurniture.com';
      $subject   = '2010 Fall Photo Contest';
      $from      = stripslashes($_POST['pName'])."<".stripslashes($_POST['email']).">";
	  $kidName   = stripslashes($_POST['cName']);
	  $age		 = stripslashes($_POST['cAge']);
	  $address   = stripslashes ($_POST['address']); 
	  $address2  = stripslashes ($_POST['address2']); 
	  $city      = stripslashes ($_POST['city']); 
	  $state     = stripslashes ($_POST['state']); 
	  $zip       = stripslashes ($_POST['zip']); 
	  $email     = stripslashes($_POST['email']);
      
	  $msg = "Kid's Name: $kidName\n\n Age: $age\n\n Address:\n\n $address $address2\n $city, $state $zip\n\n Description:\n\n" .stripslashes($_POST['MsgBody']);
	
	// generate a random string to be used as the boundary marker
   $mime_boundary="==Multipart_Boundary_x".md5(mt_rand())."x";

   // store the file information to variables for easier access
   $tmp_name = $_FILES['filename']['tmp_name'];
   $type     = $_FILES['filename']['type'];
   $name     = $_FILES['filename']['name'];
   $size     = $_FILES['filename']['size'];

     //UPLOAD SETTINGS----------------------------------------------------------------> 
   
   // Configuration - Your Options
      $allowed_filetypes = array('.jpg','.gif','.bmp','.png'); // These will be the types of file that will pass the validation.
      $max_filesize = 2024288; // Maximum filesize in BYTES (currently 2MB).
      
 
   
   $ext = substr($name, strpos($name,'.'), strlen($name)-1); // Get the extension from the filename.
 
   // Check if the filetype is allowed, if not DIE and inform the user.
   if(!in_array($ext,$allowed_filetypes))
      die('The file you attempted to upload is not allowed.');
 
   // Now check the filesize, if it is too large then DIE and inform the user.
   if(filesize($_FILES['filename']['tmp_name']) > $max_filesize)
      die('The file you attempted to upload is too large.');
   
//------------------------------------------------------------------------------------->
   

   // if the upload succeded, the file will exist
   if (file_exists($tmp_name)){

      // check to make sure that it is an uploaded file and not a system file
      if(is_uploaded_file($tmp_name)){

         // open the file for a binary read
         $file = fopen($tmp_name,'rb');

         // read the file content into a variable
         $data = fread($file,filesize($tmp_name));

         // close the file
         fclose($file);

         // now we encode it and split it into acceptable length lines
         $data = chunk_split(base64_encode($data));
     }

      // now we'll build the message headers
      $headers = "From: $from\r\n" .
         "MIME-Version: 1.0\r\n" .
         "Content-Type: multipart/mixed;\r\n" .
         " boundary=\"{$mime_boundary}\"";

      // next, we'll build the message body
      // note that we insert two dashes in front of the
      // MIME boundary when we use it
      $msg = "This is a multi-part message in MIME format.\n\n" .
         "--{$mime_boundary}\n" .
         "Content-Type: text/plain; charset=\"iso-8859-1\"\n" .
         "Content-Transfer-Encoding: 7bit\n\n" .
         $msg . "\n\n";

      // now we'll insert a boundary to indicate we're starting the attachment
      // we have to specify the content type, file name, and disposition as
      // an attachment, then add the file content and set another boundary to
      // indicate that the end of the file has been reached
      $msg .= "--{$mime_boundary}\n" .
         "Content-Type: {$type};\n" .
         " name=\"{$name}\"\n" .
         //"Content-Disposition: attachment;\n" .
         //" filename=\"{$fileatt_name}\"\n" .
         "Content-Transfer-Encoding: base64\n\n" .
         $data . "\n\n" .
         "--{$mime_boundary}--\n";	
      
	  if (mail($recipient, $subject, $msg, $headers))
         echo nl2br("<b>Your submission has been sent successfully!</b>");
      else
         echo "Message failed to send";
}
   }
   }
   ?>