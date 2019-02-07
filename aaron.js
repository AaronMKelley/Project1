



$("#openSearch").on('click',function(){
   event.preventDefault();
   var food= $('#randomFood').val().trim();
   var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20" + food;
console.log(queryURL);



        $.ajax({
            url:queryURL,
            method:"GET",
          }).then(function(response) {
           console.log(response.calories)
            },
            function(x,error){
                console.log(error)
  
            }
          )
        });