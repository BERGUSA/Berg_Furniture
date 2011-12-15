<?
	
	//MySQL Backup, wraps MySQL Class
	class MySQLBackup{
		
		var $mysql;
		var $delimiter = "-- -----SQL DELIMITER-------\n";
		
		/* MySQL Backup Constructor (void) */
		function MySQLBackup($mysql){
			$this->mysql = $mysql;
		}	
		
		/* Adjust Flag Module (string) */
		function adjustFlags($flags){
			$flags = str_replace("not_null", "not null", $flags);
			$flags = str_replace("primary_key", "primary key", $flags);
			$flags = str_replace("multiple_key", "", $flags);
			return $flags;
		}
		
		/* Fetch Column Information Module (mysql result, int) */
		function fetchColInfo($result,$i){
			$type = mysql_field_type($result,$i);
			$length = mysql_field_len($result,$i);
			$flags = $this->adjustFlags(mysql_field_flags($result,$i));
			switch($type){
				case "int": $str = sprintf("int(%s) %s", $length, $flags); break;
				case "string": $str = sprintf("char(%s) %s", $length, $flags); break;
				case "blob": $str = "text"; break;
				case "real": $str = sprintf("real %s", $flags); break;
				case "timestamp": "timestamp"; break;
				case "date": $str = "date"; break;
				case "datetime": $str = "datetime"; break;
				case "time": $str = "time"; break;
				default: $str = sprintf("%s %s", $type, $flags); break;
			}
			return $str;
		}
		
		/* Parse Escape String Module (string) */
		function parseEscapeString($sql){
			$sql = html_entity_decode($sql, ENT_COMPAT);
			$str = "";
			for($i=0; $i<strlen($sql); $i++){
				if( $sql{$i}=='"'){
					if( ($i>0)&&($sql{$i-1}!= chr(92)) ){
						$str .= chr(92);
					}
				}
				$str .= $sql{$i};				
			}
			return $str;
		}
		
		/* Write To File Module (string) */
		function writeToFile($file, $buffer){
		    $written = trim(file_put_contents($file,$buffer));
			if(!$written){
				printf("Cannot open file %s.", $file);
				return false;
			}
			return true;
		}
		
		/* Restore Module (string) */
		function restore($file){
			$buffer = file_get_contents($file) or die("Cannot open file!");
			//Cut into sql statements
			$sqlList = explode($this->delimiter, $buffer);
			for($i=0; $i<sizeof($sqlList); $i++){
				$sqlList[$i] = trim($sqlList[$i]);
				if($sqlList[$i] != ""){
					$result = mysql_unbuffered_query($sqlList[$i], $this->mysql->conn) or die('An SQL error has been detected: '.mysql_error()."<hr>".$sqlList[$i]);
				}
			}
			return true;
		}
		
		/* Backup Module (string) */
		function backup($file){
			//Fetch all tables in database
			$result = mysql_list_tables($this->mysql->db, $this->mysql->conn);
			if(!$result){
				die($this->mysql->debugPrint());
			}

			//For each table => build table sql
			$sql = "";
			while($table = mysql_fetch_row($result)){
				$sql .= sprintf("drop table if exists `%s`;\n%s", $table[0], $this->delimiter); // Gen drop table sql
				$selectSql = sprintf("select * from `%s`", $table[0]);
				$colRS = $this->mysql->exSql($selectSql) or die($this->mysql->debugPrint());

				//For each column in table => build column structure
				$columnList = array();
				$columnNames = array();
				$totalCols = mysql_num_fields($colRS);				
				for($i=0; $i<$totalCols; $i++){
					$columnList[] = sprintf("`%s` %s", mysql_field_name($colRS,$i), $this->fetchColInfo($colRS,$i));
					$columnNames[] = sprintf("`%s`", mysql_field_name($colRS, $i));
				}
				$sql .= sprintf("create table `%s` (\n%s);\n%s", $table[0], implode(",\n", $columnList), $this->delimiter); // Gen create table sql

				//For each row in table => Gen row sql
				$tmp = sprintf("insert into `%s` (%s)", $table[0], implode(", ", $columnNames));				
				while($row = mysql_fetch_array($colRS)){
					$rowData = array();
					for($i=0; $i<$totalCols; $i++){
						$rowData[] = sprintf("\"%s\"", $this->parseEscapeString($row[$i]));
					}
					$sql .= sprintf("%s VALUES (%s);\n%s", $tmp, implode(",",$rowData), $this->delimiter);
				}
			}
			return $this->writeToFile($file, $sql);
//			printf("<textarea cols='100' rows='20'>%s</textarea>", $sql);
		}
		
		
	}
?>
				
		
		
		
		
		
			