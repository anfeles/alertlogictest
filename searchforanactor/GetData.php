<?php
class GetData{
    
    public function __construct(){    
    }
    
	public function executeQuery($query){
        //connect to TMDB API 
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
        $response = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($response, true);   
        return $result;
        //header("Content-Type:text/javascript");
        //echo json_encode($result);       
    }
    
    public function toJSON($results){
        header("Content-Type:text/javascript");
        return json_encode($results);    
    }
    
    
    
}    
?>