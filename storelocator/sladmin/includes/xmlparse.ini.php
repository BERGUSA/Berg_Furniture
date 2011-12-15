<?php

	########################################################################################
	# PHP STORE LOCATOR SCRIPT (phpscriptindex.com, phpstorelocatorscript.com)
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# NOTICE: (C) DB DESIGN 2007, DO NOT COPY OR DISTRIBUTE CODE WITH OUT PERMISSION
	# Code is NOT open source and subject to a software license agreement. You are
	# allowed to modify the software to meet the needs of your domain in accordance with
	# the software license agreement.
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
	# SUPPORT: phpstorelocatorscript.com, phpscriptindex.com/support/
	# EMAIL SUPPORT: phpsales@gmail.com Monday - Friday 10:00am to 5:00pm EST
	########################################################################################
	
	#################################################
	# XMLRPC_requirest Wrapper Module by DB Design
	#################################################


	function XMLRPC_request($site,$page,$name,$data,$soap = false){
		
		if($soap){
			$port = 80;
			$conn = fsockopen ($site, $port); #open the connection
			if(!$conn){ #if the connection was not opened successfully
				die("<font color='red'>Unable to connect to $site</font>");
			}
			$headers =
			"POST $page HTTP/1.0\r\n" .
			"Host: $site\r\n" .
			($user_agent ? "User-Agent: $user_agent\r\n" : '') .
			"Content-Type: text/xml; charset=utf-8" . "\r\n" .
			"Content-Length: " . strlen($data) . "\r\n" . 
			'SOAPAction: "http://www.ignyte.com/whatsshowing/GetTheatersAndMovies"' . "\r\n\r\n" .
			 $data . "\r\n";
			 
			fputs($conn, "$headers");
	
			#socket_set_blocking ($conn, false);
			$response = "";
			while(!feof($conn)){
				$response .= fgets($conn, 1024);
			}
			fclose($conn);
	
			#strip headers off of response
			$data = XML_unserialize(substr($response, strpos($response, "\r\n\r\n")+4));
			
			return $data;
		}else {
		
			$url = "http://".$site.$page.$data;
			$ch = curl_init($url); 
			curl_setopt($ch, CURLOPT_HEADER, 0); // set to 0 to eliminate header info from response
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Returns response data instead of TRUE(1)
			$responce = curl_exec($ch); //execute post and get results
			curl_close ($ch);
			
			if(strlen($responce)>1){
				$data = XML_unserialize($responce);
				return $data;
			}
			else{
				die("<font color='red'>Unable to open $site</font>");
			}
		}
	}
	## END DB DESIGN (C) CODE

	###################################################################################
	#
	# XML Library, by Keith Devens, version 1.2b
	# http://keithdevens.com/software/phpxml
	#
	# This code is OPEN SOURCE, released under terms similar to the Artistic License.
	# Read the license at http://keithdevens.com/software/license
	#
	###################################################################################
	
	###################################################################################
	# XML_unserialize: takes raw XML as a parameter (a string)
	# and returns an equivalent PHP data structure
	###################################################################################
	function & XML_unserialize(&$xml){
		$xml_parser = &new XML();
		$data = &$xml_parser->parse($xml);
		$xml_parser->destruct();
		return $data;
	}
	###################################################################################
	# XML_serialize: serializes any PHP data structure into XML
	# Takes one parameter: the data to serialize. Must be an array.
	###################################################################################
	function & XML_serialize(&$data, $level = 0, $prior_key = NULL){
		if($level == 0){ ob_start(); echo '<?xml version="1.0" ?>',"\n"; }
		while(list($key, $value) = each($data))
			if(!strpos($key, ' attr')) #if it's not an attribute
				#we don't treat attributes by themselves, so for an empty element
				# that has attributes you still need to set the element to NULL
	
				if(is_array($value) and array_key_exists(0, $value)){
					XML_serialize($value, $level, $key);
				}else{
					$tag = $prior_key ? $prior_key : $key;
					echo str_repeat("\t", $level),'<',$tag;
					if(array_key_exists("$key attr", $data)){ #if there's an attribute for this element
						while(list($attr_name, $attr_value) = each($data["$key attr"]))
							echo ' ',$attr_name,'="',htmlspecialchars($attr_value),'"';
						reset($data["$key attr"]);
					}
	
					if(is_null($value)) echo " />\n";
					elseif(!is_array($value)) echo '>',htmlspecialchars($value),"</$tag>\n";
					else echo ">\n",XML_serialize($value, $level+1),str_repeat("\t", $level),"</$tag>\n";
				}
		reset($data);
		if($level == 0){ $str = &ob_get_contents(); ob_end_clean(); return $str; }
	}
	###################################################################################
	# XML class: utility class to be used with PHP's XML handling functions
	###################################################################################
	class XML{
		var $parser;   #a reference to the XML parser
		var $document; #the entire XML structure built up so far
		var $parent;   #a pointer to the current parent - the parent will be an array
		var $stack;    #a stack of the most recent parent at each nesting level
		var $last_opened_tag; #keeps track of the last tag opened.
	
		function XML(){
			$this->parser = &xml_parser_create();
			xml_parser_set_option($this->parser, XML_OPTION_CASE_FOLDING, false);
			xml_set_object($this->parser, $this);
			xml_set_element_handler($this->parser, 'open','close');
			xml_set_character_data_handler($this->parser, 'data');
		}
		function destruct(){ xml_parser_free($this->parser); }
		function & parse(&$data){
			$this->document = array();
			$this->stack    = array();
			$this->parent   = &$this->document;
			$result = xml_parse($this->parser, $data, true);
			if($result){
				return  $this->document;
			}else{
				return NULL;
			}
		}
		function open(&$parser, $tag, $attributes){
			$this->data = ''; #stores temporary cdata
			$this->last_opened_tag = $tag;
			if(is_array($this->parent) and array_key_exists($tag,$this->parent)){ #if you've seen this tag before
				if(is_array($this->parent[$tag]) and array_key_exists(0,$this->parent[$tag])){ #if the keys are numeric
					#this is the third or later instance of $tag we've come across
					$key = count_numeric_items($this->parent[$tag]);
				}else{
					#this is the second instance of $tag that we've seen. shift around
					if(array_key_exists("$tag attr",$this->parent)){
						$arr = array('0 attr'=>&$this->parent["$tag attr"], &$this->parent[$tag]);
						unset($this->parent["$tag attr"]);
					}else{
						$arr = array(&$this->parent[$tag]);
					}
					$this->parent[$tag] = &$arr;
					$key = 1;
				}
				$this->parent = &$this->parent[$tag];
			}else{
				$key = $tag;
			}
			if($attributes) $this->parent["$key attr"] = $attributes;
			$this->parent  = &$this->parent[$key];
			$this->stack[] = &$this->parent;
		}
		function data(&$parser, $data){
			if($this->last_opened_tag != NULL) #you don't need to store whitespace in between tags
				$this->data .= $data;
		}
		function close(&$parser, $tag){
			if($this->last_opened_tag == $tag){
				$this->parent = $this->data;
				$this->last_opened_tag = NULL;
			}
			array_pop($this->stack);
			if($this->stack) $this->parent = &$this->stack[count($this->stack)-1];
		}
	}
	function count_numeric_items(&$array){
		return is_array($array) ? count(array_filter(array_keys($array), 'is_numeric')) : 0;
	}
?>