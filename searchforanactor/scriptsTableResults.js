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
	if(jsonObj==null || jsonObj.results.length==0) {
		outMovies="No Results";
		document.getElementById("results").innerHTML = outMovies;
	} else {
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
	
    document.getElementById("results").innerHTML = outMovies;
} 

function resetForm()
{
    document.getElementById('inputTextData').value="";
    document.getElementById("results").innerHTML = "";
    document.getElementById("selectQuery").index=0;
}