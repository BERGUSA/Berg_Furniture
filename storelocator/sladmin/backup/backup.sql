drop table if exists `admin`;
-- -----SQL DELIMITER-------
create table `admin` (
`ID` int(11) not null primary key,
`username` char(50) ,
`password` char(50) ,
`lastlogin` datetime,
`settings` text);
-- -----SQL DELIMITER-------
insert into `admin` (`ID`, `username`, `password`, `lastlogin`, `settings`) VALUES ("1","admin","admin","2007-03-16 12:38:11","a:11:{s:6:\"mapKey\";s:86:\"ABQIAAAAjRk8iv35AxBsH-9DfgKlDRSQUwbHYFRyBYlKaJYhfxNu35QOAxRJtQEpq34pAJaRKR1yklLU6AskwQ\";s:12:\"contactEmail\";s:19:\"example@website.com\";s:12:\"contactPhone\";s:14:\"(555) 555-5555\";s:11:\"countryIso3\";s:3:\"USA\";s:10:\"ajaxApiKey\";s:86:\"ABQIAAAAjRk8iv35AxBsH-9DfgKlDRSQUwbHYFRyBYlKaJYhfxNu35QOAxRJtQEpq34pAJaRKR1yklLU6AskwQ\";s:12:\"distanceType\";s:2:\"MI\";s:14:\"withInDistance\";i:100;s:9:\"pageTitle\";s:46:\"PHP Store Locator Script -- Search for a Store\";s:12:\"metaKeywords\";s:55:\"PHP, Store, Locator, Script, Finder, Search, Zip, MySQL\";s:15:\"metaDescription\";s:73:\"PHP Store Locator Script -- Allow customers to search for stores/dealers.\";s:4:\"skin\";s:6:\"silver\";}");
-- -----SQL DELIMITER-------
drop table if exists `categories`;
-- -----SQL DELIMITER-------
create table `categories` (
`ID` int(11) not null primary key auto_increment,
`Title` char(50) ,
`FatherID` int(11) ,
`Locked` char(5) ,
`PageTitle` char(150) ,
`MetaKeywords` text,
`MetaDescription` text,
`PageHeader` text,
`PageFooter` text);
-- -----SQL DELIMITER-------
drop table if exists `countries`;
-- -----SQL DELIMITER-------
create table `countries` (
`id` int(11) not null primary key auto_increment,
`iso` char(2) not null,
`name` char(100) not null,
`iso3` char(3) );
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("1","AF","Afghanistan","AFG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("2","AL","Albania","ALB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("3","DZ","Algeria","DZA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("4","AS","American Samoa","ASM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("5","AD","Andorra","AND");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("6","AO","Angola","AGO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("7","AI","Anguilla","AIA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("8","AQ","Antarctica","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("9","AG","Antigua and Barbuda","ATG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("10","AR","Argentina","ARG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("11","AM","Armenia","ARM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("12","AW","Aruba","ABW");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("13","AU","Australia","AUS");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("14","AT","Austria","AUT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("15","AZ","Azerbaijan","AZE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("16","BS","Bahamas","BHS");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("17","BH","Bahrain","BHR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("18","BD","Bangladesh","BGD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("19","BB","Barbados","BRB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("20","BY","Belarus","BLR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("21","BE","Belgium","BEL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("22","BZ","Belize","BLZ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("23","BJ","Benin","BEN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("24","BM","Bermuda","BMU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("25","BT","Bhutan","BTN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("26","BO","Bolivia","BOL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("27","BA","Bosnia and Herzegovina","BIH");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("28","BW","Botswana","BWA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("29","BV","Bouvet Island","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("30","BR","Brazil","BRA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("31","IO","British Indian Ocean Territory","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("32","BN","Brunei Darussalam","BRN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("33","BG","Bulgaria","BGR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("34","BF","Burkina Faso","BFA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("35","BI","Burundi","BDI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("36","KH","Cambodia","KHM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("37","CM","Cameroon","CMR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("38","CA","Canada","CAN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("39","CV","Cape Verde","CPV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("40","KY","Cayman Islands","CYM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("41","CF","Central African Republic","CAF");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("42","TD","Chad","TCD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("43","CL","Chile","CHL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("44","CN","China","CHN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("45","CX","Christmas Island","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("46","CC","Cocos (Keeling) Islands","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("47","CO","Colombia","COL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("48","KM","Comoros","COM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("49","CG","Congo","COG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("50","CD","Congo, the Democratic Republic of the","COD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("51","CK","Cook Islands","COK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("52","CR","Costa Rica","CRI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("53","CI","Cote D'Ivoire","CIV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("54","HR","Croatia","HRV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("55","CU","Cuba","CUB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("56","CY","Cyprus","CYP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("57","CZ","Czech Republic","CZE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("58","DK","Denmark","DNK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("59","DJ","Djibouti","DJI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("60","DM","Dominica","DMA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("61","DO","Dominican Republic","DOM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("62","EC","Ecuador","ECU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("63","EG","Egypt","EGY");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("64","SV","El Salvador","SLV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("65","GQ","Equatorial Guinea","GNQ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("66","ER","Eritrea","ERI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("67","EE","Estonia","EST");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("68","ET","Ethiopia","ETH");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("69","FK","Falkland Islands (Malvinas)","FLK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("70","FO","Faroe Islands","FRO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("71","FJ","Fiji","FJI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("72","FI","Finland","FIN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("73","FR","France","FRA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("74","GF","French Guiana","GUF");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("75","PF","French Polynesia","PYF");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("76","TF","French Southern Territories","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("77","GA","Gabon","GAB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("78","GM","Gambia","GMB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("79","GE","Georgia","GEO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("80","DE","Germany","DEU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("81","GH","Ghana","GHA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("82","GI","Gibraltar","GIB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("83","GR","Greece","GRC");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("84","GL","Greenland","GRL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("85","GD","Grenada","GRD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("86","GP","Guadeloupe","GLP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("87","GU","Guam","GUM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("88","GT","Guatemala","GTM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("89","GN","Guinea","GIN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("90","GW","Guinea-Bissau","GNB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("91","GY","Guyana","GUY");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("92","HT","Haiti","HTI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("93","HM","Heard Island and Mcdonald Islands","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("94","VA","Holy See (Vatican City State)","VAT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("95","HN","Honduras","HND");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("96","HK","Hong Kong","HKG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("97","HU","Hungary","HUN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("98","IS","Iceland","ISL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("99","IN","India","IND");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("100","ID","Indonesia","IDN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("101","IR","Iran, Islamic Republic of","IRN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("102","IQ","Iraq","IRQ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("103","IE","Ireland","IRL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("104","IL","Israel","ISR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("105","IT","Italy","ITA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("106","JM","Jamaica","JAM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("107","JP","Japan","JPN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("108","JO","Jordan","JOR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("109","KZ","Kazakhstan","KAZ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("110","KE","Kenya","KEN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("111","KI","Kiribati","KIR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("112","KP","Korea, Democratic People's Republic of","PRK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("113","KR","Korea, Republic of","KOR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("114","KW","Kuwait","KWT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("115","KG","Kyrgyzstan","KGZ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("116","LA","Lao People's Democratic Republic","LAO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("117","LV","Latvia","LVA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("118","LB","Lebanon","LBN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("119","LS","Lesotho","LSO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("120","LR","Liberia","LBR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("121","LY","Libyan Arab Jamahiriya","LBY");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("122","LI","Liechtenstein","LIE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("123","LT","Lithuania","LTU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("124","LU","Luxembourg","LUX");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("125","MO","Macao","MAC");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("126","MK","Macedonia, the Former Yugoslav Republic of","MKD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("127","MG","Madagascar","MDG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("128","MW","Malawi","MWI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("129","MY","Malaysia","MYS");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("130","MV","Maldives","MDV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("131","ML","Mali","MLI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("132","MT","Malta","MLT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("133","MH","Marshall Islands","MHL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("134","MQ","Martinique","MTQ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("135","MR","Mauritania","MRT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("136","MU","Mauritius","MUS");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("137","YT","Mayotte","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("138","MX","Mexico","MEX");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("139","FM","Micronesia, Federated States of","FSM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("140","MD","Moldova, Republic of","MDA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("141","MC","Monaco","MCO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("142","MN","Mongolia","MNG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("143","MS","Montserrat","MSR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("144","MA","Morocco","MAR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("145","MZ","Mozambique","MOZ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("146","MM","Myanmar","MMR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("147","NA","Namibia","NAM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("148","NR","Nauru","NRU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("149","NP","Nepal","NPL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("150","NL","Netherlands","NLD");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("151","AN","Netherlands Antilles","ANT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("152","NC","New Caledonia","NCL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("153","NZ","New Zealand","NZL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("154","NI","Nicaragua","NIC");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("155","NE","Niger","NER");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("156","NG","Nigeria","NGA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("157","NU","Niue","NIU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("158","NF","Norfolk Island","NFK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("159","MP","Northern Mariana Islands","MNP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("160","NO","Norway","NOR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("161","OM","Oman","OMN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("162","PK","Pakistan","PAK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("163","PW","Palau","PLW");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("164","PS","Palestinian Territory, Occupied","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("165","PA","Panama","PAN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("166","PG","Papua New Guinea","PNG");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("167","PY","Paraguay","PRY");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("168","PE","Peru","PER");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("169","PH","Philippines","PHL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("170","PN","Pitcairn","PCN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("171","PL","Poland","POL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("172","PT","Portugal","PRT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("173","PR","Puerto Rico","PRI");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("174","QA","Qatar","QAT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("175","RE","Reunion","REU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("176","RO","Romania","ROM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("177","RU","Russian Federation","RUS");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("178","RW","Rwanda","RWA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("179","SH","Saint Helena","SHN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("180","KN","Saint Kitts and Nevis","KNA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("181","LC","Saint Lucia","LCA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("182","PM","Saint Pierre and Miquelon","SPM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("183","VC","Saint Vincent and the Grenadines","VCT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("184","WS","Samoa","WSM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("185","SM","San Marino","SMR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("186","ST","Sao Tome and Principe","STP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("187","SA","Saudi Arabia","SAU");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("188","SN","Senegal","SEN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("189","CS","Serbia and Montenegro","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("190","SC","Seychelles","SYC");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("191","SL","Sierra Leone","SLE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("192","SG","Singapore","SGP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("193","SK","Slovakia","SVK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("194","SI","Slovenia","SVN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("195","SB","Solomon Islands","SLB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("196","SO","Somalia","SOM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("197","ZA","South Africa","ZAF");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("198","GS","South Georgia and the South Sandwich Islands","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("199","ES","Spain","ESP");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("200","LK","Sri Lanka","LKA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("201","SD","Sudan","SDN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("202","SR","Suriname","SUR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("203","SJ","Svalbard and Jan Mayen","SJM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("204","SZ","Swaziland","SWZ");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("205","SE","Sweden","SWE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("206","CH","Switzerland","CHE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("207","SY","Syrian Arab Republic","SYR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("208","TW","Taiwan, Province of China","TWN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("209","TJ","Tajikistan","TJK");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("210","TZ","Tanzania, United Republic of","TZA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("211","TH","Thailand","THA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("212","TL","Timor-Leste","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("213","TG","Togo","TGO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("214","TK","Tokelau","TKL");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("215","TO","Tonga","TON");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("216","TT","Trinidad and Tobago","TTO");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("217","TN","Tunisia","TUN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("218","TR","Turkey","TUR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("219","TM","Turkmenistan","TKM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("220","TC","Turks and Caicos Islands","TCA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("221","TV","Tuvalu","TUV");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("222","UG","Uganda","UGA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("223","UA","Ukraine","UKR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("224","AE","United Arab Emirates","ARE");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("225","GB","United Kingdom","GBR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("226","US","United States","USA");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("227","UM","United States Minor Outlying Islands","");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("228","UY","Uruguay","URY");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("229","UZ","Uzbekistan","UZB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("230","VU","Vanuatu","VUT");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("231","VE","Venezuela","VEN");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("232","VN","Viet Nam","VNM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("233","VG","Virgin Islands, British","VGB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("234","VI","Virgin Islands, U.s.","VIR");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("235","WF","Wallis and Futuna","WLF");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("236","EH","Western Sahara","ESH");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("237","YE","Yemen","YEM");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("238","ZM","Zambia","ZMB");
-- -----SQL DELIMITER-------
insert into `countries` (`id`, `iso`, `name`, `iso3`) VALUES ("239","ZW","Zimbabwe","ZWE");
-- -----SQL DELIMITER-------
drop table if exists `postcodecache`;
-- -----SQL DELIMITER-------
create table `postcodecache` (
`ID` int(20) not null primary key,
`postcode` char(20) ,
`iso3` char(3) ,
`latitude` char(60) ,
`longitude` char(60) );
-- -----SQL DELIMITER-------
drop table if exists `stores`;
-- -----SQL DELIMITER-------
create table `stores` (
`id` int(9) not null primary key auto_increment,
`businessName` char(225) ,
`categories` text,
`website` char(225) ,
`shownWebsite` char(100) ,
`displayWebsite` char(1) ,
`websiteTarget` char(15) ,
`address` char(100) ,
`address2` char(100) ,
`city` char(50) ,
`state` char(25) ,
`postal` char(25) ,
`country` char(25) ,
`phone` char(50) ,
`fax` char(50) ,
`lastUpdate` datetime,
`created` datetime,
`logo` char(100) ,
`email` char(100) ,
`weeklyAd` text,
`displayWeeklyAd` char(1) ,
`pageHTML` text,
`hours` text,
`latitude` char(50) ,
`longitude` char(50) );
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("56","DB Design","","http://www.phpscriptindex.com","http://www.phpscirptindex.com","1","_blank","639 Redwood Ave","","Myrtle Beach","SC","29579","USA","(555) 555 - 5555","(800) 555 - 5555","2007-06-15 17:21:45","2007-05-08 22:16:40","","","<strong>
<h3>The Real Estate Script </h3>
</strong>
<ul>
    <li>The Real Estate Script  is the FSBO classifieds script on the net. </li>
    <li>Driven by PHP and Mysql</li>
    <li>Pay a one-time price for Lifetime Software License</li>
    <li><strong>FREE</strong> LifeTime Updates </li>
    <li>Modifications are allowed </li>
    <li>Run on your own server</li>
    <li>Fully Scalable from Small to Large Companies</li>
    <li>Bulk Discount Available</li>
    <li><a href=\"http://therealestatescript.com/index.php?#features\">Feature List</a> </li>
    <li><a href=\"http://therealestatescript.com/new_and_cool.php\">What's New and Cool</a> </li>
</ul>
<a href=\"http://therealestatescript.com/redirect.php?act=buy\"><img width=\"247\" height=\"121\" border=\"0\" src=\"http://therealestatescript.com/slide/download.jpg\" alt=\"\" /></a>","1","","                ","33.655452","-78.943693");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("57","Best Buy (Store 855)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","1145 Oak Forest Lane","","Myrtle Beach","SC","29577","USA","(843) 626-9357","","2007-07-25 12:59:15","2007-05-08 22:16:40","","","","","","                                ","33.72875","-78.854049");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("58","Best Buy (Store 826)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","2701 David H Mcleod Blvd","","Florence","SC","29501-4028","USA","(843) 661-5199","","2007-07-25 12:59:43","2007-05-08 22:16:40","","","","","","                                ","34.188529","-79.828382");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("59","Wal-Mart Supercenter Store #2712","","http://www.walmart.com","http://www.walmart.com","1","","Seaboard Street","","Myrtle Beach","SC","29577","USA","(843) 445-7781","","2007-07-25 13:01:25","2007-05-08 22:16:40","VT5T5bq0yK.jpg","","","","<p class=\"MsoNormal\"><strong>Services </strong><strong>(Example/Demo Listing)</strong></p>
<ul type=\"disc\" style=\"margin-top: 0in;\">
    <li style=\"\" class=\"MsoNormal\">Cell      Phones, Plans & More</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placetype>Garden</st1:placetype>       <st1:placetype>Center</st1:placetype></st1:place></li>
    <li style=\"\" class=\"MsoNormal\">Site      to Store<sup>SM </sup></li>
    <li style=\"\" class=\"MsoNormal\">Gift      Registry</li>
    <li style=\"\" class=\"MsoNormal\">Grocery</li>
    <li style=\"\" class=\"MsoNormal\">Open      24 hours</li>
    <li style=\"\" class=\"MsoNormal\">Pharmacy</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placename>Photo</st1:placename>       <st1:placetype>Center</st1:placetype></st1:place></li>
    <li style=\"\" class=\"MsoNormal\">1-Hour      Photo Center</li>
    <li style=\"\" class=\"MsoNormal\">Portrait      Studio</li>
    <li style=\"\" class=\"MsoNormal\">Tire      & Lube</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placename>Vision</st1:placename>       <st1:placetype>Center</st1:placetype></st1:place></li>
</ul>","Pharmacy Hours  (Example/Demo Listing)
• Monday-Friday: 9:00 am - 9:00 pm  
• Saturday: 9:00 am - 7:00 pm  
• Sunday: 10:00 am - 6:00 pm  
 
Site to StoreSM Hours  (Example/Demo Listing)
 
• Monday-Friday: 8:00 am - 10:00 pm  
• Saturday: 8:00 am - 10:00 pm  
• Sunday: 8:00 am - 10:00 pm                                  ","33.71258","-78.8953");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("60","Best Buy (Store 378)","","http://www.bestbuy.com","http://www.bestbuy.com","1","_blank","309 S College Rd","","Wilmington","NC","28403-1601","USA","(910) 790-2021","","2007-07-25 12:56:17","2007-05-08 22:16:40","","","","","","","34.237216","-77.872153");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("61","Best Buy (Store 517)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","7612 Rivers Ave","","North Charleston","SC","29406","USA","(843) 553-9299","","2007-07-25 12:59:59","2007-05-08 22:16:40","","","","","","                                ","32.936855","-80.039249");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("62","Best Buy (Store 174)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","2034 Skibo Rd","","Fayetteville","NC","28314","USA","(910) 868-3707","","2007-07-25 12:59:51","2007-05-08 22:16:40","","","","","","                                ","35.056653","-78.972413");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("63","Best Buy (Store 1120 Citadel Mall SC)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","1987 Sam Rittenberg Blvd","","Charleston","SC","29407-4860","USA","(843) 763-4338","","2007-07-25 12:59:34","2007-05-08 22:16:40","","","","","","                                ","32.795163","-80.027317");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("64","Best Buy (Store 601)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","11088 N Us Highway 15 501","","Aberdeen","NC","28315","USA","910-693-2745","","2007-07-25 12:55:46","2007-05-08 22:16:40","","","","","","                ","35.126292","-79.430585");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("65","Best Buy (Store 805)","","http://www.bestbuy.com","http://www.bestbuy.com","1","","1116 Western Blvd","","Jacksonville","NC","28546-6654","USA","910-478-3145","","2007-07-25 12:56:28","2007-05-08 22:16:40","","","","","","                ","34.780221","-77.395689");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("66","Wal-Mart Supercenter Store #574","","http://www.walmart.com","http://www.walmart.com","1","","2751 Beaver Run Blvd","","Surfside","SC","29575","USA","(843) 650-4800","","2007-07-25 13:01:39","2007-05-08 22:16:40","hKykRSwqeu.jpg","","","","<p class=\"MsoNormal\"><strong>Services (Example/Demo Listing)<br />
</strong></p>
<ul type=\"disc\" style=\"margin-top: 0in;\">
    <li style=\"\" class=\"MsoNormal\">Cell      Phones, Plans & More</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placetype>Garden</st1:placetype>       <st1:placetype>Center</st1:placetype></st1:place></li>
    <li style=\"\" class=\"MsoNormal\">Site      to Store<sup>SM </sup></li>
    <li style=\"\" class=\"MsoNormal\">Gift      Registry</li>
    <li style=\"\" class=\"MsoNormal\">Grocery</li>
    <li style=\"\" class=\"MsoNormal\">Open      24 hours</li>
    <li style=\"\" class=\"MsoNormal\">Pharmacy</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placename>Photo</st1:placename>       <st1:placetype>Center</st1:placetype></st1:place></li>
    <li style=\"\" class=\"MsoNormal\">1-Hour      Photo Center</li>
    <li style=\"\" class=\"MsoNormal\">Portrait      Studio</li>
    <li style=\"\" class=\"MsoNormal\">Tire      & Lube</li>
    <li style=\"\" class=\"MsoNormal\"><st1:place><st1:placename>Vision</st1:placename>       <st1:placetype>Center</st1:placetype></st1:place></li>
</ul>","Pharmacy Hours (Example/Demo Listing)
• Monday-Friday: 9:00 am - 9:00 pm
• Saturday: 9:00 am - 7:00 pm
• Sunday: 10:00 am - 6:00 pm

Site to StoreSM Hours (Example/Demo Listing)

• Monday-Friday: 8:00 am - 10:00 pm
• Saturday: 8:00 am - 10:00 pm
• Sunday: 8:00 am - 10:00 pm                ","33.646305","-78.978434");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("67","Home Depot  #1116","","http://www.homedepot.com","http://www.homedepot.com","1","_blank","951 Oak Forest Lane","","Myrtle Beach","South Carolina","29577","USA","(843) 357-3777","","2007-07-23 18:37:47","2007-07-23 18:37:47","9QyoTftfFJ.jpg","","","","","Store hours may vary due to seasonality. Call your local store for current hours of operation.","33.705764","-78.913095");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("68","Home Depot  #1122","","http://www.homedepot.com","http://www.homedepot.com","1","_blank","12262 Hwy 17 Bypass","","Murrells Inlet","SC","29576","USA","(843) 357-3777","","2007-07-23 18:40:37","2007-07-23 18:40:37","9QyoTftfFJ.jpg","","","","","Store hours may vary due to seasonality. Call your local store for current hours of operation.","33.576287","-79.029153");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("69","Above & Beyond Pizza Company","","","","","","9660 N Kings Hwy","","Myrtle Beach","SC","29572","USA","(843) 692-2272","","2007-07-26 14:47:05","2007-07-26 14:47:05","","","","","","","33.783986","-78.784564");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("70","Ala Marios Pizza","","","","","","2286 E Highway 501","","Conway","SC","29526","USA","(843) 347-0805","","2007-07-26 14:47:05","2007-07-26 14:47:05","","","","","","","33.791040","-78.997085");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("71","Alfredos Pizza","","","","","","4620 Dick Pond Rd","","Myrtle Beach","SC","29588","USA","(843) 293-5444","","2007-07-26 14:47:05","2007-07-26 14:47:05","","","","","","","33.667319","-78.997106");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("72","Amicis Brick Oven Pizza & Bistro","","","","","","1310 Celebrity Cir","","Myrtle Beach","SC","29577","USA","(843) 444-0006","","2007-07-26 14:47:05","2007-07-26 14:47:05","","","","","","","33.713254","-78.877652");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("73","Anthonys Pizza & Pan Pasta","","","","","","2298 Glenns Bay Rd","","Myrtle Beach","SC","29575","USA","(843) 215 5444","","2007-07-26 14:47:06","2007-07-26 14:47:06","","","","","","","33.619226","-79.001327");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("74","Athens Pizza II","","","","","","1921 Highway 544","","Conway","SC","29526","USA","(843) 347-2096","","2007-07-26 14:47:06","2007-07-26 14:47:06","","","","","","","33.765710","-79.019929");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("75","Babakas Pizzeria","","","","","","221 sea Mountain Hwy","","North Myrtle Beach","SC","29582","USA","(843) 249-6244","","2007-07-26 14:47:06","2007-07-26 14:47:06","","","","","","","33.828517","-78.643273");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("77","Walgreens","","http://www.walgreens.com","http://www.walgreens.com","1","_blank","2872 S Highway 17","","Murrells Inlet","SC","29576","USA","(843) 357-3962","","2007-07-26 15:12:09","2007-07-26 14:47:07","","","","","","                                ","33.585459","-79.013146");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("78","Walgreens","","http://www.walgreens.com","http://www.walgreens.com","1","_blank","300 S Kings Hwy","","Myrtle Beach","SC","29577","USA","(843) 626-2183","","2007-07-26 14:47:07","2007-07-26 14:47:07","","","","","","","33.684510","-78.891913");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("79","Walgreens","","http://www.walgreens.com","http://www.walgreens.com","1","_blank","4779 Highway 501","","Myrtle Beach","SC","29579","USA","(843) 903-5484","","2007-07-26 14:47:07","2007-07-26 14:47:07","","","","","","","33.761014","-78.970367");
-- -----SQL DELIMITER-------
insert into `stores` (`id`, `businessName`, `categories`, `website`, `shownWebsite`, `displayWebsite`, `websiteTarget`, `address`, `address2`, `city`, `state`, `postal`, `country`, `phone`, `fax`, `lastUpdate`, `created`, `logo`, `email`, `weeklyAd`, `displayWeeklyAd`, `pageHTML`, `hours`, `latitude`, `longitude`) VALUES ("80","Walgreens","","http://www.walgreens.com","http://www.walgreens.com","1","_blank","4300 Highway 17 S","","North Myrtle Beach","SC","29582","USA","(843) 272-4188","","2007-07-26 14:47:07","2007-07-26 14:47:07","","","","","","","33.801225","-78.731589");
-- -----SQL DELIMITER-------
