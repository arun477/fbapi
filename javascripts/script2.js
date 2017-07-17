$(document).ready(function(){
	
  //login part

  $("#logbtn").click(function(){
  	$.token=$("#accesstoken").val();
  	if($.token.length<6){
  		alert("please enter the valid accesstoken")
  	} else {
  		$.ajax({
  			url:'https://graph.facebook.com/v2.9/me?fields=cover%2Cpicture%2Cname%2Cfirst_name%2Cage_range%2Cgender&access_token='+$.token,
  			dataType:'JSON',
  			method:'GET',
  			success:function(response){
  				console.log(response);
  				$.responses = response;
  				$.url = response.picture.data.url;
  				$.nn = response.name;
  				$.cov  = response.cover.source;
  				$.age1 = response.age_range.min;
  				$.gen = response.gender;
  				
  				$("#loginbutton").hide();
  				$("#user").show();
  				$("#logoutbutton").show();
  				$("#username").text($.responses.first_name);
  				$("#profileimg").attr("src",$.url);
  				$("#name").text($.nn);
  				$("#prof1").attr("src",$.url);
  				$("#profession").text($.ff);
  				$("#item3-a").css("background-image",'url('+$.cov+')');
  				$("#age").text($.age1+" "+"\+");
  				$("#frontcover").hide();
  				if($.gen ==="male"){
  					$("#gender").attr("src","images/maleicon.png");
  				} else{
  					$("#gender").attr("src","images/femaleicon.png");
  				}
  			}
  		});
  		
  		
  	}

  });


	//posting part

	$("#postbtn").click(function(){
		
		$.msg = $("#postinput").val();
		

		$.ajax({
			method:"POST",
			url:"https://graph.facebook.com/v2.9/me/feed?message="+$.msg+"&access_token="+$.token,
			success:function(response){
				console.log(response);
				$("#postinput").val("");
				$("#item4-c").show();
				$(".feed").hide();
				$("#vid").show();
				$("#postresult").text("your message has been successfully posted on your facebook")
			}
		});
		

	});

	//feed part

	$("#fbtn").click(function(){
		$.ajax({
			method:"GET",
			url:"https://graph.facebook.com/v2.9/me/?fields=feed.limit(4)%7Bfrom%2Cmessage%7D&access_token="+$.token,
			success:function(response){
				console.log(response);
				$.fee = response.feed.data;
				$("#vid").hide();
				$("#item4-c").hide();
				$(".feed").hide();
				for (let i in $.fee){
					
					$("#item4-b").append("<h2 class='feed'>" +"<span id='feedname'>"+ $.fee[i].from.name+"</span>" +" "+":"+" "+ $.fee[i].message +"</h2>");

				}

			}
		});
	});

	//logout part

	$("#logoutbutton").click(function(){
		
		$("#frontcover").show();
		$("#loginbutton").show();
		$("#accesstoken").val("");

	});
});