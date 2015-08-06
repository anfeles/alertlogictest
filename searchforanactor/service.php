<?php
    include("GetData.php"); //llamamos al archivo que contiene la clase
    
	//get actor's name from input
    $data=$_REQUEST['data'];		//ulrenconde to escape %20 character
    $option=$_REQUEST['option'];
    $query="";
   
    if($option=="Actors"){   //actor
        $query="http://api.themoviedb.org/3/search/person?query=". urlencode($data) ."&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc";
    }
    else{               //movie
        
       $query=""; 
    }
    	
    $myGetData = new GetData();      
    $results=$myGetData->executeQuery($query);
    
    $jsonResults=$myGetData->toJSON($results);
    echo $jsonResults;     
    
?>