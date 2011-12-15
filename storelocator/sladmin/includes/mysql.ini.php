<?

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


##################################################################################
# Class: safe PHP
# Purpose: to help protect PHP from hacking, hijacking, etc. 
# Note: sql injection is prevented in the mysql class
##################################################################################
	class safePHP{
		function safePHP(){
		}

		function getSafe($formVars){
			if(sizeof($formVars)>0){
				foreach($formVars as $name => $value){
					if(is_array($value)){
						$tempArray = array();
						for($i=0; $i < sizeof($value); $i++){
							//Strip HTML tags
							$value[$i] = strip_tags($value[$i]);
							//Convert < to &lt;
							$value[$i] = str_replace('<',"&lt;",$value[$i]);
							//Convert > to &gt;
							$value[$i] = str_replace(">","&gt;",$value[$i]);
						}
						//Store safe value
						$safe[$name] = $value;
					}
					else{
						//Strip HTML tags
						$innerValue = strip_tags($innerValue);
						//Convert < to &lt;
						$innerValue = str_replace('<',"&lt;",$innerValue);
						//Convert > to &gt;
						$innerValue = str_replace(">","&gt;",$innerValue);
						//Store safe value
						$safe[$name] = $value;
					}
				}
				return $safe;
			}
			else{
				return $formVars;
			}
		}//END FUNCTION
		function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
		{
		  // Stripslashes
		  if (get_magic_quotes_gpc()) {
			   $theValue = stripslashes($theValue);
		  }
		
		  switch ($theType) {
		    case "text":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string(strip_tags($theValue)) . "'" : "NULL";
		      break;    
			case "html":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string($theValue) . "'" : "NULL";
		      break;    			
		    case "long":
		    case "int":
		      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
		      break;
		    case "double":
		      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
		      break;
		    case "date":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string(strip_tags($theValue)) . "'" : "NULL";
		      break;
		    case "defined":
		      $theValue = ($theValue != "") ? mysql_real_escape_string($theDefinedValue) : mysql_real_escape_string($theNotDefinedValue);
		      break;
		  }
		  return $theValue;
		}
	}//END CLASS
			

##################################################################################
#
# Class: tableNode
# Purpose: Table node represents a HTML table as an object, used in formGen class.
#
##################################################################################
	class tableNode{
		// string title ( Title of Table )
		var $title = '';
		// string width ( table width )
		var $width = '';
		// string class ( css class )
		var $class = '';
		// string align ( table align )
		var $align = '';
		// string colClass ( css class for table colums )
		var $colClass = '';
		// string other ( optional attributes in side table tag ) 
		var $other = '';
		
		/* 
		Function setTable(string width, string align, string title, string class, string other, string colClass)				
		Example: 
					$table = new tableNode();
					$table->setTable('500px','center');
		 */
		function setTable($width = '',$align = '',$title = '',$class = '',$other = '',$colClass = ''){
			$this->width = $width;
			$this->class = $class;
			$this->align = $align;
			$this->other = $other;
			$this->colClass = $colClass;
			$this->title = $title;
		}		
	}
	//____________________________________________________________________________________________
	
