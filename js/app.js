$(document).ready(function () {
    
        $('.loader').hide();
    
        function getResponse() {
            var accessToken = $("#grab").val();
    
            $.ajax('https://graph.facebook.com/me/permissions?access_token=' + accessToken, {
                
                                success: function (response) {
                                    var permissionsArray = [];
                                   $.each(response.data, function(i, data){
                                        if(data.permission == "email")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_hometown")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_about_me")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_birthday")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_education_history")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_location")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_posts")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                        if(data.permission == "user_work_history")
                                        {
                                            if(data.status != "granted")
                                                permissionsArray.push(data.permission);
                                            
                                        }
                                   });
                                   if(permissionsArray.length > 0){
                                       var temp = '';
                                       permissionsArray.forEach(function(permission, i){
                                            temp += permission ;
                                            if(i != permissionsArray.length-1)
                                                temp += ', '; 
                                       });
                                       alert("Error! Please Provide these Permissions : " + temp);
                                       window.top.location = '';
                                   }
                                },
                
                                error: function (request, errorType, errorMessage) {
                                    if(request.responseText){
                                        console.log(request.responseText);
                                        var errorMsg = JSON.parse(request.responseText);
                                        alert(errorMsg.error.message);
                                        window.top.location = '';
                                    }
                                    if(errorMessage){
                                        alert(errorMessage);
                                        window.top.location = '';
                                    }
                                },
                
                                timeout: 10000, // in ms
                
                                beforeSend: function () {
                
                                    $('.loader').show();
                
                                }
                                
                
                            } //end argument list 
                
                
                        );
    
            $.ajax('https://graph.facebook.com/me?fields=hometown,email,about,birthday,education,name,location,work&access_token=' + accessToken, {
    
                    success: function (response) {
                        $('#tohide').hide();
                        $('#resultimg').attr("src", "https://graph.facebook.com/"+response.id+"/picture?type=normal&height=400&width=400");
                        $('#name').text("Name: "+response.name);
                        $('#hometown').text("Hometown: "+response.hometown.name);
                        $('#email').text("Email: "+response.email);
                        $('#birthday').text("Birthday: "+response.birthday);
                        $('#school').text("School: "+response.education[0].school.name);
                        $('#location').text("Location: "+response.location.name);
                        $('#resultbox').show();
                        
                    },
    
                    timeout: 10000, // in ms
    
                } //end argument list 
    
    
            ); //end of 1st ajax request
    
            $.ajax('https://graph.facebook.com/me/posts?limit=16&access_token=' + accessToken, {
                
                                success: function (response) {
                                    $.each(response.data, function(i, post){
                                        var j = i+1;
                                        if(post.message){
                                            $("#posts").append('<div class="card"><div class="card-body"><h4 class="card-title">Post '+j+'</h4><h6 class="card-subtitle mb-2 text-muted">Created Time : '+post.created_time+'</h6><p class="card-text">Message : '+post.message+'</p><a href="#" class="card-link">Post ID : '+post.id+'</a></div></div>');
                                        }
                                        else
                                        {
                                            $("#posts").append('<div class="card" ><div class="card-body"><h4 class="card-title">Post '+j+'</h4><h6 class="card-subtitle mb-2 text-muted">Created Time : '+post.created_time+'</h6><p class="card-text">Story : '+post.story+'</p><a href="#" class="card-link">Post ID : '+post.id+'</a></div></div>');
                                        }
                                    });
                                },
                
                                timeout: 10000, // in ms
                
                                         
                                complete: function () {
                
                                    $('.loader').hide();
                
                                }
                
                            } //end argument list 
                
                
                        ); //end of 2nd ajax request
    
    
        } 
        $("#fbbtn").on('click',getResponse);
    });