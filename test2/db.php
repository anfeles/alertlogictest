<?php 
class DB
{
    const HOST = 'examplemaintenan.db.11797933.hostedresource.com';
    const PORT = 3306;    	
	const USER = 'examplemaintenan';
    const PASS = 'Alert#123';
	const DB   = 'examplemaintenan';
    
    private $dbh;
    
    private function __construct()
    {
        $this->dbh = mysql_connect(self::HOST . ':' . self::PORT, self::USER, self::PASS);
        mysql_select_db(self::DB, $this->dbh);
    }
    
    private function query($stmt)
    {
        return mysql_query($stmt, $this->dbh);
    }
    
    public static function getAll($stmt)
    {        
	$db  = new self();
        $res = $db->query($stmt);
        $ret = array();
        
        while ($row = mysql_fetch_assoc($res)) {
            $ret[] = $row;				
        }
        
        return $ret;
    }
}
?>