##############################################################################################
#
# Class: selectNode
# Purpose: Select node represents a HTML drop down menu as an object, used in formGen class.
# 
##############################################################################################
	class selectNode{
		// assoc array options ( HTML select options ) 
		var $options = array();
		// string name ( HTML select "name" attribute )
		var $name = '';
		// string title ( Used as column title )
		var $title = '';
		
		/*
		Function selectNode selectNode(string title, string name)
		Example:
					$selectMenu = new selectNode('Current Members','memberID');
		*/
		function selectNode($title = '', $name = 'select'){
			$this->title = $title;
			$this->name = $name;
		}
		/*
		Function void addOption(string value, string content)
		Example:
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->addOption('1','John Doe');
					$selectMenu->addOption('2','Jane Doe');
		*/
		function addOption($value,$content){
			$this->options[] = "<option value='$value' >$content</option>\r\n";
		}
		/*
		Function bool copyOptions(mysql result set copyResult, string valueKey, string contentKey)
		Example: 
					## using basic php mysql functions 
					$myconn = mysql_connect($host,$user,$pass);
					mysql_select_db($database_name,$myconn);
					$sql = 'select id,name,address from members order by name asc';
					$results = mysql_query($sql,$myconn) or die(mysql_error());
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->copyOptions($results,'id','name');
					
					## using mysql class
					$mysql = new mysql();
					$sqlObj = new sqlNode();
					$sqlObj->table = 'members';
					$sqlObj->select = 'id,name,address';
					$sqlObj->orderby = 'order by name asc';
					$result = $mysql->select($sqlObj);
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->copyOptions($result,'id','name');		
					
		*/
		function copyOptions($copyResult,$valueKey,$contentKey){
			$test = mysql_fetch_assoc($copyResult);
			while( $obj = mysql_fetch_assoc($copyResult) ){
				$this->options[] = "<option value='".$obj[$valueKey]."' >".$obj[$contentKey]."</option>\r\n";
			}
			return true;
		}
		/*
		Function bool copyEditOptions(mysql result set copyResult, string valueKey, string contentKey, string selectKey)
		Example: 
					## using basic php mysql functions 
					$myconn = mysql_connect($host,$user,$pass);
					mysql_select_db($database_name,$myconn);
					
					//select all members 
					$sql = 'select id,name,address from members order by name asc';
					$allMembers = mysql_query($sql,$myconn) or die(mysql_error());
					
					//select current record set 
					$sql = 'select memberID, foo, bar from items where id = 1';
					$CurrentRecordSet = mysql_query($sql,$myconn) or die(mysql_error());
					$row_recordSet = mysql_fetch_assoc($CurrentRecordSet);
					
					//create drop down menu object
					$selectMenu = new selectNode('Current Members','memberID');
					
					//populate drop down menu with all members and set member in CurrentRecordSet to "selected"	
					$selectMenu->copyEditOptions($allMembers,'id','name',$row_recordSet['memberID']);
					
					
					## using mysql class 
					$mysql = new mysql();
					$sqlObj = new sqlNode();
					$sqlObj->table = 'members';
					$sqlObj->select = 'id,name,address';
					$sqlObj->orderby = 'order by name asc';
					
					//select all members into an assoc array
					$allMembers = $mysql->select($sqlObj);
					
					//select current record set
					$sqlObj = new sqlNode();
					$sqlObj->table = 'members';
					$sqlObj->select = 'memberID, foo, bar';
					$sqlObj->where = 'where id = 1';
					$row_recordSet = $mysql->select_assoc($sqlObj);
					
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->copyEditOptions($allMembers,'id','name',$row_recordSet['memberID']);		
					
		*/		
		function copyEditOptions($copyResult,$valueKey,$contentKey,$selectKey){
			while($obj = mysql_fetch_assoc($copyResult)){
				if($obj[$valueKey] == $selectKey)
					$this->options[] = "<option value='".$obj[$valueKey]."' selected>".$obj[$contentKey]."</option>\r\n";
				else
					$this->options[] = "<option value='".$obj[$valueKey]."' >".$obj[$contentKey]."</option>\r\n";
			}
			return true;
		}
		/*
		Function string getSelect()
		Example: 
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->addOption('1','John Doe');
					$selectMenu->addOption('2','Jane Doe');
					$str = $selectMenu->getSelect();
		*/
		function getSelect(){
			$str = "<select name='$this->name'>\r\n";
			foreach($this->options as $value)
				$str .= $value;
			$str .= "</select>\r\n";
			return $str;
		}
		/*
		Function void printSelect()
		Example:
					$selectMenu = new selectNode('Current Members','memberID');
					$selectMenu->addOption('1','John Doe');
					$selectMenu->addOption('2','Jane Doe');
					$selectMenu->printSelect();					
		*/					
		function printSelect(){
			$str = "<select name='$this->name'>\r\n";
			foreach($this->options as $value)
				$str .= $value;
			$str .= "</select>\r\n";
			print $str;
		}			
				
			
	}
	
	//____________________________________________________________________________________________
	
	
##############################################################################################
#
# Class: formNode
# Purpose: Form node represents a HTML form as an object, used in formGen class.
# 
##############################################################################################	
	class formNode{
		//string action ( HTML form action attribute )
		var $action = '';
		// string method ( HTML form method attribute )
		var $method = '';
		// string enctype ( HTML form enctype attribute )
		var $enctype = '';
		// string submitValue ( HTML submit input 
		var $submitValue = 'Submit';
	}
	//____________________________________________________________________________________________
	
