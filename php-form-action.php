<?php

//Get the uploaded file information
$name_of_uploaded_file =  
    basename($_FILES['uploaded_file']['name']);

//get the file extension of the file
$type_of_uploaded_file = 
    substr($name_of_uploaded_file, 
    strrpos($name_of_uploaded_file, '.') + 1);

$size_of_uploaded_file = 
    $_FILES["uploaded_file"]["size"]/1024; //size in KBs
	

//Settings
$max_allowed_file_size = 2000; // size in KB 
$allowed_extensions = array("jpg", "jpeg", "gif", "bmp", "png");

//Validations
if($size_of_uploaded_file > $max_allowed_file_size ) 
{
  $errors .= "\n Size of file should be less than $max_allowed_file_size";
}

//------ Validate the file extension -----
$allowed_ext = false;
for($i=0; $i<sizeof($allowed_extensions); $i++) 
{ 
  if(strcasecmp($allowed_extensions[$i],$type_of_uploaded_file) == 0)
  {
    $allowed_ext = true;    
  }
}

if(!$allowed_ext)
{
  $errors .= "\n The uploaded file is not supported file type. ".
  " Only the following file types are supported: ".implode(',',$allowed_extensions);
}


//copy the temp. uploaded file to uploads folder
$path_of_uploaded_file = $upload_folder . $name_of_uploaded_file;
$tmp_path = $_FILES["uploaded_file"]["tmp_name"];

if(is_uploaded_file($tmp_path))
{
  if(!copy($tmp_path,$path_of_uploaded_file))
  {
    $errors .= '\n error while copying the uploaded file';
  }
}