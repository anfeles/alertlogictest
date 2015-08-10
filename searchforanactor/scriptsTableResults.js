function loadTable()
{                                
    var inputTextData=document.getElementById('inputTextData').value;
    var selectQuery=document.getElementById('selectQuery').value;
    $.getJSON(
         "service.php?data="+inputTextData+"&option="+selectQuery, // The server URL                         
           showTable // The function to call on completion.
            );
}

function showTable(jsonObj)
{
    var outMovies = "";
	var selectQuery=document.getElementById('selectQuery').value;
	if(jsonObj==null || jsonObj.results.length==0) {
		outMovies="No Results";
		document.getElementById("results").innerHTML = outMovies;
	} else if(selectQuery=="Actors"){
		outMovies ="<table class='table table-striped table-bordered table-hover table-condensed'>";	
		outMovies +="<tr><th>ID</th>";
		outMovies +="<th>Name</th>";
		outMovies +="<th>Movies</th>";             
		outMovies +="</tr>";
		var i;
		for(i = 0; i < jsonObj.results.length; i++)	{
			outMovies += "<tr><td>"+jsonObj.results[i].id +"</td>"+                   
			"<td>"+jsonObj.results[i].name+"</td>"+ 
			"<td class='text-justify'><ul>"; 
			var j;
			for(j = 0; j < jsonObj.results[i].known_for.length; j++) {
			   outMovies += "<li><strong>Original Title:</strong> "+jsonObj.results[i].known_for[j].original_title+"</li>"; 
			   outMovies += "<li><strong>Overview:</strong> "+jsonObj.results[i].known_for[j].overview+"</li>";
			   outMovies += "<li><strong>Release Date:</strong> "+jsonObj.results[i].known_for[j].release_date+"</li>";
			   outMovies += "<li><strong>Popularity:</strong> "+jsonObj.results[i].known_for[j].popularity+"</li>";
			   //if result no have poster image
			   if(jsonObj.results[i].known_for[j].poster_path!=null)
					outMovies += "<li><strong>Poster:</strong><br> <img class='frameImg' src='https://image.tmdb.org/t/p/w130"+jsonObj.results[i].known_for[j].poster_path+"'/></li>";
			   
               outMovies +="<hr />";
			} 
			outMovies += "</ul></td></tr>";
		}
		outMovies += "<table>";
        var inputTextData=document.getElementById('inputTextData').value;
		outMovies += "<p>Total Results: "+jsonObj.total_results + "</p>";
        outMovies += "<p class='text-success'>More Details: <a class='text-success' href='http://api.themoviedb.org/3/search/person?query="+inputTextData+"&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc' target='blank'>Click Here</a></p>";
	}
	else {			//movies
		outMovies ="<table class='table table-striped table-bordered table-hover table-condensed'>";	
		outMovies +="<tr><th>ID</th>";
		outMovies +="<th>Original Title</th>";
		outMovies +="<th>Details</th>";             
		outMovies +="</tr>";
		
		var i;
		for(i = 0; i < jsonObj.results.length; i++)	{
			outMovies += "<tr><td>"+validateDetail(jsonObj.results[i].id) +"</td>"+                   
			"<td>"+validateDetail(jsonObj.results[i].title)+"</td>"+ 
			"<td class='text-justify'><ul>"; 	
			
			outMovies += "<li><strong>Original Title:</strong> "+ validateDetail(jsonObj.results[i].original_title) +"</li>";
			outMovies += "<li><strong>Overview:</strong> "+validateDetail(jsonObj.results[i].overview)+"</li>";
			outMovies += "<li><strong>Release Date:</strong> "+validateDetail(jsonObj.results[i].release_date)+"</li>";
			outMovies += "<li><strong>Popularity:</strong> "+validateDetail(jsonObj.results[i].popularity)+"</li>";
			//if result no have poster image
			if(jsonObj.results[i].poster_path!=null)
				outMovies += "<li><strong>Poster:</strong><br> <img class='frameImg' src='https://image.tmdb.org/t/p/w130"+jsonObj.results[i].poster_path+"'/></li>";

			outMovies +="<hr />";			 
			outMovies += "</ul></td></tr>";
		}
		
		outMovies += "<table>";
        var inputTextData=document.getElementById('inputTextData').value;
		outMovies += "<p>Total Results: "+jsonObj.total_results + "</p>";
        outMovies += "<p class='text-success'>More Details: <a class='text-success' href='http://api.themoviedb.org/3/search/movie?query="+inputTextData+"&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc' target='blank'>Click Here</a></p>";
	}
	
    document.getElementById("results").innerHTML = outMovies;
} 

function resetForm()
{
    document.getElementById('inputTextData').value="";
    document.getElementById("results").innerHTML = "";
    document.getElementById("selectQuery").index=0;
}

function validateDetail(detail)
{
	if(detail!=null)
		return detail;
	else
		return "No Found";
}