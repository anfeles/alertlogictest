<?php
include 'db.php';

class Host
{
    public static function getList($only_active = false)
    {        
		static $result;
		//I declare a static variable to hold the value of $only_active
        static $active;
		
        if (!empty($result) && $active == $only_active) 
			return $result;
        
		//I assign the value of only_active$ to the new static variable
		$active=$only_active;
		//I modify the query by adding the 'left join' to allow all hosts have consulted
        $stmt = "SELECT
                    hos.host_id,
                    hos.host_name,
                    hos.ip_address,
                    cre.username
                 FROM
                    hosts hos
                    LEFT JOIN credentials cre
					ON hos.credential_id = cre.credential_id
                 WHERE
                    hos.deleted = 0";
        if ($only_active === true) {
            $stmt .= " AND hos.active = 1";
        }	
			
        $result = DB::getAll($stmt);
        
        return $result;
    }
}
?>