##############################################################################################
#
# Class: sqlNode
# Purpose: Sql node represents a sql query as an object, used in mysql class.
# 
##############################################################################################		
	class sqlNode{
		// string table ( mysql table name )
		var $table = '';
		// string select ( mysql table select )
		var $select = '';
		// assoc array items 
		var $items = array();
		// string where ( mysql where string )
		var $where = '';
		// string orderby ( mysql orderby string )
		var $orderby = '';
		// string limit ( mysql limit string )
		var $limit = '';
		
		/*
		Function string GetSQLValueString(string theValue, string theDefinedValue, string theNotDefinedValue)
		Example:
					Function is used internally by the sqlNode class to validate sql varables.
					For example:
						"foobar" is a string value in a mysql sql query:

						sql insert into items ('name') values("foobar")
						
						If foobar is a string quotes are added.
						If foobar is a int an int value is checked.
						If foobar is a doubl an double value is checked.
						If foobar is a data an data format is checked.
						If nothing is passsed as the value a NULL is returned.
						
		*/
		function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
		{
		  // Stripslashes
		  if (get_magic_quotes_gpc()) {
			   $theValue = stripslashes($theValue);
		  }
		
		  switch ($theType) {
		    case "text":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string(strip_tags($theValue)) . "'" : "NULL";
		      break;    
			case "html":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string($theValue) . "'" : "NULL";
		      break;    			
		    case "long":
		    case "int":
		      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
		      break;
		    case "double":
		      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
		      break;
		    case "date":
		      $theValue = ($theValue != "") ? "'" . mysql_real_escape_string(strip_tags($theValue)) . "'" : "NULL";
		      break;
		    case "defined":
		      $theValue = ($theValue != "") ? mysql_real_escape_string($theDefinedValue) : mysql_real_escape_string($theNotDefinedValue);
		      break;
		  }
		  return $theValue;
		}
		
		function push($type,$name,$value){
			$this->items[$name] = $this->GetSQLValueString($value,$type,$value);
		}
	}
	//____________________________________________________________________________________________
	
