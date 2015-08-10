<?php
class GetData{
    
    public function __construct(){    
    }
    
	//connect to TMDB API 
	public function executeQuery($query){        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
        $response = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($response, true);   
        return $result;       
    }
    
	//returns the search results in json format
    public function toJSON($results){
        header("Content-Type:text/javascript");
        return json_encode($results);    
    }    
}    
?>