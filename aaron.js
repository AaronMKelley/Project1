// set variable for Running Total
var counter=0; 
$("#runningTotal").text(counter);


// add your personal goal to the counter. 
$("#addGoal").on('click',function(){
    event.preventDefault();
    var goal= $('#statedGoal').val().trim();
    $('#yourGoal').text(goal)
})



// open Search EDAMAM API 
$("#openSearch").on('click',function(){
   event.preventDefault();
   var food= $('#randomFood').val().trim();
   var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=fc3a55ab&app_key=48f6858d58b2229fdcaf0e765ac5b721&ingr=1%20" + food;
console.log(queryURL);

        $.ajax({
            url:queryURL,
            method:"GET",
          }).then(function(response) {
         console.log(response)
         console.log(response.calories)
         console.log(response.totalNutrients.NA.quantity);
         console.log(response.totalNutrients.PROCNT.quantity);
         console.log(response.totalNutrients.CHOCDF.quantity);
         console.log(response.totalNutrients.SUGAR.quantity);
        
         //  $('#foodList').append(food)
        //  $("#runningTotal").append(response.calories)
         
            },
            function(x,error){
                console.log(error)
  
            }
          )
        });

    
    $("#barcode").on("click",function(){
        event.preventDefault();
        var barcode= $("#barcodeSearch").val();
        var queryURL= "https://world.openfoodfacts.org/api/v0/product/" + barcode 
   
   console.log(queryURL);
   
    })