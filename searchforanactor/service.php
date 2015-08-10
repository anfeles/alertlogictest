<?php
    include("GetData.php"); //includes class with API connection functions
    
	$option=$_REQUEST['option'];	//it could be search(several results) or detail(one result)
	
	if($option=="search"){
		//get data from input
		$data=$_REQUEST['data'];		//ulrenconde to escape %20 character
		$category=$_REQUEST['category']; //it could be Actors or Movies
		$query="";
	    //set query string
		if($category=="Actors"){   //actors
			$query="http://api.themoviedb.org/3/search/person?query=". urlencode($data) ."&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc";
		}
		else{               //movies        
		   $query="http://api.themoviedb.org/3/search/movie?query=". urlencode($data) ."&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc"; 
		}
	} else {	//detail option
		$id=$_REQUEST['id'];
		$category=$_REQUEST['category'];	//it could be actor or movie
		//set query string
		if($category=="actor"){   //actor			
			$query="http://api.themoviedb.org/3/person/". $id ."?&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6";
		}
		else{               //movie        
			$query="http://api.themoviedb.org/3/movie/". $id. "?api_key=b039c5475dd61fb3fe2f3ceebcd67ae6";		   
		}
	}
	//calls GetData class and executes the query
	$myGetData = new GetData();      
	$results=$myGetData->executeQuery($query);
	//returns json data
	$jsonResults=$myGetData->toJSON($results);
	echo $jsonResults;    
    
?>