#####################################################################################################
#
# Class: mysql
# Purpose: Mysql class is an wrapper for mysql. 
# This class can:
# 			insert / delete / update / print table page sets / print admin table page sets
#
# The goal of this class is to simplify mysql and php in a object oriented fashion.
# Full examples are included under example folder in zip file for all tasks.
#####################################################################################################
	class mysql {
		// string   ( mysql username )
		var $user = '';
		// string pass ( mysql password )
		var $pass = '';
		// string db ( mysql database )
		var $db = '';
		// string host ( mysql host )
		var $host = 'localhost';
		// string conn ( mysql connection )
		var $conn = '';
		// array errorMsg
		var $errorMsg = array();
		
		/*
		Function mysql
		Example:
					$mysql = new mysql();		
		*/
		function mysql(){

			require('config.php');
			$this->host = $host;
			$this->user = $username;
			$this->db = $db;
			$this->pass = $password;
	
			if($this->conn = mysql_connect($this->host,$this->user,$this->pass)){
				mysql_select_db($this->db);
				return true;
			}
			else{
				$this->errorMsg[] = 'Connect Error:' . mysql_error();
				return false;
			}
		}
		
		
		/*
		Function <mysql result set> exSql(sqlNode sql)
		Example:
					//create new sql node 
					$sqlObj = new sqlNode();
					$sqlObj->table = 'members';
					$sqlObj->select = '*';
					
					//execute query
					$mysql = new mysql();
					$result = $mysql->exSql($sqlObj);
					//print error if query failed
					if(!$result)
						$mysql->debugPrint();
		*/			
		function exSql($sql){
			
			if($result = mysql_query($sql,$this->conn) ){
				return $result;
			}
			else{
				$this->errorMsg[] = 'Query Error:' . mysql_error();
				$this->errorMsg[] = 'SQL:'. $sql;
				return false;
			}
		}

		/*
		Function string insertSql(sql node sqlNode)
		Example:
					!!!This function is used internally by mysql class, but can be used outside of class the following way:
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->table = "members";
					$node->push("text","name","John Doe");
					$node->push("int","id",13);
					$node->push("text","address","123 River Drive");
					
					//generate insert sql query
					$sqlstr = $mysql->insertSql($node);
					
					
		*/				
		function insertSql($sqlNode){
			if(count($sqlNode->items) > 0){
				$str = "insert into $sqlNode->table ( ";
				foreach($sqlNode->items as $name => $value){
					$col[] = "`$name`";
					$values[] = $value;
				}
				$str .= implode(',',$col);
				$str .= ' ) values ( ' . implode(',',$values) . ' )';
				return $str . ' ' . $sqlNode->where . ' ' . $sqlNode->orderby . ' ' . $sqlNode->limit;
			}
			else
				return false;
		}
		
		/*
		Function string updateSql(sql node sqlNode)
		Example:
					!!!This function is used internally by mysql class, but can be used outside of class the following way:
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->table = "members";
					$node->push("text","name","Jane Doe");
					$node->where = "where id=13";
					
					$sqlstr = $mysql->updateSql($node);

					
		*/			
		function updateSql($sqlNode){
			if(count($sqlNode->items) > 0){
				$str = "update $sqlNode->table set ";
				foreach($sqlNode->items as $name => $value){
					$col[] = "`$name`=$value";
				}
				$str .= implode(',',$col);
				return $str . ' ' . $sqlNode->where . ' ' . $sqlNode->orderby . ' ' . $sqlNode->limit;
			}
			else
				return false;
		}
		/*
		Function string deleteSql(sql node sqlNode)
		Example:
					!!!This function is used internally by mysql class, but can be used outside of class the following way:
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->table = "members";
					$node->where = "where id=13";
					
					$sqlstr = $mysql->deleteSql($node);
		*/			
		function deleteSql($sqlNode){
			$str = "delete from $sqlNode->table " . $sqlNode->where . ' '. $limit;
			return $str;
		}
		/*
		Function string selectSql(sql node sqlNode)
		Example:
					!!!This function is used internally by mysql class, but can be used outside of class the following way:
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->table = "members";
					$node->select = "*";
					
					$sqlstr = $mysql->selectSql($node);
		*/			
		function selectSql($sqlNode){
			$str = "select $sqlNode->select from $sqlNode->table $sqlNode->where $sqlNode->orderby $sqlNode->limit";
			return $str;
			
		}
		/*
		Function <mysql result set> insert( sql node sqlNode )
		Example:
					$mysql = new mysql();
					$node = new sqlNode();
					$node->table = "members";
					$node->push("text","name","John Doe");
					$node->push("int","id",13);
					if($mysql->insert($node))
						print "Item Inserted";
					else
						$mysql->debugPrint();	
		*/
		function insert($sqlNode){
			return $this->exSql($this->insertSql($sqlNode));
		}
		/*
		Function <mysql result set> update( sql node sqlNode )
		Example:
					$node = new sqlNode();
					$node->table = "members";
					$node->push("text","name","Jen Boorn");
					$node->where = "where id=13";
					if($mysql->update($node))
						print "Item Updated<hr>";
					else
						$mysql->debugPrint();	
		*/
		function update($sqlNode){
			return $this->exSql($this->updateSql($sqlNode));
		}
		/*
		Function <mysql result set> delete( sql node sqlNode )
		Example:
					$node = new sqlNode();
					$node->table = "members";
					$node->where = "where id=13";
					if($mysql->delete($node))
						print "Item Deleted<hr>";
					else
						$mysql->debugPrint();		
		*/
		function delete($sqlNode){
			return $this->exSql($this->deleteSql($sqlNode));
		}
		/*
		Function <mysql result set> select( sql node sqlNode )
		Example:
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->select = '*';
					$node->table = 'members';
					
					$result = mysql->select($node);					
		*/
		function select($sqlNode){
			return $this->exSql($this->selectSql($sqlNode));
		}
		/*
		Function <mysql assoc array> select_assoc( sql node sqlNode )
		Example:
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->select = '*';
					$node->table = 'members';
					$node->where = 'id = 13';
					
					$result_row = mysql->select_assoc($node);					
		*/		
		function select_assoc($sqlNode){
			$result = $this->select($sqlNode);
			if($temp = @mysql_fetch_assoc($result))
				return $temp;
		}	
		/*
		Function void debugPrint()
		Example:
					If an mysql error is thrown ( a boolean false return in a function ) this function will print it.
		*/		
		function debugPrint(){
			print '<table border="1">';
			foreach($this->errorMsg as $error)
				print '<tr><td>' . $error . '</td></tr>';
			print '</table>';
		}
		/*
		Function void printPageSet(<mysql result set> results, <table node> tableNode)
		Example:
					# Function will print a page set table with a table header and column headers. 
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->select = '*';
					$node->table = 'members';
					$node->where = 'id = 13';
					
					$result = mysql->select($node);
					$mysql->printPageSet($result);
		*/
		function printPageSet($results,$tableNode){
			print "<div class='$tableNode->class' align='$tableNode->align'><span class='admin_title'>$tableNode->title</span></div>";
			print "<table width='$tableNode->width' align='$tableNode->align' class='$tableNode->class' $tableNode->other >";
			print "<tr>";
			//print col headers
			for($i = 0;$i < mysql_num_fields($results);$i++){
				$colinfo = mysql_fetch_field($results, $i);
			    if($colinfo){
			   		print "<td class='$tableNode->colClass'> $colinfo->name</td>";
				}
			}
			print "</tr>";
			$count = 2;
			while($obj = mysql_fetch_assoc($results)){
				if($count%2 == 0)
					print "<tr>";
				else
					print "<tr bgcolor='#FFFF99'>";
				$count++;
				
				foreach($obj as $value)
					print "<td>$value&nbsp;</td>";	
					
				print "</tr>";	
			}

			print "</table>";
		}	
		/*
		Function void printAdminPageSet(<mysql result set> results, <table node> tableNode,<string> passKey)
		Example:
					# Function will print a page set table with a table header and column headers with edit and delete links to admin pages
					
					$mysql = new mysql();
					
					$node = new sqlNode();
					$node->select = '*';
					$node->table = 'members';
					$node->where = 'id = 13';
					
					$result = mysql->select($node);
					$mysql->printAdminPageSet($result);
		*/				
		function printAdminPageSet($results,$tableNode,$passKey){
			print "<div class='$tableNode->class' align='$tableNode->align'><span class='admin_title'>$tableNode->title</span> - <a href='add.php'>Add New</a></div>";
			print "<table width='$tableNode->width' align='$tableNode->align' class='$tableNode->class' $tableNode->other >";
			print "<tr>";
			print "<td class='$tableNode->colClass'>Action</td>";
			//print col headers
			for($i = 0;$i < mysql_num_fields($results);$i++){
				$colinfo = mysql_fetch_field($results, $i);
			    if($colinfo){
			   		print "<td class='$tableNode->colClass'>$colinfo->name</td>";
				}
			}
			print "</tr>";
			$count = 2;
			while($obj = mysql_fetch_assoc($results)){
				if($count%2 == 0)
					print "<tr>";
				else
					print "<tr bgcolor='#FFFF99'>";
				$count++;
				
				//print_r($obj);
				print "<td><a href='edit.php?$passKey=".$obj[$passKey]."'>Edit</a>&nbsp;<a href='javascript:if(confirm(\"Are you sure you want to delete?\")) window.location=\"delete.php?$passKey=".$obj[$passKey]."\";' >Delete</a></td>";
				foreach($obj as $value)
					print "<td>$value&nbsp;</td>";
				print "</tr>";
			}
			print "</table>";
		}	
		function redirect($url){
			if(!header("Location:$url"))
				//uncomment befor window to use javascript redirect backup
				print "<script>//window.location='$url'</script>";
		}
	
	}
	

	//____________________________________________________________________________________________
	class formGen{
		var $elements = array();
		var $table = '';
		var $form = '';
		function formGen(){
			$this->table = new tableNode();
			$this->from = new formNode();
		}
		function add($title,$type,$name,$value = '',$other = ''){
			$this->elements[$title] = "<input type='$type' name='$name' value='$value' $other >";
		}
		function setTable($width = '',$align = '',$title = '',$class = '',$other = '',$colClass = ''){
			$this->table->setTable($width,$align,$title,$class,$other,$colClass);
		}
		function setForm($action,$method,$submitValue = 'Submit', $enctype = ''){
			$this->form->action = $action;
			$this->form->method = $method;
			$this->form->enctype = $enctype;
			$this->form->submitValue = $submitValue;
		}
			
		function printForm(){
			print "<div align='".$this->table->align."' class='admin_title'>".$this->table->title."</div>";
			print "<form action='".$this->form->action."' method='".$this->form->method."' enctype='".$this->form->enctype."' >";
			print "<table";
			print " class='".$this->table->class."' ";
			print " align='".$this->table->align."' ";
			print $this->table->other . " ";
			print ">";
			
			$count = 0;
			foreach($this->elements as $value){
				if(!strpos($value,"type='hidden'"))
					$count++;
			}
			
			foreach($this->elements as $name => $value){
				print "<tr><td class='".$this->table->colClass."'>$name</td><td>";
				print $value;
				if($count == 1 && (!strpos($value,"type='hidden'")) )
					print "<input type='submit' name='submit' value='".$this->form->submitValue."'>";					
				print "</td></tr>";
			}
			
			if($count != 1)
				print "<td></td><td><input type='submit' name='submit' value='".$this->form->submitValue."'></td>";
				
			print "</table>";
			print "</form>";
		}	
		function add_select($selectNode){
			$this->elements[$selectNode->title] = $selectNode->getSelect();
		}
		function add_textarea($description,$name,$value,$attributes){
			$this->elements[$description] = "<textarea  name='$name' $attributes >$value</textarea>";
		}
	}
			
	
?>