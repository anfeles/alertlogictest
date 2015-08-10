function loadTable()
{                                
    var inputTextData=document.getElementById('inputTextData').value;
	//it validates input data, shows an alert in error case
	if(inputTextData==''){	
		var output=" <div class='alert alert-danger'>"+
				"<button class='close' data-dismiss='alert'><span>&times;</span></button>"+
				"<strong>Error!</strong> Type something!"+
				"</div>";
				
		document.getElementById("results").innerHTML = output;		
	} else {
		var selectQuery=document.getElementById('selectQuery').value;
		$.getJSON(
			 "service.php?data="+inputTextData+"&category="+selectQuery+"&option=search", // The server URL                         
			   showTable // The function to call on completion.
				);
	}    
}

//it shows a table with search results
function showTable(jsonObj)
{
    document.getElementById('inputTextData').disabled=true;
	document.getElementById('btnFind').disabled=true;
	var output = "";
	var selectQuery=document.getElementById('selectQuery').value;
	if(jsonObj==null || jsonObj.results==null) {
		output="No Results";
		document.getElementById("results").innerHTML = output;
	} else if(selectQuery=="Actors"){
		output ="<table class='table table-striped table-bordered table-hover table-condensed'>";	
		output +="<tr><th>ID</th>";
		output +="<th>Name</th>";
		output +="<th>Movies</th>";             
		output +="</tr>";
		var i;
		for(i = 0; i < jsonObj.results.length; i++)	{
			output += "<tr><td><a href='#showMoreModal' class='showmore' onclick='javascript:getInfoModalActor("+jsonObj.results[i].id+")' data-toggle='modal'>"+ jsonObj.results[i].id+"</a></td>"+                   
			"<td>"+jsonObj.results[i].name+"</td>"+ 
			"<td class='text-justify'><ul>"; 
			var j;
			for(j = 0; j < jsonObj.results[i].known_for.length; j++) {			   
			   output += "<li><strong>Original Title:</strong> "+validateDetail(jsonObj.results[i].known_for[j].original_title)+"</li>"; 
			   //convert to string and substring overview to 140 characters
			   var overviewSubs=validateDetail(String(jsonObj.results[i].known_for[j].overview).substr(0,140));			   
			   output += "<li><strong>Overview:</strong> "+overviewSubs+"... <a href='#showMoreModal' class='showmore' onclick='javascript:getInfoModalMovie("+jsonObj.results[i].known_for[j].id+")' data-toggle='modal'>Show More</a></li>";			  
               output +="<hr />";
			} 
			output += "</ul></td></tr>";
		}
		output += "<table>";
        var inputTextData=document.getElementById('inputTextData').value;
		output += "<p>Total Results: "+jsonObj.total_results + "</p>";
        output += "<p class='text-success'>More Details: <a class='showmore' href='http://api.themoviedb.org/3/search/person?query="+inputTextData+"&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc' target='blank'>Click Here</a></p>";
	}
	else {			//movies
		output ="<table class='table table-striped table-bordered table-hover table-condensed'>";	
		output +="<tr><th>ID</th>";
		output +="<th>Title</th>";
		output +="<th>Details</th>";             
		output +="</tr>";
		
		var i;
		for(i = 0; i < jsonObj.results.length; i++)	{
			output += "<tr><td>"+validateDetail(jsonObj.results[i].id) +"</td>"+                   
			"<td>"+validateDetail(jsonObj.results[i].title)+"</td>"+ 
			"<td class='text-justify'><ul>";
			output += "<li><strong>Original Title:</strong> "+ validateDetail(jsonObj.results[i].original_title) +"</li>";
			//convert to string and substring overview to 140 characters
		    var overviewSubs=String(jsonObj.results[i].overview).substr(0,140);	
			output += "<li><strong>Overview:</strong> "+validateDetail(overviewSubs)+"... <a href='#showMoreModal' class='showmore' onclick='javascript:getInfoModalMovie("+jsonObj.results[i].id+")' data-toggle='modal'>Show More</a></li>";
			output +="<hr />";			 
			output += "</ul></td></tr>";
		}
		
		output += "<table>";
        var inputTextData=document.getElementById('inputTextData').value;
		output += "<p>Total Results: "+jsonObj.total_results + "</p>";
        output += "<p class='text-success'>More Details: <a class='text-success' href='http://api.themoviedb.org/3/search/movie?query="+inputTextData+"&api_key=b039c5475dd61fb3fe2f3ceebcd67ae6&sort_by=release_date.desc' target='blank'>Click Here</a></p>";
	}
	
    document.getElementById("results").innerHTML = output;
	document.getElementById('inputTextData').disabled=false;
	document.getElementById('btnFind').disabled=false;
} 

function getInfoModalMovie(idMovie)
{		
	$.getJSON(
			 "service.php?id="+idMovie+"&option=detail&category=movie", // The server URL                          
			   showModalMovie // The function to call on completion.
			);	
}

function getInfoModalActor(idActor)
{		
	$.getJSON(
			 "service.php?id="+idActor+"&option=detail&category=actor", // The server URL                          
			   showModalActor // The function to call on completion.
			);	
}

//it shows a modal with details about the selected movie
function showModalMovie(jsonObj)
{
	var output="";
	if(jsonObj==null) {
		output="No Results Available";
		alert(output);
	} else {
	
		var output="<div class='modal-dialog'>"+
						"<div class='modal-content'>"+
							"<div class='modal-header'>"+
								"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
								"<h4 class='modal-title'>More About "+jsonObj.title+"</h4>"+
							"</div>"+
							"<div class='modal-body'>"+
								"<p class='text-justify'><strong>ID:</strong> "+jsonObj.id+
								"<br><strong>Overview:</strong> "+validateDetail(jsonObj.overview)+
								"<br><strong>Release Date:</strong> "+validateDetail(jsonObj.release_date)+
								"<br><strong>Popularity:</strong> "+validateDetail(jsonObj.popularity);	
								//if result hasn´t poster image
								if(jsonObj.poster_path!=null)
									 output+="<br><strong>Poster:</strong><br><img class='frameImg' src='https://image.tmdb.org/t/p/w130"+jsonObj.poster_path+"'/>";		
								
								output+="</p>"+		
							"</div>"+
							"<div class='modal-footer'>"+
								"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
							"</div>"+
						"</div>"+	
					"</div>";
					
		document.getElementById("showMoreModal").innerHTML = output;	
	}
}

//it shows a modal with details about the selected actor
function showModalActor(jsonObj)
{
	var output="";
	if(jsonObj==null) {
		output="No Results Available";
		alert(output);
	} else {
	
		var output="<div class='modal-dialog'>"+
						"<div class='modal-content'>"+
							"<div class='modal-header'>"+
								"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
								"<h4 class='modal-title'>More About "+jsonObj.name+"</h4>"+
							"</div>"+
							"<div class='modal-body'>"+
								"<p class='text-justify'><strong>ID:</strong> "+jsonObj.id+
								"<br><strong>Biography:</strong> "+validateDetail(jsonObj.biography)+
								"<br><strong>Place of Birth:</strong> "+validateDetail(jsonObj.place_of_birth)+ 
								"<br><strong>Birthday:</strong> "+validateDetail(jsonObj.birthday)+
								"<br><strong>Popularity:</strong> "+validateDetail(jsonObj.popularity);	
								//if result hasn´t profile image
								if(jsonObj.profile_path!=null)
									 output+="<br><strong>Profile:</strong><br><img class='frameImg' src='https://image.tmdb.org/t/p/w130"+jsonObj.profile_path+"'/>";		
								
								output+="</p>"+		
							"</div>"+
							"<div class='modal-footer'>"+
								"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
							"</div>"+
						"</div>"+	
					"</div>";
					
		document.getElementById("showMoreModal").innerHTML = output;	
	}
}

//clean the form
function resetForm()
{
    document.getElementById('inputTextData').value="";
    document.getElementById("results").innerHTML = "";
    document.getElementById("selectQuery").index=0;
	document.getElementById("inputTextData").focus();
}

function validateDetail(detail)
{
	//if detail is null then function returns 'No Found' string
	if(detail!=null || detail!="")
		return detail;
	else
		return "No Found";
}